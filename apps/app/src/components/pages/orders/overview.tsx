'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { useToast } from '@/hooks/use-toast';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Edit,
  Eye,
  Filter,
  Package,
  Search,
  Trash2,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmationDialog, OrderEditModal, OrderViewModal } from './modules';

// Extended mock data for orders
const allOrders = [
  {
    id: 'ORD-001',
    customer: 'Café du Havre',
    email: 'contact@cafeduhavre.fr',
    product: 'Gobelets à café personnalisés',
    quantity: 1000,
    amount: 450.0,
    status: 'completed',
    priority: 'normal',
    date: '2024-01-15',
    dueDate: '2024-01-20',
    notes: 'Logo en bleu marine, finition mate',
  },
  {
    id: 'ORD-002',
    customer: 'Miel Doré des Alpes',
    email: 'info@mieldore.fr',
    product: 'Pots de miel étiquetés',
    quantity: 500,
    amount: 275.0,
    status: 'processing',
    priority: 'high',
    date: '2024-01-14',
    dueDate: '2024-01-18',
    notes: 'Étiquettes dorées avec relief',
  },
  {
    id: 'ORD-003',
    customer: 'Cosmétiques Purs',
    email: 'hello@cosmetiquespurs.com',
    product: 'Contenants cosmétiques',
    quantity: 750,
    amount: 680.0,
    status: 'pending',
    priority: 'normal',
    date: '2024-01-13',
    dueDate: '2024-01-25',
    notes: 'Impression UV résistante',
  },
  {
    id: 'ORD-004',
    customer: 'Brasserie Locale',
    email: 'commandes@brasserielocale.fr',
    product: 'Canettes personnalisées',
    quantity: 2000,
    amount: 890.0,
    status: 'completed',
    priority: 'normal',
    date: '2024-01-12',
    dueDate: '2024-01-17',
    notes: 'Design rétro, couleurs vives',
  },
  {
    id: 'ORD-005',
    customer: 'Restaurant Le Gourmet',
    email: 'resto@legourmet.fr',
    product: 'Gobelets réutilisables',
    quantity: 300,
    amount: 180.0,
    status: 'processing',
    priority: 'low',
    date: '2024-01-11',
    dueDate: '2024-01-22',
    notes: 'Matériau écologique requis',
  },
  {
    id: 'ORD-006',
    customer: 'Pâtisserie Délice',
    email: 'contact@patisseriedelice.fr',
    product: 'Boîtes à gâteaux personnalisées',
    quantity: 200,
    amount: 320.0,
    status: 'cancelled',
    priority: 'normal',
    date: '2024-01-10',
    dueDate: '2024-01-16',
    notes: 'Annulé par le client',
  },
  {
    id: 'ORD-007',
    customer: 'Pharmacie Central',
    email: 'info@pharmaciecentral.fr',
    product: 'Flacons médicaux étiquetés',
    quantity: 1500,
    amount: 750.0,
    status: 'pending',
    priority: 'high',
    date: '2024-01-09',
    dueDate: '2024-01-19',
    notes: 'Conformité pharmaceutique requise',
  },
  {
    id: 'ORD-008',
    customer: 'Épicerie Bio Nature',
    email: 'commande@bionature.fr',
    product: 'Pots de confiture personnalisés',
    quantity: 800,
    amount: 420.0,
    status: 'processing',
    priority: 'normal',
    date: '2024-01-08',
    dueDate: '2024-01-21',
    notes: 'Labels bio certifiés',
  },
];

const statusOptions = [
  { value: 'pending', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'processing', label: 'En cours', color: 'bg-blue-100 text-blue-800' },
  { value: 'completed', label: 'Terminé', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Annulé', color: 'bg-red-100 text-red-800' },
  { value: 'on-hold', label: 'En attente', color: 'bg-orange-100 text-orange-800' },
];

const priorityOptions = [
  { value: 'low', label: 'Faible', color: 'bg-gray-100 text-gray-800' },
  { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
  { value: 'high', label: 'Élevée', color: 'bg-red-100 text-red-800' },
];

const getStatusBadge = (status: string) => {
  const statusConfig = statusOptions.find((s) => s.value === status);
  if (!statusConfig) return <Badge variant="secondary">{status}</Badge>;

  return (
    <Badge className={`${statusConfig.color} hover:${statusConfig.color}`}>
      {statusConfig.label}
    </Badge>
  );
};

const getPriorityBadge = (priority: string) => {
  const priorityConfig = priorityOptions.find((p) => p.value === priority);
  if (!priorityConfig) return <Badge variant="secondary">{priority}</Badge>;

  return (
    <Badge variant="outline" className={`${priorityConfig.color} border-current`}>
      {priorityConfig.label}
    </Badge>
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'processing':
      return <Clock className="h-4 w-4 text-blue-600" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4 text-red-600" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    default:
      return <Package className="h-4 w-4 text-gray-600" />;
  }
};

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  amount: number;
  status: string;
  priority: string;
  date: string;
  dueDate: string;
  notes: string;
}

export default function OrdersOverview() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(allOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
    setViewModalOpen(false); // Close view modal if open
  };

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteOrder = () => {
    if (selectedOrder) {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== selectedOrder.id));
      toast({
        title: 'Commande supprimée',
        description: `La commande ${selectedOrder.id} a été supprimée avec succès.`,
        variant: 'destructive',
      });
    }
    setDeleteDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleSaveOrder = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)),
    );
    setEditModalOpen(false);
    setSelectedOrder(null);
  };

  const exportOrders = () => {
    // In a real app, this would generate and download a CSV/Excel file
    toast({
      title: 'Export en cours',
      description: 'Le fichier des commandes sera téléchargé sous peu.',
    });
  };

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    totalValue: orders.reduce((sum, order) => sum + order.amount, 0),
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Commandes</h1>
          <p className="text-muted-foreground">Gérez et suivez toutes vos commandes d'impression</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportOrders}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button size="sm">
            <Package className="mr-2 h-4 w-4" />
            Nouvelle commande
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-muted-foreground text-xs">commandes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-muted-foreground text-xs">à traiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processing}</div>
            <p className="text-muted-foreground text-xs">en production</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-muted-foreground text-xs">livrées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur totale</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalValue.toFixed(0)}</div>
            <p className="text-muted-foreground text-xs">chiffre d'affaires</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres et recherche</CardTitle>
          <CardDescription>Filtrez et recherchez dans vos commandes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Rechercher par ID, client ou produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes priorités</SelectItem>
                  {priorityOptions.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Plus de filtres
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des commandes</CardTitle>
              <CardDescription>
                {filteredOrders.length} commande{filteredOrders.length !== 1 ? 's' : ''} trouvée
                {filteredOrders.length !== 1 ? 's' : ''}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Date limite</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-muted-foreground text-xs">
                            {new Date(order.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-muted-foreground text-xs">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="truncate font-medium">{order.product}</div>
                      <div className="text-muted-foreground text-xs">Qté: {order.quantity}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="text-muted-foreground h-3 w-3" />
                        <span className="text-sm">
                          {new Date(order.dueDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      €{order.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditOrder(order)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteOrder(order)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <OrderViewModal
        order={selectedOrder}
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedOrder(null);
        }}
        onEdit={handleEditOrder}
      />

      <OrderEditModal
        order={selectedOrder}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedOrder(null);
        }}
        onSave={handleSaveOrder}
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedOrder(null);
        }}
        onConfirm={confirmDeleteOrder}
        orderNumber={selectedOrder?.id || ''}
        customerName={selectedOrder?.customer || ''}
      />
    </div>
  );
}
