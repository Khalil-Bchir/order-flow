'use client';

import { AnimatedCard, AnimatedHeader, AnimatedSection } from '@/components/pages/home/modules';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { scrollToSection } from '@/lib/smooth-scroll';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Coffee,
  Droplet,
  Package,
  Palette,
  Phone,
  Printer,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  // Handle anchor links for smooth scrolling on page load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AnimatedHeader />

      <main className="flex-1 pt-16">
        {/* Section Hero */}
        <AnimatedSection className="bg-muted py-16 md:py-28 lg:py-36" id="hero">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Solutions d'Impression Personnalisées pour Vos Produits Cylindriques
                </motion.h1>
                <motion.p
                  className="text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Transformez vos gobelets, canettes et contenants en outils de communication
                  puissants. Services d'impression haute qualité adaptés aux entreprises de toutes
                  tailles.
                </motion.p>
                <motion.div
                  className="flex flex-col gap-3 sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <Button size="lg" asChild className="group relative overflow-hidden">
                    <Link
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('contact');
                      }}
                    >
                      <span className="relative z-10">Devis Gratuit</span>
                      <span className="bg-primary-foreground/10 absolute inset-0 translate-y-full transform transition-transform duration-300 group-hover:translate-y-0"></span>
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="group">
                    <Link
                      href="#gallery"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('gallery');
                      }}
                    >
                      <span className="group-hover:text-primary transition-colors">
                        Voir Nos Réalisations
                      </span>
                    </Link>
                  </Button>
                </motion.div>
              </div>
              <motion.div
                className="relative h-[400px] overflow-hidden rounded-lg lg:h-[500px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/hero.png"
                  alt="Divers gobelets et contenants imprimés"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="from-primary/20 absolute inset-0 bg-gradient-to-tr to-transparent opacity-60"></div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section Services */}
        <AnimatedSection id="services" className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Nos Services d'Impression
                </motion.h2>
                <motion.p
                  className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Nous offrons des solutions d'impression complètes pour tous types de produits
                  cylindriques
                </motion.p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedCard
                delay={0}
                className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6 transition-shadow duration-300 hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Coffee className="text-primary mb-4 h-12 w-12" />
                </motion.div>
                <h3 className="text-xl font-bold">Gobelets à Café</h3>
                <p className="text-muted-foreground text-center">
                  Gobelets en papier et réutilisables personnalisés pour cafés et coffee shops.
                </p>
              </AnimatedCard>
              <AnimatedCard
                delay={1}
                className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6 transition-shadow duration-300 hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Package className="text-primary mb-4 h-12 w-12" />
                </motion.div>
                <h3 className="text-xl font-bold">Contenants Produits</h3>
                <p className="text-muted-foreground text-center">
                  Solutions d'emballage personnalisées pour alimentaire, cosmétiques et produits de
                  détail.
                </p>
              </AnimatedCard>
              <AnimatedCard
                delay={2}
                className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6 transition-shadow duration-300 hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Droplet className="text-primary mb-4 h-12 w-12" />
                </motion.div>
                <h3 className="text-xl font-bold">Canettes de Boisson</h3>
                <p className="text-muted-foreground text-center">
                  Impression haute qualité sur canettes aluminium, bouteilles et autres contenants
                  de boisson.
                </p>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Section Secteurs */}
        <AnimatedSection id="industries" className="bg-muted py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Secteurs que Nous Servons
                </motion.h2>
                <motion.p
                  className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Nos solutions d'impression sont adaptées aux besoins de divers secteurs d'activité
                </motion.p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Coffee,
                  title: 'Coffee Shops',
                  desc: "Gobelets personnalisés qui renforcent l'identité de votre café",
                },
                {
                  icon: Droplet,
                  title: 'Producteurs de Miel',
                  desc: 'Pots de miel et contenants personnalisés',
                },
                {
                  icon: ShoppingBag,
                  title: 'Marques de Détail',
                  desc: 'Emballages distinctifs pour produits de détail',
                },
                {
                  icon: Package,
                  title: 'Alimentaire & Boissons',
                  desc: 'Impression alimentaire pour contenants et emballages',
                },
              ].map((item, index) => (
                <AnimatedCard
                  key={index}
                  delay={index}
                  className="flex flex-col items-center space-y-2 p-4"
                >
                  <motion.div
                    className="bg-primary/10 rounded-full p-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="text-primary h-8 w-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-center">{item.desc}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section Avantages */}
        <AnimatedSection className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Pourquoi Nous Choisir
                </motion.h2>
                <motion.p
                  className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Nous offrons qualité, fiabilité et service exceptionnel pour tous vos besoins
                  d'impression
                </motion.p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                {
                  title: 'Qualité Premium',
                  desc: 'Impression haute résolution qui maintient la précision des couleurs et la durabilité',
                },
                {
                  title: 'Solutions Sur Mesure',
                  desc: "Services d'impression adaptés à vos exigences spécifiques",
                },
                {
                  title: 'Délais Rapides',
                  desc: 'Processus de production efficace pour respecter vos échéances',
                },
                {
                  title: 'Prix Compétitifs',
                  desc: 'Solutions économiques sans compromis sur la qualité',
                },
              ].map((item, index) => (
                <AnimatedCard key={index} delay={index} className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="text-primary mt-1 h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section Processus */}
        <AnimatedSection id="process" className="bg-muted py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Notre Processus
                </motion.h2>
                <motion.p
                  className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Un processus simple et efficace de la conception à la livraison
                </motion.p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: Palette,
                  title: '1. Conception',
                  desc: "Travaillez avec notre équipe de design ou fournissez vos propres créations pour l'impression",
                },
                {
                  icon: Printer,
                  title: '2. Production',
                  desc: 'Impression haute qualité sur vos produits cylindriques avec une technologie avancée',
                },
                {
                  icon: Truck,
                  title: '3. Livraison',
                  desc: 'Emballage sécurisé et livraison ponctuelle à votre entreprise',
                },
              ].map((item, index) => (
                <AnimatedCard
                  key={index}
                  delay={index}
                  className="bg-background flex flex-col items-center space-y-4 rounded-lg border p-6 transition-shadow duration-300 hover:shadow-lg"
                >
                  <motion.div
                    className="bg-primary/10 rounded-full p-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="text-primary h-8 w-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-center">{item.desc}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section Galerie */}
        <AnimatedSection id="gallery" className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Nos Réalisations
                </motion.h2>
                <motion.p
                  className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Découvrez notre portfolio de produits cylindriques personnalisés
                </motion.p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { src: '/gall-1.png', alt: 'Gobelets à café avec impression personnalisée' },
                { src: '/gall-2.png', alt: 'Pots de miel avec étiquettes personnalisées' },
                { src: '/gall-3.png', alt: 'Canettes de boisson avec impression personnalisée' },
                { src: '/gall-4.png', alt: 'Contenants alimentaires avec marquage personnalisé' },
                { src: '/gall-5.png', alt: 'Contenants cosmétiques avec impression personnalisée' },
                { src: '/gall-6.png', alt: 'Emballages de détail avec marquage personnalisé' },
              ].map((item, index) => (
                <AnimatedCard
                  key={index}
                  delay={index}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="bg-primary/20 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-background/80 rounded-md p-3 backdrop-blur-sm"
                    >
                      <p className="text-sm font-medium">{item.alt}</p>
                    </motion.div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section Témoignages */}
        <AnimatedSection id="testimonials" className="bg-muted py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Ce que Disent Nos Clients
                </motion.h2>
                <motion.p
                  className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Découvrez les témoignages d'entreprises qui ont transformé leur image de marque
                  avec nos solutions d'impression
                </motion.p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "CylindreImpression a transformé l'image de marque de notre coffee shop. La qualité d'impression sur nos gobelets est exceptionnelle, et nos clients adorent les designs uniques.",
                  name: 'Sarah Dubois',
                  company: 'Café du Havre',
                },
                {
                  quote:
                    'En tant que producteur de miel, avoir notre marque représentée de manière cohérente sur nos contenants est crucial. CylindreImpression offre une qualité exceptionnelle à chaque fois.',
                  name: 'Michel Leroy',
                  company: 'Miel Doré des Alpes',
                },
                {
                  quote:
                    "L'équipe de CylindreImpression a parfaitement compris notre vision. Leur attention aux détails et leurs délais rapides ont dépassé nos attentes.",
                  name: 'Émilie Martin',
                  company: 'Cosmétiques Purs',
                },
              ].map((item, index) => (
                <AnimatedCard
                  key={index}
                  delay={index}
                  className="bg-background flex flex-col space-y-4 rounded-lg border p-6 transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-primary font-serif text-4xl"
                    >
                      "
                    </motion.div>
                    <p className="italic">{item.quote}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <span className="text-primary font-bold">{item.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-sm">{item.company}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Section Contact */}
        <AnimatedSection id="contact" className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <motion.h2
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Contactez-Nous
                  </motion.h2>
                  <motion.p
                    className="text-muted-foreground md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Prêt à transformer vos produits cylindriques ? Contactez-nous pour un devis
                    gratuit ou pour discuter de votre projet.
                  </motion.p>
                </div>
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Phone className="text-primary h-5 w-5" />
                  <span>+33 1 23 45 67 89</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-5 w-5"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>contact@cylindreimpression.fr</span>
                </motion.div>
              </div>
              <AnimatedCard delay={1} className="bg-muted space-y-4 rounded-lg p-6 shadow-lg">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Demander un Devis</h3>
                  <p className="text-muted-foreground">
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.
                  </p>
                </div>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <label
                        htmlFor="company"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Nom de l'Entreprise
                      </label>
                      <Input id="company" placeholder="Nom de votre entreprise" />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input id="email" placeholder="Votre adresse email" type="email" />
                    </motion.div>
                  </div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Téléphone
                    </label>
                    <Input id="phone" placeholder="Votre numéro de téléphone" type="tel" />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <label
                      htmlFor="product"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Type de Produit
                    </label>
                    <Input id="product" placeholder="Gobelets à café, pots de miel, etc." />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Détails du Projet
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Parlez-nous de votre projet"
                      className="min-h-[120px]"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Button type="submit" className="w-full">
                      Envoyer la Demande
                    </Button>
                  </motion.div>
                </form>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Printer className="h-5 w-5" />
            <span className="text-lg font-bold">CylindreImpression</span>
          </motion.div>
          <div className="flex flex-col gap-4 text-sm md:flex-row md:gap-6">
            <Link href="#" className="underline-offset-4 hover:underline">
              Politique de Confidentialité
            </Link>
            <Link href="#" className="underline-offset-4 hover:underline">
              Conditions d'Utilisation
            </Link>
            <Link href="#" className="underline-offset-4 hover:underline">
              Nous Contacter
            </Link>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CylindreImpression. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
