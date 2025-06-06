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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle,
  Clock,
  Download,
  Edit,
  Eye,
  Filter,
  Package,
  Search,
  Truck,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

// Mock data for admin orders
const mockAdminOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    customer: 'Ahmed Ben Ali',
    company: 'TechCorp SARL',
    email: 'ahmed@techcorp.tn',
    phone: '+216 98 123 456',
    product: 'Mug Café Classique',
    quantity: 50,
    total: '1,500 TND',
    status: 'completed',
    priority: 'normal',
    logo: 'logo-company-a.png',
    notes: 'Logo en bleu marine, impression recto-verso',
    estimatedDelivery: '2024-01-20',
    trackingNumber: 'TN123456789',
    assignedTo: 'Moderator 1',
  },
  {
    id: 'ORD-002',
    date: '2024-01-18',
    customer: 'Fatma Trabelsi',
    company: 'Design Studio',
    email: 'fatma@designstudio.tn',
    phone: '+216 97 234 567',
    product: 'Mug de Voyage',
    quantity: 25,
    total: '1,125 TND',
    status: 'in_production',
    priority: 'high',
    logo: 'logo-company-b.png',
    notes: 'Couleur rouge, logo centré, livraison urgente',
    estimatedDelivery: '2024-01-25',
    trackingNumber: 'TN123456790',
    assignedTo: 'Moderator 2',
  },
  {
    id: 'ORD-003',
    date: '2024-01-20',
    customer: 'Mohamed Sassi',
    company: 'Café Central',
    email: 'mohamed@cafecentral.tn',
    phone: '+216 96 345 678',
    product: 'Tasse Espresso',
    quantity: 100,
    total: '2,000 TND',
    status: 'pending',
    priority: 'normal',
    logo: 'logo-company-c.png',
    notes: 'Logo doré, emballage premium',
    estimatedDelivery: '2024-01-30',
    trackingNumber: '',
    assignedTo: '',
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

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">Haute</Badge>;
    case 'normal':
      return <Badge variant="secondary">Normale</Badge>;
    case 'low':
      return <Badge variant="outline">Basse</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

export function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [orders, setOrders] = useState(mockAdminOrders);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    );
  };

  const assignOrder = (orderId: string, moderator: string) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, assignedTo: moderator } : order)),
    );
  };

  const getOrderStats = () => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === 'pending').length;
    const inProduction = orders.filter((o) => o.status === 'in_production').length;
    const shipped = orders.filter((o) => o.status === 'shipped').length;
    const completed = orders.filter((o) => o.status === 'completed').length;

    return { total, pending, inProduction, shipped, completed };
  };

  const stats = getOrderStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Commandes</h1>
          <p className="text-muted-foreground">Gérez et suivez toutes les commandes clients</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-1 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-muted-foreground text-xs">Total Commandes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-muted-foreground text-xs">En Attente</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.inProduction}</div>
            <p className="text-muted-foreground text-xs">En Production</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.shipped}</div>
            <p className="text-muted-foreground text-xs">Expédiées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-muted-foreground text-xs">Livrées</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
              <Input
                placeholder="Rechercher par N° commande, client ou entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En Attente</SelectItem>
                <SelectItem value="in_production">En Production</SelectItem>
                <SelectItem value="shipped">Expédiées</SelectItem>
                <SelectItem value="completed">Livrées</SelectItem>
                <SelectItem value="cancelled">Annulées</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Commandes</CardTitle>
          <CardDescription>Gérez le statut et les détails de chaque commande</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Assigné à</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.company}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className="font-semibold">{order.total}</TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    {order.assignedTo ? (
                      <Badge variant="outline">{order.assignedTo}</Badge>
                    ) : (
                      <span className="text-muted-foreground">Non assigné</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Détails de la Commande {order.id}</DialogTitle>
                            <DialogDescription>
                              Informations complètes et gestion de la commande
                            </DialogDescription>
                          </DialogHeader>
                          {selectedOrder && (
                            <Tabs defaultValue="details" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="details">Détails</TabsTrigger>
                                <TabsTrigger value="status">Statut</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                              </TabsList>

                              <TabsContent value="details" className="space-y-4">
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="mb-3 font-semibold">Informations Client</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Nom:</span>
                                        <span className="font-medium">
                                          {selectedOrder.customer}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Entreprise:</span>
                                        <span>{selectedOrder.company}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Email:</span>
                                        <span>{selectedOrder.email}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Téléphone:</span>
                                        <span>{selectedOrder.phone}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="mb-3 font-semibold">Détails Commande</h4>
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
                                        <span className="text-muted-foreground">Produit:</span>
                                        <span>{selectedOrder.product}</span>
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
                              </TabsContent>

                              <TabsContent value="status" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="status">Statut de la Commande</Label>
                                    <Select
                                      value={selectedOrder.status}
                                      onValueChange={(value) =>
                                        updateOrderStatus(selectedOrder.id, value)
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">En Attente</SelectItem>
                                        <SelectItem value="in_production">En Production</SelectItem>
                                        <SelectItem value="shipped">Expédiée</SelectItem>
                                        <SelectItem value="completed">Livrée</SelectItem>
                                        <SelectItem value="cancelled">Annulée</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="assignee">Assigner à</Label>
                                    <Select
                                      value={selectedOrder.assignedTo || ''}
                                      onValueChange={(value) =>
                                        assignOrder(selectedOrder.id, value)
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un modérateur" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Moderator 1">Modérateur 1</SelectItem>
                                        <SelectItem value="Moderator 2">Modérateur 2</SelectItem>
                                        <SelectItem value="Moderator 3">Modérateur 3</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="tracking">Numéro de Suivi</Label>
                                  <Input
                                    id="tracking"
                                    placeholder="Entrer le numéro de suivi"
                                    defaultValue={selectedOrder.trackingNumber || ''}
                                  />
                                </div>
                              </TabsContent>

                              <TabsContent value="notes" className="space-y-4">
                                <div>
                                  <Label htmlFor="customer-notes">Notes Client</Label>
                                  <Textarea
                                    id="customer-notes"
                                    value={selectedOrder.notes}
                                    readOnly
                                    className="min-h-[100px]"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="admin-notes">Notes Administrateur</Label>
                                  <Textarea
                                    id="admin-notes"
                                    placeholder="Ajouter des notes internes..."
                                    className="min-h-[100px]"
                                  />
                                </div>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
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
