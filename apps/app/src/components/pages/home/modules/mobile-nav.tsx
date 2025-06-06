'use client';

import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/smooth-scroll';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '#services', label: 'Services' },
  { href: '#industries', label: 'Secteurs' },
  { href: '#process', label: 'Notre Processus' },
  { href: '#gallery', label: 'Galerie' },
  { href: '#testimonials', label: 'Témoignages' },
  { href: '#contact', label: 'Contact' },
];

export default function MobileNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const sectionId = href.replace('#', '');
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-background/95 fixed inset-0 z-50 backdrop-blur-sm"
          >
            <div className="bg-background/95 container flex h-full flex-col">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                      <path d="M9.6 4.6A2.5 2.5 0 1 1 11.3 9H2" />
                      <path d="M12.6 19.4A2.5 2.5 0 1 0 14.3 15H2" />
                    </svg>
                  </motion.div>
                  <span className="text-xl font-bold">CylindreImpression</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  aria-label="Fermer le menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <motion.nav
                className="flex flex-1 flex-col items-center justify-center gap-8 "
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-2xl font-medium"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="mt-8 flex w-full max-w-xs flex-col gap-4"
                >
                  <Button size="lg" className="w-full" onClick={() => handleNavClick('#contact')}>
                    Demander un Devis
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/create-order')}
                  >
                    Passer une Commande
                  </Button>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
