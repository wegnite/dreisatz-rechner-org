const getDefaultBaseUrl = () =>
  process.env.SILICONFLOW_API_URL ??
  process.env.SILICONFLOW_BASE_URL ??
  'https://api.siliconflow.cn/v1';
const getDefaultModel = () =>
  process.env.SILICONFLOW_IMAGE_MODEL ??
  'stabilityai/stable-diffusion-3-5-large';
const DEFAULT_TIMEOUT = 60_000;

const ASPECT_RATIO_TO_SIZE: Record<string, string> = {
  '1:1': '1024x1024',
  '3:4': '896x1152',
  '4:3': '1152x896',
  '16:9': '1344x768',
  '9:16': '768x1344',
};

export interface SiliconflowGenerationOptions {
  prompt: string;
  numImages?: number;
  aspectRatio?: keyof typeof ASPECT_RATIO_TO_SIZE;
  quality?: 'standard' | 'hd';
  seed?: number;
}

interface SiliconflowImageResponse {
  data?: Array<{
    url?: string;
    b64_json?: string;
  }>;
  id?: string;
}

const getSize = (aspectRatio?: string) => {
  if (!aspectRatio) {
    return '1024x1024';
  }
  return ASPECT_RATIO_TO_SIZE[aspectRatio] ?? '1024x1024';
};

export class SiliconflowImageGenerator {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor({
    apiKey = process.env.SILICONFLOW_API_KEY ?? '',
    baseUrl = getDefaultBaseUrl(),
  } = {}) {
    if (!apiKey) {
      throw new Error(
        'SILICONFLOW_API_KEY is not configured. Please set it in your environment variables.'
      );
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async generate({
    prompt,
    numImages = 1,
    aspectRatio = '3:4',
    quality = 'standard',
    seed,
  }: SiliconflowGenerationOptions) {
    const trimmedPrompt = prompt?.trim();
    if (!trimmedPrompt) {
      throw new Error('Prompt is required to generate images.');
    }

    const clampedNumImages = Math.min(Math.max(Math.round(numImages), 1), 4);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

    try {
      const response = await fetch(`${this.baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: getDefaultModel(),
          prompt: trimmedPrompt,
          n: clampedNumImages,
          size: getSize(aspectRatio),
          quality,
          response_format: 'url',
          ...(typeof seed === 'number' ? { seed } : {}),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as {
          error?: { message?: string } | string;
          message?: string;
        } | null;

        const messageFromBody = (() => {
          if (!errorBody) {
            return undefined;
          }
          if (typeof errorBody.error === 'string') {
            return errorBody.error;
          }
          return errorBody.error?.message ?? errorBody.message;
        })();

        const errorMessage =
          messageFromBody ||
          `Siliconflow request failed with status ${response.status}`;

        throw Object.assign(new Error(errorMessage), {
          status: response.status,
          details: errorBody,
        });
      }

      const data = (await response.json()) as SiliconflowImageResponse;
      const images = data?.data
        ?.map((item) => item.url || item.b64_json)
        .filter(Boolean) as string[] | undefined;

      if (!images || images.length === 0) {
        throw new Error('Siliconflow did not return any images.');
      }

      return {
        images,
        requestId: data?.id,
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}

let sharedInstance: SiliconflowImageGenerator | null = null;

export const getSiliconflowImageGenerator = () => {
  if (!sharedInstance) {
    sharedInstance = new SiliconflowImageGenerator();
  }
  return sharedInstance;
};
