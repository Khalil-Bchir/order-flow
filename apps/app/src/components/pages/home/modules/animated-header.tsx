'use client';

import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/smooth-scroll';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Printer } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

import { MobileNav } from './';

export default function AnimatedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
  };

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-md backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
            <Printer className="text-primary h-6 w-6" />
          </motion.div>
          <span className="text-xl font-bold">CylindreImpression</span>
        </motion.div>

        <nav className="hidden gap-6 md:flex">
          {[
            { href: '#services', label: 'Services' },
            { href: '#industries', label: 'Secteurs' },
            { href: '#process', label: 'Notre Processus' },
            { href: '#gallery', label: 'Galerie' },
            { href: '#testimonials', label: 'Témoignages' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="hover:text-primary text-sm font-medium underline-offset-4 transition-colors hover:underline"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <div className="hidden md:flex md:space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button asChild>
                <Link
                  href="/client/create-order"
                  onClick={(e) => router.push('/client/create-order')}
                >
                  Passer une Commande
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button asChild variant="outline">
                <Link href="/auth/login" onClick={(e) => router.push('/auth/login')}>
                  Se Connecter
                </Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <ThemeToggle />
          </motion.div>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
