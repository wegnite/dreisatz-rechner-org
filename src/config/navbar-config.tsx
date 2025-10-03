'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import {
  BookOpenIcon,
  CalculatorIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  HelpCircleIcon,
  MailIcon,
  SchoolIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Get navbar config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://dreisatzrechner.org/docs/config/navbar
 *
 * @returns The navbar config with translated titles and descriptions
 */
export function getNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  return [
    {
      title: t('primary.calculator'),
      href: '/#rechner',
      external: false,
    },
    {
      title: t('primary.guide'),
      href: '/#leitfaden',
      external: false,
    },
    {
      title: t('primary.formulas'),
      href: '/#formeln',
      external: false,
    },
    {
      title: t('primary.examples'),
      href: '/#anwendungsfaelle',
      external: false,
    },
    {
      title: t('primary.resources.title'),
      items: [
        {
          title: t('primary.resources.items.checklist.title'),
          description: t('primary.resources.items.checklist.description'),
          icon: <ClipboardCheckIcon className="size-4 shrink-0" />,
          href: '/#fehlervermeidung',
          external: false,
        },
        {
          title: t('primary.resources.items.tables.title'),
          description: t('primary.resources.items.tables.description'),
          icon: <CalculatorIcon className="size-4 shrink-0" />,
          href: '/#tabellen',
          external: false,
        },
        {
          title: t('primary.resources.items.school.title'),
          description: t('primary.resources.items.school.description'),
          icon: <SchoolIcon className="size-4 shrink-0" />,
          href: '/#schule',
          external: false,
        },
        {
          title: t('primary.resources.items.glossary.title'),
          description: t('primary.resources.items.glossary.description'),
          icon: <BookOpenIcon className="size-4 shrink-0" />,
          href: '/#glossar',
          external: false,
        },
        {
          title: t('primary.resources.items.faq.title'),
          description: t('primary.resources.items.faq.description'),
          icon: <HelpCircleIcon className="size-4 shrink-0" />,
          href: '/#faq',
          external: false,
        },
        {
          title: t('primary.resources.items.contact.title'),
          description: t('primary.resources.items.contact.description'),
          icon: <MailIcon className="size-4 shrink-0" />,
          href: Routes.Contact,
          external: false,
        },
        {
          title: t('primary.resources.items.privacy.title'),
          description: t('primary.resources.items.privacy.description'),
          icon: <ShieldCheckIcon className="size-4 shrink-0" />,
          href: Routes.PrivacyPolicy,
          external: false,
        },
        {
          title: t('primary.resources.items.terms.title'),
          description: t('primary.resources.items.terms.description'),
          icon: <FileTextIcon className="size-4 shrink-0" />,
          href: Routes.TermsOfService,
          external: false,
        },
      ],
    },
    // {
    //   title: t('blocks.title'),
    //   items: [
    //     {
    //       title: t('blocks.items.magicui.title'),
    //       icon: <ComponentIcon className="size-4 shrink-0" />,
    //       href: Routes.MagicuiBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.hero-section.title'),
    //       icon: <FlameIcon className="size-4 shrink-0" />,
    //       href: Routes.HeroBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.logo-cloud.title'),
    //       icon: <SquareCodeIcon className="size-4 shrink-0" />,
    //       href: Routes.LogoCloudBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.features.title'),
    //       icon: <WandSparklesIcon className="size-4 shrink-0" />,
    //       href: Routes.FeaturesBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.integrations.title'),
    //       icon: <SnowflakeIcon className="size-4 shrink-0" />,
    //       href: Routes.IntegrationsBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.content.title'),
    //       icon: <NewspaperIcon className="size-4 shrink-0" />,
    //       href: Routes.ContentBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.stats.title'),
    //       icon: <ChartNoAxesCombinedIcon className="size-4 shrink-0" />,
    //       href: Routes.StatsBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.team.title'),
    //       icon: <UsersIcon className="size-4 shrink-0" />,
    //       href: Routes.TeamBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.testimonials.title'),
    //       icon: <ThumbsUpIcon className="size-4 shrink-0" />,
    //       href: Routes.TestimonialsBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.callToAction.title'),
    //       icon: <RocketIcon className="size-4 shrink-0" />,
    //       href: Routes.CallToActionBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.footer.title'),
    //       icon: <FootprintsIcon className="size-4 shrink-0" />,
    //       href: Routes.FooterBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.pricing.title'),
    //       icon: <CircleDollarSignIcon className="size-4 shrink-0" />,
    //       href: Routes.PricingBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.comparator.title'),
    //       icon: <SplitSquareVerticalIcon className="size-4 shrink-0" />,
    //       href: Routes.ComparatorBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.faq.title'),
    //       icon: <CircleHelpIcon className="size-4 shrink-0" />,
    //       href: Routes.FAQBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.login.title'),
    //       icon: <LogInIcon className="size-4 shrink-0" />,
    //       href: Routes.LoginBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.signup.title'),
    //       icon: <UserPlusIcon className="size-4 shrink-0" />,
    //       href: Routes.SignupBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.forgot-password.title'),
    //       icon: <LockKeyholeIcon className="size-4 shrink-0" />,
    //       href: Routes.ForgotPasswordBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.contact.title'),
    //       icon: <MailIcon className="size-4 shrink-0" />,
    //       href: Routes.ContactBlocks,
    //       external: false,
    //     },
    //   ],
    // },
  ];
}
