'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  AlertCircle,
  Bell,
  CheckCircle,
  BookMarkedIcon as MarkAsRead,
  Package,
  Settings,
  Trash2,
  Truck,
} from 'lucide-react';
import { useState } from 'react';

// Mock notifications data
const mockNotifications = [
  {
    id: 'NOT-001',
    type: 'order_update',
    title: 'Commande ORD-002 mise à jour',
    message: 'Votre commande de 25 Mugs de Voyage est maintenant en production',
    timestamp: '2024-01-23 14:30',
    read: false,
    priority: 'normal',
  },
  {
    id: 'NOT-002',
    type: 'order_shipped',
    title: 'Commande ORD-001 expédiée',
    message: 'Votre commande a été expédiée. Numéro de suivi: TN123456789',
    timestamp: '2024-01-23 09:15',
    read: false,
    priority: 'high',
  },
  {
    id: 'NOT-003',
    type: 'order_delivered',
    title: 'Commande ORD-001 livrée',
    message: 'Votre commande de 50 Mugs Café Classique a été livrée avec succès',
    timestamp: '2024-01-22 16:45',
    read: true,
    priority: 'normal',
  },
  {
    id: 'NOT-004',
    type: 'system',
    title: 'Maintenance programmée',
    message: 'Une maintenance système est prévue le 25 janvier de 02h00 à 04h00',
    timestamp: '2024-01-22 10:00',
    read: true,
    priority: 'low',
  },
  {
    id: 'NOT-005',
    type: 'promotion',
    title: 'Offre spéciale - 15% de réduction',
    message: 'Profitez de 15% de réduction sur toutes les commandes de plus de 100 unités',
    timestamp: '2024-01-21 08:30',
    read: false,
    priority: 'normal',
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order_update':
      return <Package className="h-4 w-4 text-blue-500" />;
    case 'order_shipped':
      return <Truck className="h-4 w-4 text-orange-500" />;
    case 'order_delivered':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'system':
      return <Settings className="h-4 w-4 text-gray-500" />;
    case 'promotion':
      return <Bell className="h-4 w-4 text-purple-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return (
        <Badge variant="destructive" className="text-xs">
          Haute
        </Badge>
      );
    case 'normal':
      return (
        <Badge variant="secondary" className="text-xs">
          Normale
        </Badge>
      );
    case 'low':
      return (
        <Badge variant="outline" className="text-xs">
          Basse
        </Badge>
      );
    default:
      return null;
  }
};

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    systemAlerts: true,
    deliveryNotifications: true,
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Gérez vos notifications et préférences</p>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <MarkAsRead className="mr-1 h-4 w-4" />
              Tout marquer comme lu ({unreadCount})
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Notifications Récentes</span>
                {unreadCount > 0 && <Badge variant="destructive">{unreadCount} non lues</Badge>}
              </CardTitle>
              <CardDescription>Vos dernières notifications et mises à jour</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.length === 0 ? (
                <div className="py-8 text-center">
                  <Bell className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-semibold">Aucune notification</h3>
                  <p className="text-muted-foreground">
                    Vous n'avez aucune notification pour le moment
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 rounded-lg border p-4 transition-colors ${
                      !notification.read
                        ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
                        : 'bg-background'
                    }`}
                  >
                    <div className="mt-1 flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4
                            className={`text-sm font-semibold ${
                              !notification.read ? 'text-blue-900 dark:text-blue-100' : ''
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {notification.message}
                          </p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="text-muted-foreground text-xs">
                              {notification.timestamp}
                            </span>
                            {getPriorityBadge(notification.priority)}
                          </div>
                        </div>
                        <div className="ml-4 flex items-center space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs"
                            >
                              Marquer comme lu
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de Notification</CardTitle>
              <CardDescription>Configurez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notifications Email</Label>
                    <p className="text-muted-foreground text-sm">
                      Recevoir les notifications par email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-updates">Mises à jour Commandes</Label>
                    <p className="text-muted-foreground text-sm">
                      Notifications sur l'état des commandes
                    </p>
                  </div>
                  <Switch
                    id="order-updates"
                    checked={settings.orderUpdates}
                    onCheckedChange={(checked) => updateSetting('orderUpdates', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="delivery-notifications">Notifications Livraison</Label>
                    <p className="text-muted-foreground text-sm">Alertes de livraison et suivi</p>
                  </div>
                  <Switch
                    id="delivery-notifications"
                    checked={settings.deliveryNotifications}
                    onCheckedChange={(checked) => updateSetting('deliveryNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="promotions">Promotions</Label>
                    <p className="text-muted-foreground text-sm">Offres spéciales et réductions</p>
                  </div>
                  <Switch
                    id="promotions"
                    checked={settings.promotions}
                    onCheckedChange={(checked) => updateSetting('promotions', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-alerts">Alertes Système</Label>
                    <p className="text-muted-foreground text-sm">
                      Maintenance et mises à jour système
                    </p>
                  </div>
                  <Switch
                    id="system-alerts"
                    checked={settings.systemAlerts}
                    onCheckedChange={(checked) => updateSetting('systemAlerts', checked)}
                  />
                </div>
              </div>

              <Button className="w-full">Sauvegarder les Préférences</Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Total notifications:</span>
                <span className="font-semibold">{notifications.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Non lues:</span>
                <span className="font-semibold text-blue-600">{unreadCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Lues:</span>
                <span className="font-semibold text-green-600">
                  {notifications.length - unreadCount}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
