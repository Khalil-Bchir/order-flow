'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Coffee,
  LogIn,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Upload,
  User,
  UserPlus,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

const cupTypes = [
  {
    id: 1,
    name: 'Mug Café Classique',
    image: '/mockup-1.png',
    description: 'Mug en céramique classique pour café',
    price: '30 TND', // Changed from Euro to TND
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Mug de Voyage',
    image: '/mockup-2.png',
    description: 'Mug isotherme avec couvercle',
    price: '45 TND', // Changed from Euro to TND
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Tasse Espresso',
    image: '/mockup-3.png',
    description: 'Petite tasse en céramique pour espresso',
    price: '20 TND', // Changed from Euro to TND
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Mug en Verre',
    image: '/mockup-4.png',
    description: 'Mug transparent en verre résistant',
    price: '38 TND', // Changed from Euro to TND
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Gobelet Thermique',
    image: '/mockup-5.png',
    description: 'Gobelet à double paroi thermique',
    price: '55 TND', // Changed from Euro to TND
    rating: 4.9,
  },
];

export default function CupOrderPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCup, setSelectedCup] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('auth');
  const [authSuccess, setAuthSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cupTypes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cupTypes.length) % cupTypes.length);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsAuthenticated(true);
    setAuthSuccess(true);
    setIsLoading(false);

    // Auto-switch to order tab after successful auth
    setTimeout(() => {
      setActiveTab('order');
    }, 1000);
  };

  const handleOrderSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedCup || !logoFile) {
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    alert(
      `Commande soumise ! ${quantity} ${cupTypes.find((c) => c.id === selectedCup)?.name}(s) avec logo personnalisé`,
    );
  };

  const selectedCupData = selectedCup ? cupTypes.find((c) => c.id === selectedCup) : null;
  const totalPrice = selectedCupData
    ? Number.parseFloat(selectedCupData.price.replace(' TND', '')) * quantity
    : 0;

  return (
    <div className="from-background via-secondary/20 to-accent/30 min-h-screen bg-gradient-to-br p-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary/10 rounded-full p-4">
              <Coffee className="text-primary h-12 w-12" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Passer Votre Commande</h1>
          <p className="text-muted-foreground text-xl">Créez vos mugs parfaits avec votre logo</p>

          {/* Progress indicator */}
          <div className="mx-auto mt-6 max-w-md">
            <div className="text-muted-foreground mb-2 flex items-center justify-between text-sm">
              <span>Authentification</span>
              <span>Commande</span>
            </div>
            <Progress value={isAuthenticated ? 100 : 50} className="h-2" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger value="auth" className="flex items-center gap-2 py-3 text-base">
              <User className="h-4 w-4" />
              Authentification
              {isAuthenticated && <CheckCircle className="h-4 w-4 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger
              value="order"
              disabled={!isAuthenticated}
              className="flex items-center gap-2 py-3 text-base"
            >
              <ShoppingCart className="h-4 w-4" />
              Passer Commande
            </TabsTrigger>
          </TabsList>

          <TabsContent value="auth" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Auth Form */}
              <Card className="shadow-lg">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant={authMode === 'login' ? 'default' : 'outline'}
                      onClick={() => setAuthMode('login')}
                      className="flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      Se Connecter
                    </Button>
                    <Button
                      variant={authMode === 'register' ? 'default' : 'outline'}
                      onClick={() => setAuthMode('register')}
                      className="flex items-center gap-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      S'inscrire
                    </Button>
                  </div>
                  <Separator />
                  <div>
                    <CardTitle className="text-2xl">
                      {authMode === 'login'
                        ? 'Connexion à votre compte'
                        : 'Créer un nouveau compte'}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {authMode === 'login'
                        ? 'Connectez-vous pour accéder à vos commandes'
                        : 'Créez un compte pour commencer à commander'}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {authSuccess && (
                    <Alert className="mb-6 border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        {authMode === 'login' ? 'Connexion réussie !' : 'Compte créé avec succès !'}
                        Redirection vers la commande...
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleAuth} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-base">
                          Mot de passe *
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    {authMode === 'register' && (
                      <>
                        <Separator />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-base">
                              Prénom *
                            </Label>
                            <Input id="firstName" placeholder="Ahmed" required className="h-12" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-base">
                              Nom *
                            </Label>
                            <Input id="lastName" placeholder="Ben Ali" required className="h-12" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-base">
                            Entreprise *
                          </Label>
                          <Input
                            id="company"
                            placeholder="Nom de votre entreprise"
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base">
                            Téléphone *
                          </Label>
                          <Input
                            id="phone"
                            placeholder="+216 XX XXX XXX"
                            required
                            className="h-12"
                          />
                        </div>
                      </>
                    )}

                    <Button type="submit" className="h-12 w-full text-base" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {authMode === 'login' ? 'Connexion...' : 'Création du compte...'}
                        </div>
                      ) : authMode === 'login' ? (
                        'Se Connecter'
                      ) : (
                        'Créer le Compte'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Benefits */}
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="text-primary h-5 w-5" />
                      Pourquoi nous choisir ?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Star className="mt-0.5 h-5 w-5 text-yellow-500" />
                      <div>
                        <h4 className="font-semibold">Qualité Premium</h4>
                        <p className="text-muted-foreground text-sm">
                          Matériaux de haute qualité et impression durable
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="text-primary mt-0.5 h-5 w-5" />
                      <div>
                        <h4 className="font-semibold">Livraison Rapide</h4>
                        <p className="text-muted-foreground text-sm">
                          Expédition sous 48h, livraison en Tunisie
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-semibold">Satisfaction Garantie</h4>
                        <p className="text-muted-foreground text-sm">
                          Remboursement si vous n'êtes pas satisfait
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="order" className="mt-0">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cup Selection */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Coffee className="h-6 w-6" />
                      Choisissez votre Style de Mug
                    </CardTitle>
                    <CardDescription className="text-base">
                      Sélectionnez parmi notre collection de mugs personnalisables
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="overflow-hidden rounded-xl">
                        <div
                          className="flex transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                          {cupTypes.map((cup) => (
                            <div key={cup.id} className="w-full flex-shrink-0 p-4">
                              <div
                                className={`cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
                                  selectedCup === cup.id
                                    ? 'border-primary bg-primary/5 shadow-lg'
                                    : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => setSelectedCup(cup.id)}
                              >
                                <img
                                  src={cup.image || '/placeholder.svg'}
                                  alt={cup.name}
                                  className="mx-auto h-48 w-48 rounded-lg object-cover"
                                />
                                <div className="mt-6 space-y-2 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < Math.floor(cup.rating)
                                            ? 'fill-current text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                    <span className="text-muted-foreground ml-1 text-sm">
                                      ({cup.rating})
                                    </span>
                                  </div>
                                  <h3 className="text-xl font-semibold">{cup.name}</h3>
                                  <p className="text-muted-foreground">{cup.description}</p>
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="text-primary text-2xl font-bold">
                                      {cup.price}
                                    </span>
                                    {selectedCup === cup.id && (
                                      <Badge variant="default" className="ml-2">
                                        Sélectionné
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Carousel Controls */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 shadow-lg"
                        onClick={prevSlide}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 shadow-lg"
                        onClick={nextSlide}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="mt-6 flex justify-center space-x-2">
                      {cupTypes.map((_, index) => (
                        <button
                          key={index}
                          className={`h-3 w-3 rounded-full transition-colors ${
                            index === currentSlide ? 'bg-primary' : 'bg-muted'
                          }`}
                          onClick={() => setCurrentSlide(index)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Form */}
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Détails de la Commande</CardTitle>
                    <CardDescription>
                      Spécifiez la quantité et téléchargez votre logo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleOrderSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="quantity" className="text-base">
                          Nombre de Mugs
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          max="1000"
                          value={quantity}
                          onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                          required
                          className="h-12 text-center text-lg font-semibold"
                        />
                        <p className="text-muted-foreground text-sm">
                          Minimum : 1 mug, Maximum : 1000 mugs
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <Label htmlFor="logo" className="text-base">
                          Télécharger votre Logo
                        </Label>
                        <div className="flex w-full items-center justify-center">
                          <label
                            htmlFor="logo"
                            className="border-border bg-muted/30 hover:bg-muted/50 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              <Upload className="text-muted-foreground mb-3 h-10 w-10" />
                              <p className="text-muted-foreground mb-2 text-sm">
                                <span className="font-semibold">Cliquez pour télécharger</span> ou
                                glissez-déposez
                              </p>
                              <p className="text-muted-foreground text-xs">
                                PNG, JPG, SVG (MAX. 10MB)
                              </p>
                            </div>
                            <input
                              id="logo"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileUpload}
                              required
                            />
                          </label>
                        </div>
                        {logoFile && (
                          <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                              ✓ {logoFile.name} téléchargé avec succès
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="notes" className="text-base">
                          Instructions Spéciales (Optionnel)
                        </Label>
                        <textarea
                          id="notes"
                          className="border-input focus:ring-ring min-h-[80px] w-full resize-none rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
                          placeholder="Toute exigence particulière ou note pour votre commande..."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="h-12 w-full text-base"
                        disabled={isLoading || !selectedCup || !logoFile}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Traitement...
                          </div>
                        ) : (
                          'Soumettre la Commande'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Résumé de la Commande</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Type de Mug :</span>
                        <span className="font-medium">
                          {selectedCup
                            ? cupTypes.find((c) => c.id === selectedCup)?.name
                            : 'Non sélectionné'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Quantité :</span>
                        <span className="font-medium">{quantity} mugs</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Logo :</span>
                        <span className="font-medium">
                          {logoFile ? logoFile.name.substring(0, 20) + '...' : 'Non téléchargé'}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Total :</span>
                        <span className="text-primary">{totalPrice.toFixed(2)} TND</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
