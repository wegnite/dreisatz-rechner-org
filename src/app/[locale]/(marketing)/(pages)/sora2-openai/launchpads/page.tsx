import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const KEYWORDS = [
  'sora2 openai 营销',
  'sora2 launchpad',
  'sora2 campaign',
  'openai sora 2 商业化',
  'sora2 转化',
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
    metadataTitle: 'Sora 2 OpenAI 市场发射台',
    metadataDescription:
      '围绕 sora2 openai 构建内容矩阵、渠道启动与客户转化策略，形成可执行的增长方案。',
    badge: 'sora2 openai 市场作战',
    heading: 'Sora 2 渠道与转化脚本',
    summary:
      '把行业使用场景拆成可复用的 campaign、内容与销售配套，确保 sora2 openai 从关注到签约全程可追踪。',
    paragraphs: [
      '首先将目标行业分成媒体、娱乐、品牌营销与教育四组，为每组设计“问题 -> 解决方案 -> 成功指标”的叙事框架，把 sora2 openai 的技术亮点转化为业务语言。',
      '公域推广方面，建议以每月核心主题为单位，结合案例长文、操作直播和数据快讯发布，围绕 sora2 openai 版本迭代及时输出新能力。',
      '私域运营使用飞书或 Slack 社群，搭配每周 Office Hour、季度路线图与模板分享，持续触达对 sora2 openai 感兴趣的潜在客户，并记录提问与反馈。',
      '线下活动模块规划行业闭门会、媒体开放日与客户共创营，每次活动配合预热素材、现场脚本与复盘邮件，确保 sora2 openai 的口碑能延伸至社交媒体与媒体报道。',
      '内容资产库包含案例故事、模板包、指标看板与 ROI 计算器，帮助销售团队快速演示 sora2 openai 的商业价值，同时将下载行为与 CRM 自动同步。',
      '对于广告投放，建议以搜索和专业社区为主，围绕 sora2 openai 的长尾词打造落地页 AB 测试，并在广告后链路植入试用申请表单。',
      '转化流程设置 MQL、SQL 与成交三段评分模型，与产品内的试玩开关联动，确保 sora2 openai 的体验申请能快速分配给正确的销售和解决方案团队。',
      '增长留存部分通过月度通讯、功能更新推送与客户案例访谈维持粘性，并邀请核心用户成为共创伙伴，一同规划 sora2 openai 的后续路线图。',
    ],
  },
  en: {
    metadataTitle: 'Sora 2 OpenAI Launchpads',
    metadataDescription:
      'Channel, content, and conversion plays that turn Sora 2 OpenAI interest into qualified pipeline and long-term revenue.',
    badge: 'Sora 2 GTM Ops',
    heading: 'Campaign Scripts for Sora 2 Adoption',
    summary:
      'Translate Sora 2 OpenAI capabilities into industry narratives, channel motions, and sales enablement collateral that compound.',
    paragraphs: [
      'Start with segmentation. Media, entertainment, commerce, and education each get a problem-solution-proof storyline so Sora 2 OpenAI speaks the language of outcomes, not just model specs.',
      'Public launch rhythm runs on monthly themes anchored by hero case studies, live build sessions, and KPI snapshots. Each drop aligns with the Sora 2 OpenAI release cadence for maximum relevance.',
      'Private channels rely on Slack or Lark communities plus weekly office hours, quarterly roadmap briefings, and template drops. Every question and insight feeds the activation backlog.',
      'Offline experiences—executive salons, press previews, co-creation sprints—ship with runbooks covering warm-up comms, onsite scripts, and follow-up nurture to amplify Sora 2 OpenAI advocacy.',
      'Content assets range from narrative decks and template bundles to metric dashboards and ROI calculators. Download events sync into CRM so sales can tailor demos around Sora 2 OpenAI proof points.',
      'Paid acquisition prioritises search and professional hubs, testing landing page variants mapped to long-tail Sora 2 OpenAI queries while embedding trial request forms directly in the flow.',
      'Conversion design scores leads across MQL, SQL, and closed-won stages with automation that toggles in-product trials, ensuring Sora 2 OpenAI prospects reach the right team instantly.',
      'Retention loops rely on monthly briefings, feature alerts, and customer spotlights. Power users graduate into a co-build council that shapes the Sora 2 OpenAI roadmap alongside your core team.',
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
      getUrlWithLocale('/sora2-openai/launchpads', availableLocale as Locale),
    ])
  );

  return constructMetadata({
    title: content.metadataTitle,
    description: content.metadataDescription,
    canonicalUrl: getUrlWithLocale('/sora2-openai/launchpads', locale),
    keywords: KEYWORDS,
    languageAlternates,
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Sora2OpenAILaunchpadsPage({ params }: PageProps) {
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
