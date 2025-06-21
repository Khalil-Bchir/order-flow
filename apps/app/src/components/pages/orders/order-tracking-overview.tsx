'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Calendar, CheckCircle, Coffee, Eye, Hash, Package, Search, Truck } from 'lucide-react';
import { useState } from 'react';

// Mock data for orders
const mockOrders = [
  {
    id: 'CMD-2024-001',
    date: '2024-01-15',
    cupType: 'Mug Café Classique',
    cupImage: '/mockup-1.png',
    quantity: 50,
    totalPrice: 1500,
    status: 'delivered',
    statusText: 'Livré',
    progress: 100,
    logoFileName: 'logo-entreprise.png',
    specialInstructions: 'Logo sur les deux côtés',
    estimatedDelivery: '2024-01-20',
    actualDelivery: '2024-01-19',
    trackingNumber: 'TN123456789',
  },
  {
    id: 'CMD-2024-002',
    date: '2024-01-20',
    cupType: 'Mug de Voyage',
    cupImage: '/mockup-2.png',
    quantity: 25,
    totalPrice: 1125,
    status: 'in-production',
    statusText: 'En Production',
    progress: 60,
    logoFileName: 'logo-startup.svg',
    specialInstructions: 'Couleur rouge pour le logo',
    estimatedDelivery: '2024-01-28',
    actualDelivery: null,
    trackingNumber: null,
  },
  {
    id: 'CMD-2024-003',
    date: '2024-01-22',
    cupType: 'Tasse Espresso',
    cupImage: '/mockup-3.png',
    quantity: 100,
    totalPrice: 2000,
    status: 'confirmed',
    statusText: 'Confirmé',
    progress: 25,
    logoFileName: 'logo-cafe.jpg',
    specialInstructions: 'Emballage individuel requis',
    estimatedDelivery: '2024-02-01',
    actualDelivery: null,
    trackingNumber: null,
  },
  {
    id: 'CMD-2024-004',
    date: '2024-01-25',
    cupType: 'Gobelet Thermique',
    cupImage: '/mockup-5.png',
    quantity: 75,
    totalPrice: 4125,
    status: 'shipped',
    statusText: 'Expédié',
    progress: 85,
    logoFileName: 'logo-restaurant.png',
    specialInstructions: 'Livraison express',
    estimatedDelivery: '2024-01-30',
    actualDelivery: null,
    trackingNumber: 'TN987654321',
  },
];

const statusConfig = {
  confirmed: { color: 'bg-blue-500', icon: CheckCircle, textColor: 'text-blue-600' },
  'in-production': { color: 'bg-orange-500', icon: Package, textColor: 'text-orange-600' },
  shipped: { color: 'bg-purple-500', icon: Truck, textColor: 'text-purple-600' },
  delivered: { color: 'bg-green-500', icon: CheckCircle, textColor: 'text-green-600' },
};

