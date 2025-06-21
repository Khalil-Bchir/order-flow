'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Package, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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

interface OrderEditModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
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

export default function OrderEditModal({ order, isOpen, onClose, onSave }: OrderEditModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setFormData({ ...order });
    }
  }, [order]);

  if (!order || !formData) return null;

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSave(formData);

      const statusLabel =
        statusOptions.find((s) => s.value === formData.status)?.label || formData.status;
      toast({
        title: 'Commande mise à jour',
        description: `La commande ${formData.id} a été mise à jour. Nouveau statut: "${statusLabel}".`,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de la commande.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Order, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Modifier la commande {order.id}
          </DialogTitle>
          <DialogDescription>Modifiez les détails de cette commande d'impression</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority Section */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Statut de la commande</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${status.color.split(' ')[0]}`} />
                        {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations client</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customer">Nom du client</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => handleInputChange('customer', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Détails du produit</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Produit</Label>
                <Input
                  id="product"
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantité</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange('quantity', Number.parseInt(e.target.value) || 0)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (€)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      handleInputChange('amount', Number.parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dates importantes</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date de commande</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Date limite</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes spéciales</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Ajoutez des notes spéciales pour cette commande..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              <X className="mr-2 h-4 w-4" />
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="border-background mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
