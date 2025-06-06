'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, MapPin, Package, Search, Truck } from 'lucide-react';
import { useState } from 'react';

const trackingSteps = [
  {
    id: 1,
    title: 'Commande Reçue',
    description: 'Votre commande a été reçue et confirmée',
    icon: CheckCircle,
    completed: true,
  },
  {
    id: 2,
    title: 'En Production',
    description: 'Votre commande est en cours de production',
    icon: Package,
    completed: true,
  },
  {
    id: 3,
    title: 'Contrôle Qualité',
    description: 'Vérification de la qualité des produits',
    icon: CheckCircle,
    completed: true,
  },
  {
    id: 4,
    title: 'Expédition',
    description: 'Votre commande a été expédiée',
    icon: Truck,
    completed: false,
    current: true,
  },
  {
    id: 5,
    title: 'Livraison',
    description: 'Livraison à votre adresse',
    icon: MapPin,
    completed: false,
  },
];

const mockTrackingData = {
  'ORD-001': {
    orderId: 'ORD-001',
    trackingNumber: 'TN123456789',
    status: 'shipped',
    progress: 80,
    currentStep: 4,
    estimatedDelivery: '2024-01-24',
    carrier: 'Aramex Tunisie',
    lastUpdate: '2024-01-23 14:30',
    location: 'Centre de tri Tunis',
    events: [
      {
        date: '2024-01-23 14:30',
        location: 'Centre de tri Tunis',
        description: 'Colis en transit vers la destination',
      },
      { date: '2024-01-23 09:15', location: 'Dépôt Sfax', description: 'Colis expédié du dépôt' },
      {
        date: '2024-01-22 16:45',
        location: 'Atelier Production',
        description: 'Colis préparé pour expédition',
      },
      {
        date: '2024-01-20 10:00',
        location: 'Atelier Production',
        description: 'Production terminée',
      },
      { date: '2024-01-15 08:30', location: 'Système', description: 'Commande confirmée' },
    ],
  },
};

export function OrderTrackingPage() {
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async () => {
    if (!trackingInput.trim()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = mockTrackingData[trackingInput as keyof typeof mockTrackingData];
    setTrackingData(data || null);
    setIsLoading(false);
  };

  const getStepStatus = (step: any, currentStep: number) => {
    if (step.completed) return 'completed';
    if (step.id === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Suivi de Commande</h1>
        <p className="text-muted-foreground">Suivez l'état de votre commande en temps réel</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rechercher une Commande</CardTitle>
          <CardDescription>Entrez votre numéro de commande ou numéro de suivi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
              <Input
                placeholder="Ex: ORD-001 ou TN123456789"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="pl-8"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
              />
            </div>
            <Button onClick={handleTrackOrder} disabled={isLoading}>
              {isLoading ? 'Recherche...' : 'Suivre'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {trackingData && (
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Commande {trackingData.orderId}</span>
                <Badge className="bg-blue-500">
                  <Truck className="mr-1 h-3 w-3" />
                  En Transit
                </Badge>
              </CardTitle>
              <CardDescription>Numéro de suivi: {trackingData.trackingNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <p className="text-muted-foreground text-sm">Transporteur</p>
                  <p className="font-semibold">{trackingData.carrier}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Livraison Estimée</p>
                  <p className="font-semibold">
                    {new Date(trackingData.estimatedDelivery).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Dernière Mise à Jour</p>
                  <p className="font-semibold">{trackingData.lastUpdate}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Progression</span>
                  <span>{trackingData.progress}%</span>
                </div>
                <Progress value={trackingData.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Tracking Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Étapes de Livraison</CardTitle>
              <CardDescription>
                Suivez le parcours de votre commande étape par étape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingSteps.map((step, index) => {
                  const status = getStepStatus(step, trackingData.currentStep);
                  const StepIcon = step.icon;

                  return (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                          status === 'completed'
                            ? 'bg-green-500 text-white'
                            : status === 'current'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {status === 'completed' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : status === 'current' ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <StepIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold ${
                            status === 'current'
                              ? 'text-blue-600'
                              : status === 'completed'
                                ? 'text-green-600'
                                : 'text-gray-500'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                        {status === 'current' && (
                          <p className="mt-1 text-sm text-blue-600">
                            Localisation actuelle: {trackingData.location}
                          </p>
                        )}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`absolute left-5 mt-10 h-8 w-0.5 ${
                            status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                          style={{ marginLeft: '1.25rem' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Tracking History */}
          <Card>
            <CardHeader>
              <CardTitle>Historique de Suivi</CardTitle>
              <CardDescription>Historique détaillé des mouvements de votre colis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingData.events.map((event: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 border-b pb-4 last:border-b-0"
                  >
                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{event.description}</p>
                          <p className="text-muted-foreground text-sm">{event.location}</p>
                        </div>
                        <p className="text-muted-foreground text-sm">{event.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {trackingInput && !trackingData && !isLoading && (
        <Card>
          <CardContent className="py-8 text-center">
            <Package className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">Commande Non Trouvée</h3>
            <p className="text-muted-foreground">
              Aucune commande trouvée avec ce numéro. Vérifiez votre numéro de commande ou de suivi.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