export default function OrderTrackingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.cupType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedOrderData = selectedOrder
    ? mockOrders.find((order) => order.id === selectedOrder)
    : null;

  const getStatusSteps = (status: string) => {
    const steps = [
      { key: 'confirmed', label: 'Confirmé', completed: true },
      { key: 'in-production', label: 'En Production', completed: status !== 'confirmed' },
      {
        key: 'shipped',
        label: 'Expédié',
        completed: status === 'shipped' || status === 'delivered',
      },
      { key: 'delivered', label: 'Livré', completed: status === 'delivered' },
    ];
    return steps;
  };

  return (
    <div className="from-background via-secondary/20 to-accent/30 min-h-screen bg-gradient-to-br p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary/10 rounded-full p-4">
              <Package className="text-primary h-12 w-12" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Suivi de Commandes</h1>
          <p className="text-muted-foreground text-xl">
            Suivez l'état de vos commandes de mugs personnalisés
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Coffee className="h-6 w-6" />
                  Mes Commandes
                </CardTitle>
                <CardDescription className="text-base">
                  Consultez toutes vos commandes et leur statut
                </CardDescription>

                {/* Search Bar */}
                <div className="mt-4 space-y-2">
                  <Label htmlFor="search" className="text-sm font-medium">
                    Rechercher une commande
                  </Label>
                  <div className="relative">
                    <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="search"
                      placeholder="Numéro de commande ou type de mug..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                    return (
                      <div
                        key={order.id}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                          selectedOrder === order.id
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={order.cupImage || '/placeholder.svg'}
                            alt={order.cupType}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">{order.id}</h3>
                              <Badge
                                variant="secondary"
                                className={`${statusConfig[order.status as keyof typeof statusConfig].textColor} font-medium`}
                              >
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {order.statusText}
                              </Badge>
                            </div>
                            <div className="text-muted-foreground grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(order.date).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Coffee className="h-3 w-3" />
                                {order.cupType}
                              </div>
                              <div className="flex items-center gap-1">
                                <Hash className="h-3 w-3" />
                                {order.quantity} mugs
                              </div>
                              <div className="text-primary flex items-center gap-1 font-medium">
                                {order.totalPrice} TND
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span>Progression</span>
                                <span>{order.progress}%</span>
                              </div>
                              <Progress value={order.progress} className="h-2" />
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Détails
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  {filteredOrders.length === 0 && (
                    <div className="py-12 text-center">
                      <Package className="text-muted-foreground/50 mx-auto h-12 w-12" />
                      <h3 className="mt-4 text-lg font-medium">Aucune commande trouvée</h3>
                      <p className="text-muted-foreground">
                        {searchTerm
                          ? 'Essayez un autre terme de recherche'
                          : "Vous n'avez pas encore de commandes"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            {selectedOrderData ? (
              <>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Détails de la Commande</CardTitle>
                    <CardDescription>{selectedOrderData.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedOrderData.cupImage || '/placeholder.svg'}
                        alt={selectedOrderData.cupType}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="space-y-1">
                        <h3 className="font-semibold">{selectedOrderData.cupType}</h3>
                        <p className="text-muted-foreground text-sm">
                          Quantité: {selectedOrderData.quantity} mugs
                        </p>
                        <p className="text-primary font-medium">
                          {selectedOrderData.totalPrice} TND
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Date de commande:</span>
                        <span className="font-medium">
                          {new Date(selectedOrderData.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Logo:</span>
                        <span className="font-medium">{selectedOrderData.logoFileName}</span>
                      </div>
                      {selectedOrderData.specialInstructions && (
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Instructions spéciales:</span>
                          <p className="bg-muted/50 rounded p-2 text-sm">
                            {selectedOrderData.specialInstructions}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Livraison estimée:</span>
                        <span className="font-medium">
                          {new Date(selectedOrderData.estimatedDelivery).toLocaleDateString(
                            'fr-FR',
                          )}
                        </span>
                      </div>
                      {selectedOrderData.trackingNumber && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Numéro de suivi:</span>
                          <span className="font-mono text-xs font-medium">
                            {selectedOrderData.trackingNumber}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Statut de la Commande</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getStatusSteps(selectedOrderData.status).map((step, index) => {
                        const isActive = step.key === selectedOrderData.status;
                        const StepIcon = statusConfig[step.key as keyof typeof statusConfig].icon;

                        return (
                          <div key={step.key} className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                step.completed
                                  ? statusConfig[step.key as keyof typeof statusConfig].color
                                  : 'bg-muted'
                              }`}
                            >
                              <StepIcon
                                className={`h-4 w-4 ${step.completed ? 'text-white' : 'text-muted-foreground'}`}
                              />
                            </div>
                            <div className="flex-1">
                              <p
                                className={`font-medium ${
                                  isActive
                                    ? 'text-primary'
                                    : step.completed
                                      ? 'text-foreground'
                                      : 'text-muted-foreground'
                                }`}
                              >
                                {step.label}
                                {isActive && (
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    En cours
                                  </Badge>
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progression globale</span>
                        <span className="font-medium">{selectedOrderData.progress}%</span>
                      </div>
                      <Progress value={selectedOrderData.progress} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="py-12 text-center">
                  <Eye className="text-muted-foreground/50 mx-auto h-12 w-12" />
                  <h3 className="mt-4 text-lg font-medium">Sélectionnez une commande</h3>
                  <p className="text-muted-foreground">
                    Cliquez sur une commande pour voir ses détails
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
