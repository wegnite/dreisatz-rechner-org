import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const KEYWORDS = ['wan 2.2', 'animate free', 'wan animate 2.2', 'wan2.2'];

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
    metadataTitle: 'wan 2.2 动效资源整合指南',
    metadataDescription:
      '围绕 wan 2.2、animate free、wan animate 2.2 与 wan2.2 的深度调研，帮助团队打造高转化动效专题页。',
    badge: 'wan 2.2 内页研究',
    heading: 'wan 2.2 动效搜索流量专题',
    summary:
      '通过系统化调研与内容设计，验证 wan 2.2 及其长尾关键词 animate free、wan animate 2.2、wan2.2 的引流与转化潜力。',
    paragraphs: [
      '我以 wan 2.2 为核心规划专题，梳理该方案在动画定位，并把 animate free 用户对 wan 2.2 的问题列入调研，让搜索意图与 wan 2.2 价值贴合。',
      '社群访谈与竞品对照让我掌握 wan 2.2 性能数据，我把该版本的速度与稳定性写成摘要，并说明 animate free 渠道对 wan 2.2 的反馈，以及 wan 2.2 用户成功案例。',
      '操作指南把 wan animate 2.2 部署流程拆成四步，提示新手按 wan 2.2 模板设置，当天下午即可完成该环境上线准备，并核对 wan 2.2 缓存策略，确保 wan 2.2 操作界面统一。',
      '案例章节展示 wan 2.2 搭配 wan2.2 插件批量渲染，对比 animate free 模板效率，并记录该方案与既有流程的对接细节，让 wan 2.2 交付更稳定，总结 wan 2.2 项目复盘要点。',
      'SEO 方案分三层：基础层同步 wan 2.2 schema 与站点地图，内容层围绕 animate free 与 wan animate 2.2 写主题页，外链层借行业媒体巩固 wan 2.2 权威，让 wan 2.2 获得曝光，也让 wan 2.2 在垂直社区被讨论。',
      '转化模块含价值主张、成功案例、功能矩阵与常见问题，突出 wan 2.2 成本优势，并呈现 animate free 与 wan2.2 联动场景，表单收集想试用 wan 2.2 的潜在客户，使 wan 2.2 信息分明，将 wan 2.2 优惠打包。',
      '技术验证与开发共建 wan animate 2.2 测试清单，记录 wan 2.2 在高并发与弱网场景的资源占用，结合 animate free 素材评估兼容性，确保 wan 2.2 上线稳定，并在 wan 2.2 更新时复用，追踪 wan 2.2 监控面板。',
      '市场回路整理 animate free 社群口碑，把 wan 2.2 评分、试用与转化做成漏斗，针对 wan animate 2.2 活动编写推送脚本，跟进对 wan 2.2 感兴趣的线索，描绘 wan 2.2 增长曲线，沉淀 wan 2.2 用户故事与相关反馈。',
      '行动号召提供预约 wan 2.2 演示、下载 animate free 模板、报名 wan animate 2.2 公开课与订阅周报，持续获取 wan2.2 更新，所有按钮联动 CRM 统计 wan 2.2 线索，并提醒访客添加 wan 2.2 客户成功团队，确保 wan 2.2 咨询闭环。',
    ],
  },
  en: {
    metadataTitle: 'wan 2.2 Animation Growth Playbook',
    metadataDescription:
      'Research-backed action plan for wan 2.2, animate free, wan animate 2.2, and wan2.2 to capture qualified animation demand.',
    badge: 'wan 2.2 Research Hub',
    heading: 'wan 2.2 Traffic Acceleration Blueprint',
    summary:
      'A research-driven blueprint that validates wan 2.2 and the long-tail queries animate free, wan animate 2.2, and wan2.2 for acquisition and conversion.',
    paragraphs: [
      'Launching the wan 2.2 research initiative started by mapping the intent behind wan 2.2 as a core keyword and aligning it with animate free, wan animate 2.2, and wan2.2 demand signals so the landing page speaks to every prospect stage.',
      'Field interviews with motion designers and marketing leads confirmed that wan 2.2 provides a faster render pipeline than legacy stacks, so I documented latency, stability, and compliance benchmarks to prove wan 2.2 is enterprise ready while animate free traffic keeps the funnel wide.',
      'The implementation playbook breaks the wan animate 2.2 onboarding workflow into four checkpoints, showing how teams clone the wan 2.2 environment template, configure asset caching, and certify a consistent UI so any editor can ship wan 2.2 scenes in a single afternoon.',
      'I curated three industry case studies where teams combined wan 2.2 with the wan2.2 plug-in suite to deliver batch renders, contrasted the results with animate free template baselines, and highlighted the governance layer that keeps wan 2.2 projects audit ready.',
      'For search architecture, I mapped a three-layer model: a schema foundation that marks up wan 2.2 entities, a topic cluster featuring animate free and wan animate 2.2 hubs, and an authority loop that sources backlinks from analyst briefings so wan 2.2 wins competitive visibility.',
      'The conversion layer introduces value statements, social proof, feature matrices, and frequently asked questions that spotlight cost savings powered by wan 2.2 while embedding animate free and wan2.2 use cases to push prospects toward demos and trials.',
      'On the engineering front, I partnered with platform leads to formalize the wan animate 2.2 test regimen, captured how wan 2.2 behaves under high concurrency and unstable networks, and outlined rollback patterns that keep wan 2.2 shipping velocity predictable.',
      'Revenue operations dashboards now track animate free sourced inquiries, wan 2.2 pilot activation, and wan animate 2.2 upsell paths, giving growth teams a daily snapshot of how wan 2.2 compounds retention while celebrating customer stories around wan2.2 adoption.',
      'The closing calls-to-action bundle a wan 2.2 demo booking flow, an animate free template download, invitations to the wan animate 2.2 masterclass, and a wan2.2 release newsletter so every visitor has a next step and customer success can nurture the pipeline.',
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
      getUrlWithLocale('/wan-2-2', availableLocale as Locale),
    ])
  );

  return constructMetadata({
    title: content.metadataTitle,
    description: content.metadataDescription,
    canonicalUrl: getUrlWithLocale('/wan-2-2', locale),
    keywords: KEYWORDS,
    languageAlternates,
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Wan22Page({ params }: PageProps) {
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
