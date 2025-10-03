'use client';

import { Routes } from '@/routes';
import type { MenuItem } from '@/types';
import {
  CreditCardIcon,
  LayoutDashboardIcon,
  Settings2Icon,
} from 'lucide-react';

/**
 * Get avatar config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://mksaas.com/docs/config/avatar
 *
 * @returns The avatar config with translated titles
 */
export function getAvatarLinks(): MenuItem[] {
  return [
    {
      title: 'Dashboard',
      href: Routes.Dashboard,
      icon: <LayoutDashboardIcon className="size-4 shrink-0" />,
    },
    {
      title: 'Billing',
      href: Routes.SettingsBilling,
      icon: <CreditCardIcon className="size-4 shrink-0" />,
    },
    {
      title: 'Settings',
      href: Routes.SettingsProfile,
      icon: <Settings2Icon className="size-4 shrink-0" />,
    },
  ];
}
