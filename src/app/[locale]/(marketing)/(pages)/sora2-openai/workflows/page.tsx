import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const KEYWORDS = [
  'sora2 openai 工作流',
  'sora2 pipeline',
  'openai sora 2 workflow',
  'sora2 微调',
  'sora2 prompt',
];

type PageCopy = {
  metadataTitle: string;
  metadataDescription: string;
  badge: string;
  heading: string;
  summary: string;
  paragraphs: string[];
};

const PAGE_CONTENT = {
  zh: {
    metadataTitle: 'Sora 2 OpenAI 工作流全景',
    metadataDescription:
      '描述 sora2 openai 从素材准备、提示编排到渲染交付的流程，确保团队能够把模型接入现有视频栈。',
    badge: 'sora2 openai 流程手册',
    heading: 'Sora 2 工作流拆解指南',
    summary:
      '提供可落地的管线设计、工具链配置与协同节奏，让 sora2 openai 在日常制作中稳定输出。',
    paragraphs: [
      '流程从素材与语料准备开始，我把客户现有的视觉素材、品牌镜头表与声音库统一成“故事板 + 语义标签”的结构，保证 sora2 openai 能够快速理解镜头语言。',
      '在提示工程阶段，基于 sora2 openai 的时序建模特性，推荐采用“故事段落 + 镜头指令 + 物理约束”三段式提示，并预设摄影机语法、色彩风格、剪辑节奏的可选模板，缩短创作人员的调参时间。',
      '运行环境上，将推理集群拆成预处理、主推理和后处理三层：预处理负责字幕、图像特征提取，主推理集群对接 OpenAI API 或私有化部署，后处理完成字幕嵌入、音频混轨与水印。',
      '为了捕获异常情况，搭建实时日志与指标面板，监控 GPU 利用率、token 消耗、渲染时长与失败率，并将报警推送到 Slack 或飞书，确保 sora2 openai 在高并发下仍可控。',
      '团队协作方面，建议把创意、制作、审核三类角色纳入同一工作板，设定“素材就绪”“提示确认”“渲染通过”“交付打包”的看板节点，标注负责人与 SLA，避免流程堆积。',
      '质检步骤包含帧间稳定性检测、台词准确度校对以及品牌合规审查。我提供了自动化脚本与人工复核模板，确保 sora2 openai 的成片符合商业播出标准。',
      '交付环节将项目输出同步到 DAM 或云盘，生成带水印与无水印两个版本，并记录版本号与提示词，方便未来复用，形成 sora2 openai 的资产库。',
      '循环优化部分基于项目评分、成功率与客户反馈做复盘，将高评分的提示词与剪辑策略沉淀成“最佳实践”，进入下一轮制作的标准组件。',
    ],
  },
  en: {
    metadataTitle: 'Sora 2 OpenAI Workflow Systems',
    metadataDescription:
      'Step-by-step guidance for folding Sora 2 OpenAI into your video pipeline—from sourcing inputs to QA, delivery, and iteration.',
    badge: 'Sora 2 Workflow Manual',
    heading: 'Breakdown of the Sora 2 Production Flow',
    summary:
      'Design a resilient pipeline, align tooling, and orchestrate teams so Sora 2 OpenAI becomes a predictable production partner.',
    paragraphs: [
      'Everything starts with asset consolidation. We convert briefs, brand kits, and reference clips into a storyboard-plus-tag format so Sora 2 OpenAI receives consistent context across sequences.',
      'Prompt engineering follows a three-layer pattern—narrative segments, shot directions, and physical constraints. Camera grammar, grade presets, and pacing macros ship as reusable templates so creative leads iterate faster.',
      'We split infrastructure into preprocessing, core inference, and post-processing clusters. Preprocessing handles caption alignment and feature extraction, core inference connects to the OpenAI endpoint or a managed deployment, and post-processing finalises subtitles, audio, and watermarking.',
      'Observability is non-negotiable. GPU load, token budgets, render latency, and failure classes are streamed into dashboards with alert hooks so throughput stays healthy even under launch spikes.',
      'For collaboration we map creative, producer, and QA roles onto a shared Kanban—“assets ready”, “prompt locked”, “render approved”, “package shipped”—with owners and SLAs to prevent bottlenecks.',
      'Quality gates include temporal stability scans, dialogue accuracy checks, and compliance sign-off. Automation scripts and review templates keep Sora 2 OpenAI output broadcast-ready.',
      'Delivery bridges into DAM or cloud storage with paired watermarked and clean renders. Each batch logs prompt sets, parameters, and feedback so the Sora 2 OpenAI asset library keeps compounding value.',
      'Continuous improvement loops in project scores, render success rates, and client quotes. High-performing prompts and editorial patterns become building blocks for the next engagement.',
    ],
  },
} satisfies Record<string, PageCopy>;

type SupportedLocale = keyof typeof PAGE_CONTENT;

const FALLBACK_LOCALE: SupportedLocale = 'zh';

function resolveContent(locale: Locale): PageCopy {
  const key = (locale as SupportedLocale) ?? FALLBACK_LOCALE;
  return PAGE_CONTENT[key] ?? PAGE_CONTENT[FALLBACK_LOCALE];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const content = resolveContent(locale);
  const languageAlternates = Object.fromEntries(
    routing.locales.map((availableLocale) => [
      availableLocale,
      getUrlWithLocale('/sora2-openai/workflows', availableLocale as Locale),
    ])
  );

  return constructMetadata({
    title: content.metadataTitle,
    description: content.metadataDescription,
    canonicalUrl: getUrlWithLocale('/sora2-openai/workflows', locale),
    keywords: KEYWORDS,
    languageAlternates,
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Sora2OpenAIWorkflowsPage({ params }: PageProps) {
  const { locale } = await params;
  const content = resolveContent(locale);

  return (
    <Container className="py-16 px-4">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-4 text-center">
          <Badge variant="secondary" className="mx-auto w-fit gap-2">
            {content.badge}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {content.heading}
          </h1>
          <p className="text-lg text-muted-foreground">{content.summary}</p>
        </div>

        <Card>
          <CardContent className="space-y-6 pt-6 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            {content.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
