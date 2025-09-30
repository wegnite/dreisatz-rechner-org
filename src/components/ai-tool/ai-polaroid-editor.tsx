'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Routes } from '@/routes';
import {
  Camera,
  Clock,
  Copy,
  Download,
  Image as ImageIcon,
  Palette,
  Share2,
  Sparkles,
  Star,
  Upload,
  Wand2,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

type ImageProvider = 'siliconflow' | 'nano-banana';

type ProviderMeta = {
  id: ImageProvider;
  nameKey: string;
  descriptionKey: string;
  badgeKey: string;
};

interface StyleTemplate {
  id: string;
  nameKey: string;
  descriptionKey: string;
  isPro?: boolean;
}

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
  style: string;
  requestId?: string;
  provider: ImageProvider;
}

interface GeneratePolaroidResponse {
  images?: string[];
  provider?: string;
  requestId?: string;
  error?: string;
  remaining?: number;
  reason?: string;
}

const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    id: 'vintage-polaroid',
    nameKey: 'templates.vintage.name',
    descriptionKey: 'templates.vintage.description',
  },
  {
    id: 'retro-film',
    nameKey: 'templates.retro.name',
    descriptionKey: 'templates.retro.description',
  },
  {
    id: 'modern-minimal',
    nameKey: 'templates.modern.name',
    descriptionKey: 'templates.modern.description',
    isPro: true,
  },
  {
    id: 'artistic-sketch',
    nameKey: 'templates.artistic.name',
    descriptionKey: 'templates.artistic.description',
    isPro: true,
  },
];

const STYLE_PROMPT_ENHANCEMENT_KEYS: Record<string, string> = {
  'vintage-polaroid': 'promptEnhancements.vintagePolaroid',
  'retro-film': 'promptEnhancements.retroFilm',
  'modern-minimal': 'promptEnhancements.modernMinimal',
  'artistic-sketch': 'promptEnhancements.artisticSketch',
};

const IMAGE_PROVIDERS: ProviderMeta[] = [
  {
    id: 'siliconflow',
    nameKey: 'providers.siliconflow.name',
    descriptionKey: 'providers.siliconflow.description',
    badgeKey: 'providers.siliconflow.badge',
  },
  {
    id: 'nano-banana',
    nameKey: 'providers.nanoBanana.name',
    descriptionKey: 'providers.nanoBanana.description',
    badgeKey: 'providers.nanoBanana.badge',
  },
];

