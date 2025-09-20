import { getSiliconflowImageGenerator } from '@/ai/image/lib/siliconflow';
import { generateNanoBananaImages } from '@/lib/ai/nano-banana';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const MAX_PROMPT_LENGTH = 800;
const DEFAULT_ASPECT_RATIO = '3:4' as const;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SILICONFLOW_API_KEY) {
      return NextResponse.json(
        { error: 'Image generation service is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 }
      );
    }

    const {
      prompt,
      provider = 'siliconflow',
      numImages = 1,
      aspectRatio = DEFAULT_ASPECT_RATIO,
      quality = 'standard',
      seed,
    } = body as {
      prompt?: string;
      provider?: 'siliconflow' | 'nano-banana';
      numImages?: number;
      aspectRatio?: string;
      quality?: 'standard' | 'hd';
      seed?: number;
    };

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required to generate images.' },
        { status: 400 }
      );
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { error: `Prompt is too long (max ${MAX_PROMPT_LENGTH} characters).` },
        { status: 400 }
      );
    }

    if (provider === 'siliconflow') {
      const generator = getSiliconflowImageGenerator();
      const { images, requestId } = await generator.generate({
        prompt,
        numImages,
        aspectRatio,
        quality,
        seed,
      });

      return NextResponse.json({
        provider,
        images,
        requestId,
      });
    }

    if (provider === 'nano-banana') {
      const { images, requestId } = await generateNanoBananaImages({
        prompt,
        numImages,
        aspectRatio,
        quality,
        seed,
      });

      return NextResponse.json({
        provider,
        images,
        requestId,
      });
    }

    return NextResponse.json(
      { error: `Unsupported provider: ${provider}` },
      { status: 400 }
    );
  } catch (error) {
    console.error('[polaroid-generate] Failed to generate image', error);

    const status =
      typeof error === 'object' && error !== null && 'status' in error
        ? Number((error as { status?: number }).status)
        : undefined;

    const message =
      error instanceof Error
        ? error.message
        : 'Failed to generate images. Please try again later.';

    return NextResponse.json(
      {
        error: message,
      },
      {
        status:
          status && Number.isFinite(status) && status >= 400 ? status : 500,
      }
    );
  }
}
