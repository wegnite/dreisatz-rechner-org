const resolveBaseUrl = () =>
  process.env.NANO_BANANA_API_URL ??
  process.env.SILICONFLOW_API_URL ??
  'https://api.siliconflow.cn/v1';

const resolveModel = () =>
  process.env.SILICONFLOW_IMAGE_MODEL ??
  'stabilityai/stable-diffusion-3-5-large';

const ASPECT_RATIO_TO_SIZE: Record<string, string> = {
  '1:1': '1024x1024',
  '3:4': '896x1152',
  '4:3': '1152x896',
  '16:9': '1344x768',
  '9:16': '768x1344',
};

export interface NanoBananaGenerationOptions {
  prompt: string;
  aspectRatio?: keyof typeof ASPECT_RATIO_TO_SIZE;
  quality?: 'standard' | 'hd';
  numImages?: number;
  seed?: number;
}

interface NanoBananaImagePayload {
  url?: string;
  b64_json?: string;
}

interface NanoBananaApiResponse {
  id?: string;
  data?: NanoBananaImagePayload[];
  error?: string;
}

const getSizeFromAspectRatio = (aspectRatio?: string) => {
  if (!aspectRatio) {
    return '1024x1024';
  }
  return ASPECT_RATIO_TO_SIZE[aspectRatio] ?? '1024x1024';
};

/**
 * Lightweight Nano Banana client used for direct image generation.
 */
export async function generateNanoBananaImages({
  prompt,
  aspectRatio = '3:4',
  quality = 'standard',
  numImages = 1,
  seed,
}: NanoBananaGenerationOptions) {
  const apiKey =
    process.env.NANO_BANANA_API_KEY ?? process.env.SILICONFLOW_API_KEY ?? '';

  if (!apiKey) {
    throw new Error(
      'NANO_BANANA_API_KEY (or SILICONFLOW_API_KEY) is not configured.'
    );
  }

  const baseUrl = resolveBaseUrl().replace(/\/$/, '');

  const trimmedPrompt = prompt?.trim();
  if (!trimmedPrompt) {
    throw new Error('Prompt is required to generate images.');
  }

  const clampedNumImages = Math.min(Math.max(Math.round(numImages), 1), 4);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const response = await fetch(`${baseUrl}/images/generations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: resolveModel(),
        prompt: trimmedPrompt,
        n: clampedNumImages,
        size: getSizeFromAspectRatio(aspectRatio),
        quality,
        response_format: 'url',
        ...(typeof seed === 'number' ? { seed } : {}),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const rawError = await response.text();
      let message = rawError;
      try {
        const structured = JSON.parse(rawError);
        message =
          structured?.error?.message ||
          structured?.error ||
          structured?.msg ||
          rawError;
      } catch (error) {
        // noop – raw string already assigned.
      }

      throw Object.assign(new Error(message), {
        status: response.status,
        details: rawError,
      });
    }

    const data = (await response.json()) as NanoBananaApiResponse;
    const images = data?.data
      ?.map((item) => item.url || item.b64_json)
      .filter(Boolean) as string[] | undefined;

    if (!images || images.length === 0) {
      throw new Error('Nano Banana did not return any images.');
    }

    return {
      images,
      requestId: data?.id,
    };
  } finally {
    clearTimeout(timeout);
  }
}
