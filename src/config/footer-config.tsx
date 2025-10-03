'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import { useTranslations } from 'next-intl';

/**
 * Get footer config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://dreisatzrechner.org/docs/config/footer
 *
 * @returns The footer config with translated titles
 */
export function getFooterLinks(): NestedMenuItem[] {
  const t = useTranslations();

  return [
    {
      title: t('calculator.title'),
      items: [
        {
          title: t('calculator.items.start'),
          href: Routes.Calculator,
          external: false,
        },
        {
          title: t('calculator.items.stepGuide'),
          href: Routes.VisualGuide,
          external: false,
        },
        {
          title: t('calculator.items.formulas'),
          href: Routes.Formulas,
          external: false,
        },
        {
          title: t('calculator.items.tables'),
          href: Routes.Formulas,
          external: false,
        },
      ],
    },
    {
      title: t('learn.title'),
      items: [
        {
          title: t('learn.items.useCases'),
          href: Routes.UseCases,
          external: false,
        },
        {
          title: t('learn.items.practice'),
          href: Routes.UseCases,
          external: false,
        },
        {
          title: t('learn.items.glossary'),
          href: Routes.Glossary,
          external: false,
        },
        {
          title: t('learn.items.checklist'),
          href: Routes.Checklist,
          external: false,
        },
        {
          title: t('learn.items.blog'),
          href: Routes.Blog,
          external: false,
        },
      ],
    },
    {
      title: t('service.title'),
      items: [
        {
          title: t('service.items.contact'),
          href: Routes.Contact,
          external: false,
        },
        {
          title: t('service.items.newsletter'),
          href: Routes.Newsletter,
          external: false,
        },
        {
          title: t('service.items.school'),
          href: Routes.UseCases,
          external: false,
        },
      ],
    },
    {
      title: t('legal.title'),
      items: [
        {
          title: t('legal.items.cookiePolicy'),
          href: Routes.CookiePolicy,
          external: false,
        },
        {
          title: t('legal.items.privacyPolicy'),
          href: Routes.PrivacyPolicy,
          external: false,
        },
        {
          title: t('legal.items.termsOfService'),
          href: Routes.TermsOfService,
          external: false,
        },
      ],
    },
  ];
}
