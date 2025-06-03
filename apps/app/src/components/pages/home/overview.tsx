import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background sticky top-0 z-40 border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Printer className="h-6 w-6" />
            <span className="text-xl font-bold">CylindreImpression</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#services"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Services
            </Link>
            <Link
              href="#industries"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Secteurs
            </Link>
            <Link
              href="#process"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Notre Processus
            </Link>
            <Link
              href="#gallery"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Galerie
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Témoignages
            </Link>
          </nav>
          <div>
            <Button asChild>
              <Link href="#contact">Demander un Devis</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Section Hero */}
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Solutions d'Impression Personnalisées pour Vos Produits Cylindriques
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Transformez vos gobelets, canettes et contenants en outils de communication
                  puissants. Services d'impression haute qualité adaptés aux entreprises de toutes
                  tailles.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="#contact">Devis Gratuit</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#gallery">Voir Nos Réalisations</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg lg:h-[500px]">
                <Image
                  src="/hero.png"
                  alt="Divers gobelets et contenants imprimés"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section id="services" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Nos Services d'Impression
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nous offrons des solutions d'impression complètes pour tous types de produits
                  cylindriques
                </p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6">
                <Coffee className="text-primary mb-4 h-12 w-12" />
                <h3 className="text-xl font-bold">Gobelets à Café</h3>
                <p className="text-muted-foreground text-center">
                  Gobelets en papier et réutilisables personnalisés pour cafés et coffee shops.
                </p>
              </div>
              <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6">
                <Package className="text-primary mb-4 h-12 w-12" />
                <h3 className="text-xl font-bold">Contenants Produits</h3>
                <p className="text-muted-foreground text-center">
                  Solutions d'emballage personnalisées pour alimentaire, cosmétiques et produits de
                  détail.
                </p>
              </div>
              <div className="bg-background flex flex-col items-center space-y-2 rounded-lg border p-6">
                <Droplet className="text-primary mb-4 h-12 w-12" />
                <h3 className="text-xl font-bold">Canettes de Boisson</h3>
                <p className="text-muted-foreground text-center">
                  Impression haute qualité sur canettes aluminium, bouteilles et autres contenants
                  de boisson.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Secteurs */}
        <section id="industries" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Secteurs que Nous Servons
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nos solutions d'impression sont adaptées aux besoins de divers secteurs d'activité
                </p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 p-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <Coffee className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Coffee Shops</h3>
                <p className="text-muted-foreground text-center">
                  Gobelets personnalisés qui renforcent l'identité de votre café
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <Droplet className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Producteurs de Miel</h3>
                <p className="text-muted-foreground text-center">
                  Pots de miel et contenants personnalisés
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <ShoppingBag className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Marques de Détail</h3>
                <p className="text-muted-foreground text-center">
                  Emballages distinctifs pour produits de détail
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <Package className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Alimentaire & Boissons</h3>
                <p className="text-muted-foreground text-center">
                  Impression alimentaire pour contenants et emballages
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Avantages */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pourquoi Nous Choisir
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nous offrons qualité, fiabilité et service exceptionnel pour tous vos besoins
                  d'impression
                </p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex items-start space-x-4">
                <CheckCircle className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-xl font-bold">Qualité Premium</h3>
                  <p className="text-muted-foreground">
                    Impression haute résolution qui maintient la précision des couleurs et la
                    durabilité
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-xl font-bold">Solutions Sur Mesure</h3>
                  <p className="text-muted-foreground">
                    Services d'impression adaptés à vos exigences spécifiques
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-xl font-bold">Délais Rapides</h3>
                  <p className="text-muted-foreground">
                    Processus de production efficace pour respecter vos échéances
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="text-primary mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-xl font-bold">Prix Compétitifs</h3>
                  <p className="text-muted-foreground">
                    Solutions économiques sans compromis sur la qualité
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Processus */}
        <section id="process" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Notre Processus
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un processus simple et efficace de la conception à la livraison
                </p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-background flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="bg-primary/10 rounded-full p-4">
                  <Palette className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">1. Conception</h3>
                <p className="text-muted-foreground text-center">
                  Travaillez avec notre équipe de design ou fournissez vos propres créations pour
                  l'impression
                </p>
              </div>
              <div className="bg-background flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="bg-primary/10 rounded-full p-4">
                  <Printer className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">2. Production</h3>
                <p className="text-muted-foreground text-center">
                  Impression haute qualité sur vos produits cylindriques avec une technologie
                  avancée
                </p>
              </div>
              <div className="bg-background flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="bg-primary/10 rounded-full p-4">
                  <Truck className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">3. Livraison</h3>
                <p className="text-muted-foreground text-center">
                  Emballage sécurisé et livraison ponctuelle à votre entreprise
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Galerie */}
        <section id="gallery" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Nos Réalisations
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez notre portfolio de produits cylindriques personnalisés
                </p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/gall-1.png"
                  alt="Gobelets à café avec impression personnalisée"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/gall-2.png"
                  alt="Pots de miel avec étiquettes personnalisées"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/gall-3.png"
                  alt="Canettes de boisson avec impression personnalisée"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/gall-4.png"
                  alt="Contenants alimentaires avec marquage personnalisé"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/gall-5.png"
                  alt="Contenants cosmétiques avec impression personnalisée"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/gall-6.png"
                  alt="Emballages de détail avec marquage personnalisé"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section Témoignages */}
        <section id="testimonials" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ce que Disent Nos Clients
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez les témoignages d'entreprises qui ont transformé leur image de marque
                  avec nos solutions d'impression
                </p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background flex flex-col space-y-4 rounded-lg border p-6">
                <div className="space-y-2">
                  <p className="italic">
                    "CylindreImpression a transformé l'image de marque de notre coffee shop. La
                    qualité d'impression sur nos gobelets est exceptionnelle, et nos clients adorent
                    les designs uniques."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-muted h-10 w-10 rounded-full"></div>
                  <div>
                    <p className="font-medium">Sarah Dubois</p>
                    <p className="text-muted-foreground text-sm">Café du Havre</p>
                  </div>
                </div>
              </div>
              <div className="bg-background flex flex-col space-y-4 rounded-lg border p-6">
                <div className="space-y-2">
                  <p className="italic">
                    "En tant que producteur de miel, avoir notre marque représentée de manière
                    cohérente sur nos contenants est crucial. CylindreImpression offre une qualité
                    exceptionnelle à chaque fois."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-muted h-10 w-10 rounded-full"></div>
                  <div>
                    <p className="font-medium">Michel Leroy</p>
                    <p className="text-muted-foreground text-sm">Miel Doré des Alpes</p>
                  </div>
                </div>
              </div>
              <div className="bg-background flex flex-col space-y-4 rounded-lg border p-6">
                <div className="space-y-2">
                  <p className="italic">
                    "L'équipe de CylindreImpression a parfaitement compris notre vision. Leur
                    attention aux détails et leurs délais rapides ont dépassé nos attentes."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-muted h-10 w-10 rounded-full"></div>
                  <div>
                    <p className="font-medium">Émilie Martin</p>
                    <p className="text-muted-foreground text-sm">Cosmétiques Purs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Contactez-Nous
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Prêt à transformer vos produits cylindriques ? Contactez-nous pour un devis
                    gratuit ou pour discuter de votre projet.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="text-primary h-5 w-5" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2">
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
                </div>
              </div>
              <div className="bg-muted space-y-4 rounded-lg p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Demander un Devis</h3>
                  <p className="text-muted-foreground">
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.
                  </p>
                </div>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="company"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Nom de l'Entreprise
                      </label>
                      <Input id="company" placeholder="Nom de votre entreprise" />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input id="email" placeholder="Votre adresse email" type="email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Téléphone
                    </label>
                    <Input id="phone" placeholder="Votre numéro de téléphone" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="product"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Type de Produit
                    </label>
                    <Input id="product" placeholder="Gobelets à café, pots de miel, etc." />
                  </div>
                  <div className="space-y-2">
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
                  </div>
                  <Button type="submit" className="w-full">
                    Envoyer la Demande
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            <span className="text-lg font-bold">CylindreImpression</span>
          </div>
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
