import { createHmac } from 'crypto';

const KLING_BASE_URL = 'https://api.klingai.com';

const base64UrlEncode = (input: string | Buffer) =>
  Buffer.from(input).toString('base64url');

const createToken = (accessKey: string, secretKey: string) => {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: accessKey,
      exp: now + 1800,
      nbf: now - 5,
    })
  );

  const unsigned = `${header}.${payload}`;
  const signature = createHmac('sha256', secretKey)
    .update(unsigned)
    .digest('base64url');

  return `${unsigned}.${signature}`;
};

export interface KlingVideoOptions {
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  duration?: 5 | 10;
  mode?: 'std' | 'pro';
  cfgScale?: number;
  pollAttempts?: number;
  pollIntervalMs?: number;
}

interface KlingSubmitResponse {
  code?: number;
  message?: string;
  data?: {
    task_id?: string;
  };
}

interface KlingTaskResponse {
  code?: number;
  message?: string;
  data?: {
    task_status?: string;
    task_status_msg?: string;
    task_result?: {
      videos?: Array<{ url: string }>;
    };
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateKlingVideo({
  prompt,
  negativePrompt,
  aspectRatio = '16:9',
  duration = 5,
  mode = 'std',
  cfgScale = 0.5,
  pollAttempts = 20,
  pollIntervalMs = 15_000,
}: KlingVideoOptions) {
  const accessKey = process.env.KLING_ACCESS_KEY;
  const secretKey = process.env.KLING_SECRET_KEY;

  if (!accessKey || !secretKey) {
    throw new Error('KLING_ACCESS_KEY / KLING_SECRET_KEY are not configured.');
  }

  const trimmedPrompt = prompt?.trim();
  if (!trimmedPrompt) {
    throw new Error('Prompt is required to generate videos.');
  }

  const token = createToken(accessKey, secretKey);

  const submitResponse = await fetch(`${KLING_BASE_URL}/v1/videos/text2video`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model_name: 'kling-v1',
      prompt: trimmedPrompt,
      negative_prompt: negativePrompt,
      aspect_ratio: aspectRatio,
      duration,
      mode,
      cfg_scale: cfgScale,
    }),
  });

  if (!submitResponse.ok) {
    const text = await submitResponse.text();
    throw new Error(text || 'Failed to submit Kling video generation job.');
  }

  const submitData = (await submitResponse.json()) as KlingSubmitResponse;
  if (submitData.code !== 0 || !submitData.data?.task_id) {
    throw new Error(submitData.message || 'Kling video generation failed.');
  }

  const taskId = submitData.data.task_id;

  for (let attempt = 0; attempt < pollAttempts; attempt++) {
    await sleep(pollIntervalMs);

    const taskResponse = await fetch(
      `${KLING_BASE_URL}/v1/videos/text2video/${taskId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!taskResponse.ok) {
      const text = await taskResponse.text();
      throw new Error(text || 'Failed to poll Kling video status.');
    }

    const data = (await taskResponse.json()) as KlingTaskResponse;

    if (data.code !== 0) {
      throw new Error(data.message || 'Kling video status failed.');
    }

    const status = data.data?.task_status;
    if (status === 'succeed') {
      const url = data.data?.task_result?.videos?.[0]?.url;
      if (!url) {
        throw new Error('Kling did not return a video URL.');
      }
      return {
        status: 'completed' as const,
        videoUrl: url,
        requestId: taskId,
      };
    }

    if (status === 'failed') {
      throw new Error(
        data.data?.task_status_msg || data.message || 'Kling task failed.'
      );
    }
  }

  return {
    status: 'processing' as const,
    requestId: taskId,
  };
}