export function AiPolaroidEditor() {
  const t = useTranslations('AiPolaroidEditor');
  const translate = (key: string) => t(key as any);
  const [selectedTab, setSelectedTab] = useState<
    'image-to-image' | 'text-to-image'
  >('text-to-image');
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>('vintage-polaroid');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(() => t('form.defaultPrompt'));
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [provider, setProvider] = useState<ImageProvider>('siliconflow');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const heroFeatures = t.raw('hero.features') as Array<{
    title: string;
    description: string;
  }>;
  const featureLabel = t('hero.featureLabel');
  const rawHeroTags = t.raw('hero.tags');
  const heroTags =
    Array.isArray(rawHeroTags) &&
    (rawHeroTags as unknown[]).every((tag) => typeof tag === 'string')
      ? (rawHeroTags as string[])
      : ['Polaroid generator', 'Vintage vibe', 'Instant sharing'];
  const featureGradients = [
    'from-[#4f63ff33] via-[#4f63ff18] to-transparent',
    'from-[#fbbf2433] via-[#fbbf2418] to-transparent',
    'from-[#36f0b533] via-[#36f0b51a] to-transparent',
  ];
  const heroPreviewImage =
    generatedImages[0]?.url ?? '/images/docs/themes/ocean.png';
  const router = useRouter();
  const locale = useLocale();
  const localizedPricingPath =
    locale === routing.defaultLocale
      ? Routes.Pricing
      : `/${locale}${Routes.Pricing}`;
  const usageLimitT = useTranslations('UsageLimit');

  const providerMetaMap = useMemo(() => {
    const map = {} as Record<ImageProvider, ProviderMeta>;
    for (const item of IMAGE_PROVIDERS) {
      map[item.id] = item;
    }
    return map;
  }, []);

  const selectedTemplateName = useMemo(() => {
    const template = STYLE_TEMPLATES.find(
      (item) => item.id === selectedTemplate
    );
    return template
      ? translate(template.nameKey)
      : translate('templates.fallbackName');
  }, [selectedTemplate, translate]);

  const selectedTemplateMeta = useMemo(() => {
    return (
      STYLE_TEMPLATES.find((item) => item.id === selectedTemplate) ||
      STYLE_TEMPLATES[0]
    );
  }, [selectedTemplate]);

  const composePrompt = (rawPrompt: string) => {
    const base = rawPrompt.trim();
    const enhancementKey = STYLE_PROMPT_ENHANCEMENT_KEYS[selectedTemplate];
    if (enhancementKey) {
      return `${base}. ${translate(enhancementKey)}`;
    }
    return base;
  };

  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleDownloadImage = (url: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = `ai-polaroid-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download image', error);
      toast({
        title: t('toast.downloadError.title'),
        description: t('toast.downloadError.description'),
        variant: 'destructive',
      });
    }
  };

  const handleShareImage = async (url: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: t('share.title'),
          text: t('share.text'),
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      toast({
        title: t('toast.share.successTitle'),
        description: t('toast.share.successDescription'),
      });
    } catch (error) {
      console.error('Failed to share image', error);
      toast({
        title: t('toast.share.errorTitle'),
        description: t('toast.share.errorDescription'),
        variant: 'destructive',
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: t('toast.validation.missingPrompt.title'),
        description: t('toast.validation.missingPrompt.description'),
        variant: 'destructive',
      });
      return;
    }

    if (selectedTab === 'image-to-image') {
      toast({
        title: t('toast.validation.imageToImage.title'),
        description: t('toast.validation.imageToImage.description'),
      });
      return;
    }

    setIsGenerating(true);
    setProgress(5);
    clearProgressInterval();

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) {
          return prev;
        }
        return prev + 3;
      });
    }, 300);

    const payload = {
      prompt: composePrompt(prompt),
      provider,
      numImages: 1,
      aspectRatio: '3:4',
      quality: 'standard' as const,
    };

    (async () => {
      try {
        const response = await fetch('/api/polaroid/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = (await response
          .json()
          .catch(() => ({}))) as GeneratePolaroidResponse & {
          reason?: string;
        };

        if (!response.ok) {
          if (response.status === 402) {
            const limitDescription =
              data.reason === 'ANONYMOUS_LIMIT_REACHED'
                ? usageLimitT('anonymousDescription')
                : usageLimitT('authenticatedDescription');
            toast({
              title: usageLimitT('title'),
              description: limitDescription,
              variant: 'destructive',
            });
            setProgress(0);
            router.push(localizedPricingPath);
            return;
          }
          throw new Error(data?.error || t('toast.error.defaultDescription'));
        }

        const images = Array.isArray(data?.images) ? data.images : [];
        if (images.length === 0) {
          throw new Error(t('toast.error.emptyResult'));
        }

        setGeneratedImages((prev) => [
          ...images.map((url: string, index: number) => ({
            id: `${Date.now()}-${index}`,
            url,
            prompt: payload.prompt,
            timestamp: new Date(),
            style: selectedTemplateName,
            requestId: data?.requestId,
            provider: (data?.provider as ImageProvider) ?? provider,
          })),
          ...prev,
        ]);

        setProgress(100);
        toast({
          title: t('toast.success.title'),
          description: t('toast.success.description'),
        });
      } catch (error) {
        console.error('Failed to generate polaroid image', error);
        toast({
          title: t('toast.error.title'),
          description:
            error instanceof Error
              ? (error.message ?? t('toast.error.defaultDescription'))
              : t('toast.error.defaultDescription'),
          variant: 'destructive',
        });
        setProgress(0);
      } finally {
        clearProgressInterval();
        setIsGenerating(false);
      }
    })();
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: t('toast.copy.successTitle'),
        description: t('toast.copy.successDescription'),
      });
    } catch (error) {
      console.error('Failed to copy prompt', error);
      toast({
        title: t('toast.copy.errorTitle'),
        description: t('toast.copy.errorDescription'),
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    return () => {
      clearProgressInterval();
    };
  }, []);

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-[#030617] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(88,111,255,0.28),transparent_60%)]" />
          <div className="animate-aurora absolute -top-56 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_140deg_at_50%_50%,rgba(110,231,255,0.35),rgba(255,192,203,0.2),rgba(255,220,128,0.3),rgba(110,231,255,0.35))] blur-3xl" />
          <div className="animate-blob absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="animate-blob-delayed absolute -bottom-56 right-[-160px] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 lg:py-32 text-center">
            <Badge className="mb-6 border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              {t('badge')}
            </Badge>
            <h1 className="text-balance font-serif font-semibold tracking-tight text-[clamp(2.8rem,8vw,5.6rem)] max-w-4xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-balance text-lg md:text-xl text-slate-200/90 max-w-3xl">
              {t('hero.description')}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="h-12 px-8 text-base font-semibold shadow-[0_15px_40px_-20px_rgba(245,206,120,0.9)] bg-amber-400 text-slate-950 hover:bg-amber-300"
              >
                <a href="#polaroid-prompt-engine">
                  {t('form.generateButton.idle')}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 border-white/30 bg-white/10 px-8 text-base font-semibold text-white hover:bg-white/20"
              >
                <a href="#polaroid-gallery">{t('gallery.title')}</a>
              </Button>
            </div>

            <div className="mt-12 w-full max-w-6xl">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {heroFeatures.map((feature, index) => (
                  <div
                    key={`${feature.title}-${index}`}
                    className="rounded-2xl border border-white/10 from-white/10 via-white/5 to-transparent bg-gradient-to-br p-5 text-left shadow-[0_35px_80px_-45px_rgba(44,62,255,0.65)] backdrop-blur"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-200/90">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#030515] py-18 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <Card
              id="polaroid-prompt-engine"
              className="bg-slate-900/70 border-white/10 shadow-[0_40px_80px_-60px_rgba(80,118,255,0.8)] backdrop-blur-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-amber-400" />
                  <CardTitle className="text-white text-lg">
                    {t('promptCard.title')}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  {t('promptCard.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs
                  value={selectedTab}
                  onValueChange={(value) =>
                    setSelectedTab(value as typeof selectedTab)
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-slate-900/70 border border-white/10">
                    <TabsTrigger
                      value="image-to-image"
                      className="data-[state=active]:bg-amber-400 data-[state=active]:text-slate-900"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      {t('tabs.imageToImage')}
                    </TabsTrigger>
                    <TabsTrigger
                      value="text-to-image"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                    >
                      <Palette className="h-4 w-4 mr-2" />
                      {t('tabs.textToImage')}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="image-to-image"
                    className="mt-6 space-y-6"
                  >
                    <div className="rounded-xl border border-amber-300/30 bg-amber-500/10 p-4 shadow-[0_35px_80px_-50px_rgba(248,191,101,0.8)]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">
                            {t('batch.title')}
                          </span>
                          <Badge className="bg-amber-500 text-slate-900 text-xs">
                            {t('templates.proLabel')}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900"
                        >
                          <Star className="h-3 w-3 mr-1" />
                          {t('batch.cta')}
                        </Button>
                      </div>
                      <p className="text-slate-400 text-sm mt-2">
                        {t('batch.description')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-slate-400" />
                        <Label className="text-white font-medium">
                          {t('reference.title')}
                        </Label>
                        <Badge variant="outline" className="text-xs">
                          {t('reference.counter', { current: 0, max: 9 })}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-3">
                        <div className="relative">
                          <div className="aspect-video overflow-hidden rounded-xl border border-dashed border-white/10 bg-slate-950/60 flex items-center justify-center">
                            {uploadedImage ? (
                              <img
                                src={uploadedImage}
                                alt={t('reference.uploadedAlt')}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="text-center space-y-2">
                                <Camera className="h-8 w-8 mx-auto text-slate-500" />
                                <p className="text-xs text-slate-400">
                                  {t('reference.uploadTitle')}
                                </p>
                                <p className="text-[10px] text-slate-500">
                                  {t('reference.uploadDescription')}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-slate-100 hover:bg-white/10"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white"
                            onClick={() => setUploadedImage(null)}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="text-to-image" className="mt-6">
                    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-6 text-center">
                      <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t('tabs.textToImageDescription')}</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-slate-400" />
                      <Label className="text-white font-medium">
                        {t('providers.title')}
                      </Label>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {providerMetaMap[provider]
                        ? translate(providerMetaMap[provider].badgeKey)
                        : ''}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {IMAGE_PROVIDERS.map((item) => (
                      <Button
                        key={item.id}
                        type="button"
                        variant={provider === item.id ? 'default' : 'outline'}
                        disabled={isGenerating}
                        className={cn(
                          'h-auto flex flex-col items-start gap-1 rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-left backdrop-blur-sm transition-colors hover:bg-slate-900/80',
                          provider === item.id &&
                            'border-amber-400 bg-amber-400 text-slate-900 hover:bg-amber-300'
                        )}
                        onClick={() => setProvider(item.id)}
                      >
                        <span className="text-sm font-semibold">
                          {translate(item.nameKey)}
                        </span>
                        <span
                          className={cn(
                            'text-xs',
                            provider === item.id
                              ? 'text-slate-900/80'
                              : 'text-slate-400'
                          )}
                        >
                          {translate(item.descriptionKey)}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-slate-400" />
                      <Label className="text-white font-medium">
                        {t('templates.title')}
                      </Label>
                    </div>
                    {selectedTemplateMeta?.isPro ? (
                      <Badge className="bg-amber-500 text-slate-900 text-[10px] uppercase tracking-wide">
                        {t('templates.proLabel')}
                      </Badge>
                    ) : null}
                  </div>
                  <Select
                    value={selectedTemplate}
                    onValueChange={(value) => setSelectedTemplate(value)}
                  >
                    <SelectTrigger className="bg-slate-950 border-white/15 text-left text-white">
                      <SelectValue
                        placeholder={translate('templates.fallbackName')}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-white">
                      {STYLE_TEMPLATES.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {translate(template.nameKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-300">
                    {translate(selectedTemplateMeta.descriptionKey)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-slate-400" />
                    <Label className="text-white font-medium">
                      {t('form.promptLabel')}
                    </Label>
                  </div>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t('form.promptPlaceholder')}
                    className="min-h-[140px] resize-none border border-white/10 bg-slate-950/70 text-white placeholder:text-slate-500 focus-visible:border-amber-400/60 focus-visible:ring-amber-400/40"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                    onClick={handleCopyPrompt}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    {t('form.copyButton')}
                  </Button>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-900 font-semibold py-6 text-lg shadow-[0_30px_60px_-40px_rgba(247,199,88,0.95)] hover:from-amber-300 hover:via-amber-200 hover:to-amber-300"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="h-5 w-5 mr-2 animate-spin" />
                      {t('form.generateButton.loading')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      {t('form.generateButton.idle')}
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-slate-400 text-center">
                      {t('form.progressMessage', { progress })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card
              id="polaroid-gallery"
              className="bg-slate-900/60 border-white/10 backdrop-blur-lg shadow-[0_40px_80px_-60px_rgba(88,118,255,0.65)]"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white text-lg">
                    {t('gallery.title')}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  {t('gallery.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedImages.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {generatedImages.map((image) => (
                      <div
                        key={image.id}
                        className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                      >
                        <img
                          src={image.url}
                          alt={image.prompt}
                          className="w-full aspect-[3/4] object-cover rounded-lg border border-slate-800"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                            onClick={() => handleDownloadImage(image.url)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                            onClick={() => handleShareImage(image.url)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-black/80 rounded px-2 py-1">
                            <div className="mb-1 flex items-center gap-1">
                              <Badge
                                variant="outline"
                                className="border-white/40 bg-white/10 text-[10px] uppercase tracking-wide text-white"
                              >
                                {providerMetaMap[image.provider]
                                  ? translate(
                                      providerMetaMap[image.provider].nameKey
                                    )
                                  : ''}
                              </Badge>
                              {image.requestId ? (
                                <span className="text-[10px] text-slate-400">
                                  #{image.requestId.slice(-6)}
                                </span>
                              ) : null}
                            </div>
                            <p className="text-white text-xs truncate">
                              {image.prompt}
                            </p>
                            <p className="text-slate-400 text-xs">
                              {image.style}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ImageIcon className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-medium mb-2">
                      {t('gallery.emptyTitle')}
                    </h3>
                    <p className="text-slate-400">
                      {t('gallery.emptyDescription')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AiPolaroidEditor;
