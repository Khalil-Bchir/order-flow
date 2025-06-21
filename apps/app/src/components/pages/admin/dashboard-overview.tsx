'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowUpRight,
  Calendar,
  Clock,
  DollarSign,
  Eye,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';

// Mock data for orders
const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Café du Havre',
    product: 'Gobelets à café personnalisés',
    quantity: 1000,
    amount: 450.0,
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: 'ORD-002',
    customer: 'Miel Doré des Alpes',
    product: 'Pots de miel étiquetés',
    quantity: 500,
    amount: 275.0,
    status: 'processing',
    date: '2024-01-14',
  },
  {
    id: 'ORD-003',
    customer: 'Cosmétiques Purs',
    product: 'Contenants cosmétiques',
    quantity: 750,
    amount: 680.0,
    status: 'pending',
    date: '2024-01-13',
  },
  {
    id: 'ORD-004',
    customer: 'Brasserie Locale',
    product: 'Canettes personnalisées',
    quantity: 2000,
    amount: 890.0,
    status: 'completed',
    date: '2024-01-12',
  },
  {
    id: 'ORD-005',
    customer: 'Restaurant Le Gourmet',
    product: 'Gobelets réutilisables',
    quantity: 300,
    amount: 180.0,
    status: 'processing',
    date: '2024-01-11',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Terminé</Badge>;
    case 'processing':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>;
    case 'pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function DashboardOverview() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
          <p className="text-muted-foreground">Aperçu de votre activité d'impression cylindrique</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Derniers 30 jours
          </Button>
          <Button size="sm">
            <Package className="mr-2 h-4 w-4" />
            Nouvelle commande
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€45,231.89</div>
            <p className="text-muted-foreground text-xs">
              <span className="flex items-center text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +20.1%
              </span>
              par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-muted-foreground text-xs">
              <span className="flex items-center text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +180.1%
              </span>
              par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits imprimés</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-muted-foreground text-xs">
              <span className="flex items-center text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +19%
              </span>
              par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-muted-foreground text-xs">
              <span className="flex items-center text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +201
              </span>
              depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Commandes récentes</CardTitle>
                <CardDescription>
                  Vous avez {recentOrders.length} commandes ce mois-ci.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/orders">
                  Voir tout
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {order.product}
                      <div className="text-muted-foreground text-xs">Qté: {order.quantity}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right font-medium">
                      €{order.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Stats & Progress */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Aperçu mensuel</CardTitle>
            <CardDescription>Progression de vos objectifs ce mois-ci</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Objectif de ventes</span>
                <span className="font-medium">€45,231 / €50,000</span>
              </div>
              <Progress value={90} className="h-2" />
              <p className="text-muted-foreground text-xs">90% de l'objectif atteint</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Commandes traitées</span>
                <span className="font-medium">2,350 / 2,500</span>
              </div>
              <Progress value={94} className="h-2" />
              <p className="text-muted-foreground text-xs">94% de l'objectif atteint</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Satisfaction client</span>
                <span className="font-medium">4.8 / 5.0</span>
              </div>
              <Progress value={96} className="h-2" />
              <p className="text-muted-foreground text-xs">96% de satisfaction</p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Temps moyen de traitement</p>
                    <p className="text-muted-foreground text-xs">2.3 jours</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <Package className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Commandes en cours</p>
                    <p className="text-muted-foreground text-xs">23 commandes</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>Accès rapide aux fonctionnalités les plus utilisées</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/create-order">
                <Package className="h-6 w-6" />
                <span>Nouvelle commande</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/orders">
                <Eye className="h-6 w-6" />
                <span>Voir les commandes</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/customers">
                <Users className="h-6 w-6" />
                <span>Gestion clients</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/reports">
                <TrendingUp className="h-6 w-6" />
                <span>Rapports</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
