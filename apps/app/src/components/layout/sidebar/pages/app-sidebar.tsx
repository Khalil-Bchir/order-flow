'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Activity, Settings2, Shield, ShoppingCart, Wallet } from 'lucide-react';
import type * as React from 'react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

const networkId = '1';

const data = {
  navMain: [
    {
      title: 'Tableau de Bord',
      url: '/',
      icon: Activity,
      isActive: true,
      items: [
        {
          title: 'Aperçu',
          url: '/',
          disabled: false,
        },
        {
          title: 'Analytiques',
          url: '#',
          disabled: true, // Future feature
        },
      ],
    },
    {
      title: 'Commandes',
      url: '#',
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: 'Passer Commande',
          url: '/create-order',
          disabled: false,
        },
        {
          title: 'Mes Commandes',
          url: '/orders',
          disabled: false,
        },
        {
          title: 'Suivi Commandes',
          url: '/order-tracking',
          disabled: false,
        },
      ],
    },
    {
      title: 'Administration',
      url: '#',
      icon: Shield,
      items: [
        {
          title: 'Gestion Commandes',
          url: '/admin/orders',
          disabled: false,
        },
        {
          title: 'Gestion Utilisateurs',
          url: '/admin/users',
          disabled: false,
        },
        {
          title: 'Rapports',
          url: '/admin/reports',
          disabled: true, // Future feature
        },
      ],
    },
    {
      title: 'Paramètres',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Profil',
          url: '/profile',
          disabled: false,
        },
        {
          title: 'Notifications',
          url: '/notifications',
          disabled: false,
        },
        {
          title: 'Paramètres Généraux',
          url: '#',
          disabled: true, // Future feature
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Projet Demo',
      url: '#',
      icon: Wallet,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
