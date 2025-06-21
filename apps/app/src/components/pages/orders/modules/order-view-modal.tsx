'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, DollarSign, Mail, Package, User } from 'lucide-react';

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

interface OrderViewModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (order: Order) => void;
}

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

export default function OrderViewModal({ order, isOpen, onClose, onEdit }: OrderViewModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Détails de la commande {order.id}
          </DialogTitle>
          <DialogDescription>
            Informations complètes sur cette commande d'impression
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Statut</p>
                {getStatusBadge(order.status)}
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">Priorité</p>
                {getPriorityBadge(order.priority)}
              </div>
            </div>
            <Button onClick={() => onEdit(order)}>Modifier la commande</Button>
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <User className="h-4 w-4" />
              Informations client
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <span className="font-medium">{order.customer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm">{order.email}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Product Information */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Package className="h-4 w-4" />
              Détails du produit
            </h3>
            <div className="bg-muted/50 space-y-3 rounded-lg p-4">
              <div>
                <p className="font-medium">{order.product}</p>
                <p className="text-muted-foreground text-sm">Quantité: {order.quantity} unités</p>
              </div>
              {order.notes && (
                <div>
                  <p className="text-muted-foreground mb-1 text-sm font-medium">Notes spéciales:</p>
                  <p className="bg-background rounded border p-2 text-sm">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Order Timeline */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Calendar className="h-4 w-4" />
              Chronologie
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Date de commande</p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(order.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Date limite</p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(order.dueDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <DollarSign className="h-4 w-4" />
              Informations financières
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Montant total</span>
                <span className="text-2xl font-bold">€{order.amount.toFixed(2)}</span>
              </div>
              <div className="text-muted-foreground mt-2 text-sm">
                Prix unitaire: €{(order.amount / order.quantity).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button onClick={() => onEdit(order)}>Modifier cette commande</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
