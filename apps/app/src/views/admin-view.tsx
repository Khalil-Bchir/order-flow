'use client';

import { SideBar } from '@/components/layout/sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminView = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return <SideBar>{children}</SideBar>;
};

export default AdminView;
