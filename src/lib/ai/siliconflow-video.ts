const DEFAULT_BASE_URL =
  process.env.SILICONFLOW_API_URL ?? 'https://api.siliconflow.cn/v1';

export interface SiliconflowVideoOptions {
  prompt: string;
  model: string;
  aspectRatio?: string;
  numInferenceSteps?: number;
  seed?: number;
  pollAttempts?: number;
  pollIntervalMs?: number;
}

interface SiliconflowSubmitResponse {
  request_id?: string;
  status?: string;
  video_url?: string;
  cover_image_url?: string;
}

interface SiliconflowStatusResponse {
  status?: string;
  video_url?: string;
  cover_image_url?: string;
  error?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateSiliconflowVideo({
  prompt,
  model,
  aspectRatio,
  numInferenceSteps,
  seed,
  pollAttempts = 20,
  pollIntervalMs = 8_000,
}: SiliconflowVideoOptions) {
  const apiKey = process.env.SILICONFLOW_API_KEY;
  if (!apiKey) {
    throw new Error('SILICONFLOW_API_KEY is not configured.');
  }

  const trimmedPrompt = prompt?.trim();
  if (!trimmedPrompt) {
    throw new Error('Prompt is required to generate videos.');
  }

  const baseUrl = DEFAULT_BASE_URL.replace(/\/$/, '');

  const submitBody: Record<string, unknown> = {
    model,
    prompt: trimmedPrompt,
  };

  if (aspectRatio) {
    submitBody.image_size = aspectRatio;
  }

  if (typeof numInferenceSteps === 'number') {
    submitBody.num_inference_steps = numInferenceSteps;
  }

  if (typeof seed === 'number') {
    submitBody.seed = seed;
  }

  const submitResponse = await fetch(`${baseUrl}/video/submit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submitBody),
  });

  const submitText = await submitResponse.text();
  if (!submitResponse.ok) {
    try {
      const error = JSON.parse(submitText);
      throw new Error(error?.message || error?.error || submitText);
    } catch (parseError) {
      throw new Error(submitText || 'Failed to submit SiliconFlow video job.');
    }
  }

  let submitData: SiliconflowSubmitResponse | undefined;
  try {
    submitData = JSON.parse(submitText) as SiliconflowSubmitResponse;
  } catch {
    throw new Error('Invalid response from SiliconFlow video submit endpoint.');
  }

  if (submitData?.video_url) {
    return {
      status: submitData.status ?? 'completed',
      videoUrl: submitData.video_url,
      coverImageUrl: submitData.cover_image_url,
      requestId: submitData.request_id,
    };
  }

  const requestId = submitData?.request_id;
  if (!requestId) {
    throw new Error('SiliconFlow did not return a request_id.');
  }

  for (let attempt = 0; attempt < pollAttempts; attempt++) {
    await sleep(pollIntervalMs);

    const statusResponse = await fetch(
      `${baseUrl}/video/results/${requestId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!statusResponse.ok) {
      const errorText = await statusResponse.text();
      throw new Error(errorText || 'Failed to poll SiliconFlow video status.');
    }

    const data = (await statusResponse.json()) as SiliconflowStatusResponse;

    if (data?.status === 'succeeded' || data?.video_url) {
      return {
        status: 'completed',
        videoUrl: data.video_url,
        coverImageUrl: data.cover_image_url,
        requestId,
      };
    }

    if (data?.status === 'failed' || data?.status === 'cancelled') {
      throw new Error(data?.error || 'SiliconFlow video generation failed.');
    }
  }

  return {
    status: 'processing',
    requestId,
  };
}
