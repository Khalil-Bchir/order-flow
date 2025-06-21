'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderNumber: string;
  customerName: string;
}

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  orderNumber,
  customerName,
}: DeleteConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirmer la suppression
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Êtes-vous sûr de vouloir supprimer la commande <strong>{orderNumber}</strong> de{' '}
              <strong>{customerName}</strong> ?
            </p>
            <p className="font-medium text-red-600">
              Cette action est irréversible et supprimera définitivement toutes les données
              associées à cette commande.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Supprimer définitivement
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
