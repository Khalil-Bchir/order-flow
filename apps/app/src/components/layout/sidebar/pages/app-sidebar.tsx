'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Activity, Printer, Settings2, Shield, ShoppingCart } from 'lucide-react';
import type * as React from 'react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

const data = {
  navMain: [
    {
      title: 'Tableau de bord',
      url: '/admin',
      icon: Activity,
      isActive: true,
      items: [
        {
          title: 'Vue générale',
          url: '/admin',
          disabled: false,
        },
        {
          title: 'Statistiques',
          url: '#',
          disabled: true, // à venir
        },
      ],
    },
    {
      title: 'Gestion des commandes',
      url: '/admin/commandes',
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: 'Toutes les commandes',
          url: '/admin/commandes',
          disabled: false,
        },
        {
          title: 'Commandes en attente',
          url: '/admin/commandes?statut=en-attente',
          disabled: false,
        },
        {
          title: 'Commandes terminées',
          url: '/admin/commandes?statut=terminee',
          disabled: false,
        },
      ],
    },
    {
      title: 'Utilisateurs',
      url: '/admin/utilisateurs',
      icon: Shield,
      isActive: true,
      items: [
        {
          title: 'Liste des utilisateurs',
          url: '/admin/utilisateurs',
          disabled: false,
        },
        {
          title: 'Ajouter un utilisateur',
          url: '/admin/utilisateurs/nouveau',
          disabled: false,
        },
      ],
    },
    {
      title: 'Paramètres',
      url: '/admin/parametres',
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: 'Profil administrateur',
          url: '/admin/profil',
          disabled: false,
        },
        {
          title: 'Notifications',
          url: '/admin/notifications',
          disabled: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <div className="m-4 flex items-center gap-2">
          <Printer className="text-primary h-6 w-6" />
          <span className="text-md font-bold">CylindreImpression</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
