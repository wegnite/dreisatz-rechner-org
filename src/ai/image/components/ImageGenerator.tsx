'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { AlertCircle, ChevronDown, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type {
  GeneratedImage,
  ImageError,
  ProviderTiming,
} from '../lib/image-types';
import {
  PROVIDER_ORDER,
  type ProviderKey,
  initializeProviderRecord,
} from '../lib/provider-config';
import { ImageCarousel } from './ImageCarousel';
import { ImageDisplay } from './ImageDisplay';

interface ImageGeneratorProps {
  images: GeneratedImage[];
  errors: ImageError[];
  failedProviders: ProviderKey[];
  timings: Record<ProviderKey, ProviderTiming>;
  enabledProviders: Record<ProviderKey, boolean>;
  toggleView: () => void;
}

export function ImageGenerator({
  images,
  errors,
  failedProviders,
  timings,
  enabledProviders,
  toggleView,
}: ImageGeneratorProps) {
  const usageLimitT = useTranslations('UsageLimit');
  const generatorT = useTranslations('ImageGenerator');
  return (
    <div className="space-y-6">
      {/* If there are errors, render a collapsible alert */}
      {errors.length > 0 && (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              {generatorT('errorsTrigger', { count: errors.length })}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 mt-2">
              {errors.map((err, index) => (
                <Alert key={index} variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <div className="ml-3">
                    <AlertTitle className="capitalize">
                      {generatorT('providerError', { provider: err.provider })}
                    </AlertTitle>
                    <AlertDescription className="mt-1 text-sm space-y-3">
                      <p>
                        {err.code === 'USAGE_LIMIT'
                          ? err.reason === 'ANONYMOUS_LIMIT_REACHED'
                            ? usageLimitT('anonymousDescription')
                            : usageLimitT('authenticatedDescription')
                          : err.message}
                      </p>
                      {err.code === 'USAGE_LIMIT' && (
                        <Button asChild size="sm" variant="default">
                          <LocaleLink href={Routes.Pricing}>
                            {usageLimitT('cta')}
                          </LocaleLink>
                        </Button>
                      )}
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{generatorT('heading')}</h3>
        <Button
          variant="outline"
          className=""
          onClick={() => toggleView()}
          size="icon"
          aria-label={generatorT('toggleView')}
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">{generatorT('toggleView')}</span>
        </Button>
      </div>

      {/* Mobile layout: Carousel */}
      <div className="sm:hidden">
        <ImageCarousel
          providers={PROVIDER_ORDER}
          images={images}
          timings={timings}
          failedProviders={failedProviders}
          enabledProviders={enabledProviders}
          providerToModel={initializeProviderRecord<string>()}
        />
      </div>

      {/* Desktop layout: Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 2xl:grid-cols-4 gap-6">
        {PROVIDER_ORDER.map((provider) => {
          const imageItem = images.find((img) => img.provider === provider);
          const imageData = imageItem?.image;
          const timing = timings[provider];
          return (
            <ImageDisplay
              key={provider}
              provider={provider}
              image={imageData}
              timing={timing}
              failed={failedProviders.includes(provider)}
              enabled={enabledProviders[provider]}
              modelId={imageItem?.modelId ?? ''}
            />
          );
        })}
      </div>
    </div>
  );
}
