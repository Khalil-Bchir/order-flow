'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, Clock, Eye, Package, Search, Truck, XCircle } from 'lucide-react';
import { useState } from 'react';

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    product: 'Mug Café Classique',
    quantity: 50,
    total: '1,500 TND',
    status: 'completed',
    logo: 'logo-company-a.png',
    notes: 'Logo en bleu marine, impression recto-verso',
    estimatedDelivery: '2024-01-20',
    trackingNumber: 'TN123456789',
  },
  {
    id: 'ORD-002',
    date: '2024-01-18',
    product: 'Mug de Voyage',
    quantity: 25,
    total: '1,125 TND',
    status: 'in_production',
    logo: 'logo-company-b.png',
    notes: 'Couleur rouge, logo centré',
    estimatedDelivery: '2024-01-25',
    trackingNumber: 'TN123456790',
  },
  {
    id: 'ORD-003',
    date: '2024-01-20',
    product: 'Tasse Espresso',
    quantity: 100,
    total: '2,000 TND',
    status: 'pending',
    logo: 'logo-company-c.png',
    notes: 'Logo doré, emballage premium',
    estimatedDelivery: '2024-01-30',
    trackingNumber: null,
  },
  {
    id: 'ORD-004',
    date: '2024-01-22',
    product: 'Gobelet Thermique',
    quantity: 30,
    total: '1,650 TND',
    status: 'shipped',
    logo: 'logo-company-d.png',
    notes: 'Livraison express demandée',
    estimatedDelivery: '2024-01-24',
    trackingNumber: 'TN123456791',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          En Attente
        </Badge>
      );
    case 'in_production':
      return (
        <Badge className="flex items-center gap-1 bg-blue-500">
          <Package className="h-3 w-3" />
          En Production
        </Badge>
      );
    case 'shipped':
      return (
        <Badge className="flex items-center gap-1 bg-orange-500">
          <Truck className="h-3 w-3" />
          Expédiée
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-green-500">
          <CheckCircle className="h-3 w-3" />
          Livrée
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Annulée
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function MyOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes Commandes</h1>
          <p className="text-muted-foreground">
            Suivez l'état de vos commandes et consultez l'historique
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
            <Input
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px] pl-8"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des Commandes</CardTitle>
          <CardDescription>
            Consultez toutes vos commandes passées et leur statut actuel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Commande</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className="font-semibold">{order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="mr-1 h-4 w-4" />
                          Détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails de la Commande {order.id}</DialogTitle>
                          <DialogDescription>
                            Informations complètes sur votre commande
                          </DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="mb-2 font-semibold">Informations Générales</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">N° Commande:</span>
                                    <span className="font-medium">{selectedOrder.id}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Date:</span>
                                    <span>
                                      {new Date(selectedOrder.date).toLocaleDateString('fr-FR')}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Statut:</span>
                                    {getStatusBadge(selectedOrder.status)}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="mb-2 font-semibold">Détails Produit</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Produit:</span>
                                    <span className="font-medium">{selectedOrder.product}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Quantité:</span>
                                    <span>{selectedOrder.quantity}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total:</span>
                                    <span className="text-primary font-semibold">
                                      {selectedOrder.total}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-2 font-semibold">Instructions Spéciales</h4>
                              <p className="text-muted-foreground bg-muted rounded-md p-3 text-sm">
                                {selectedOrder.notes}
                              </p>
                            </div>

                            <div>
                              <h4 className="mb-2 font-semibold">Livraison</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Livraison estimée:</span>
                                  <span>
                                    {new Date(selectedOrder.estimatedDelivery).toLocaleDateString(
                                      'fr-FR',
                                    )}
                                  </span>
                                </div>
                                {selectedOrder.trackingNumber && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">N° de suivi:</span>
                                    <span className="font-mono">
                                      {selectedOrder.trackingNumber}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                              {selectedOrder.trackingNumber && (
                                <Button variant="outline">
                                  <Truck className="mr-1 h-4 w-4" />
                                  Suivre la Livraison
                                </Button>
                              )}
                              <Button>Télécharger Facture</Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
