import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import Link from 'next/link';

const KEYWORDS = [
  'sora2 openai',
  'sora 2 openai',
  'openai sora 2',
  'sora2 视频生成',
  'sora2 工作流',
];

type PageCopy = {
  metadataTitle: string;
  metadataDescription: string;
  badge: string;
  heading: string;
  summary: string;
  paragraphs: string[];
  links: { title: string; description: string; href: string }[];
};

const PAGE_CONTENT = {
  zh: {
    metadataTitle: 'Sora 2 OpenAI 视频增长蓝图',
    metadataDescription:
      '围绕 sora2 openai 的流量捕获、产品化拆解与转化路径，构建可复用的视频生成商业组合。',
    badge: 'sora2 openai 深度研究',
    heading: 'Sora 2 OpenAI 专题落地方案',
    summary:
      '梳理 sora2 openai 的产品节奏、实验数据与团队协作模式，帮助营销、运营与研发快速接手这一代视频模型。',
    paragraphs: [
      '我以 sora2 openai 为核心关键词对搜索、社区与垂直媒体进行爬取，提炼买家意图与技术痛点，把询盘问题结构化为“在现有堆栈里部署 Sora 2 OpenAI 是否稳定”“内容审核与版权是否可控”“如何导入既有工作流”，以此制定整站信息架构。',
      '产品模块按照 sora2 openai 的能力矩阵写成“场景、格式、控制”三段，用高帧率、镜头语法与故事节奏的指标呈现模型升级点，并补充训练底座、调度接口与推理成本，方便团队向上沟通商业价值。',
      '数据段收录公开演示、研究团队的评测以及内部实验记录，对比 V1 与 Sora 2 OpenAI 在时序稳定性、物理一致性与字幕清晰度上的提升，让访客一眼看到迭代幅度，也能判断是否适配自己的素材库。',
      '为了让销售与解决方案顾问快速响应需求，我把 sora2 openai 的部署流程拆成准备、提示编排、审片、交付四步，附上每一步的脚本模板、接口字段与常见报错，确保跨部门协作有据可查。',
      '内容营销部分围绕“行业试点 + 教学脚本 + 数据可视化”三条路径，规划 sora2 openai 的专题长尾词库，列出媒体投放、社区 AMA、私域运营的节点，方便市场团队复制到季度计划。',
      '增长漏斗将冷启动、触达、转化、复购四段指标与 sora2 openai 套件绑定，配合 CRM 字段与自动化触发条件，帮助运营团队记录从体验 Demo 到签约的每一个动作。',
      '风险与合规章节同步 OpenAI 官方发布节奏，总结审核策略、内容水印、数据隔离方案，并把客户需要准备的版权证明、行业监管条款做成 checklist，降低实施阻力。',
      '在组织协作方面，我给出了跨部门的周会节奏、指标仪表板与复盘模板，确保 sora2 openai 项目能够持续迭代，并在全员沟通中沉淀最佳实践。',
      '行动策略附上联系我们、申请测试席位、下载素材包与预约产品演示的入口，引导访客将兴趣转化为可追踪的销售线索。',
    ],
    links: [
      {
        title: 'Sora 2 工作流拆解',
        description: '分步骤说明如何在现有视频栈中嵌入 sora2 openai。',
        href: '/sora2-openai/workflows',
      },
      {
        title: 'Sora 2 市场发射台',
        description: '策划活动、内容与渠道组合，驱动 sora2 openai 转化。',
        href: '/sora2-openai/launchpads',
      },
    ],
  },
  en: {
    metadataTitle: 'Sora 2 OpenAI Growth Blueprint',
    metadataDescription:
      'A reusable landing framework that captures Sora 2 OpenAI demand, explains product value, and accelerates commercial video workflows.',
    badge: 'Sora 2 OpenAI Research',
    heading: 'Sora 2 OpenAI Activation Playbook',
    summary:
      'Map the product cadence, validation data, and cross-team rituals required to launch Sora 2 OpenAI with confidence.',
    paragraphs: [
      'The build starts with a demand crawl around “sora2 openai” across search, social, and analyst outlets. I clustered questions into stability, rights management, and workflow fit so the information architecture mirrors how buyers evaluate Sora 2 OpenAI.',
      'The product storyline distills Sora 2 OpenAI into three lenses—scene coverage, controllability, and cinematic pacing—then layers in training backbone, scheduling API, and cost envelopes so stakeholders can benchmark outcomes versus their current pipeline.',
      'A validation section compiles official showcases, third-party benchmarks, and in-house trials, contrasting Sora 2 OpenAI with earlier releases on temporal coherence, physics fidelity, and caption accuracy. Visitors immediately see what level of lift they can expect.',
      'To operationalize delivery, the playbook breaks the Sora 2 OpenAI rollout into preparation, prompt orchestration, review ops, and fulfilment. Each stage includes scripts, schema fields, and troubleshooting notes so solution engineers can respond quickly.',
      'Marketing activation pivots around industry pilots, narrative tutorials, and insight dashboards. The linked calendar shows how to seed long-tail keywords, live sessions, and owned channel drops aligned with Sora 2 OpenAI updates.',
      'The growth funnel ties cold outreach, engagement, conversion, and expansion KPIs directly to Sora 2 OpenAI packages. CRM automation rules and scoring logic make sure every demo request is tracked through to contract.',
      'Risk and compliance guidance mirrors OpenAI’s policy cadence, summarising watermarking, content moderation, and data isolation approaches. A downloadable checklist keeps legal, procurement, and security stakeholders aligned.',
      'Cross-functional rituals include a weekly metrics stand-up, a shared observability dashboard, and a retrospectives template so Sora 2 OpenAI wins and lessons compound inside the organisation.',
      'Calls-to-action invite visitors to request a pilot slot, download enablement kits, join the newsletter, or schedule a co-building workshop—turning curiosity about Sora 2 OpenAI into trackable revenue paths.',
    ],
    links: [
      {
        title: 'Sora 2 Workflow Systems',
        description:
          'Embed Sora 2 OpenAI into production-grade video pipelines.',
        href: '/sora2-openai/workflows',
      },
      {
        title: 'Sora 2 Launchpads',
        description:
          'Spin up campaigns and channel plays that convert Sora 2 demand.',
        href: '/sora2-openai/launchpads',
      },
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
      getUrlWithLocale('/sora2-openai', availableLocale as Locale),
    ])
  );

  return constructMetadata({
    title: content.metadataTitle,
    description: content.metadataDescription,
    canonicalUrl: getUrlWithLocale('/sora2-openai', locale),
    keywords: KEYWORDS,
    languageAlternates,
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Sora2OpenAIPage({ params }: PageProps) {
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

        <div className="grid gap-6 md:grid-cols-2">
          {content.links.map((link) => (
            <Card key={link.href}>
              <CardContent className="space-y-3 pt-6">
                <h2 className="text-lg font-semibold">{link.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
                <Link
                  href={getUrlWithLocale(link.href, locale)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {locale === 'zh' ? '查看详情' : 'View detail'}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
