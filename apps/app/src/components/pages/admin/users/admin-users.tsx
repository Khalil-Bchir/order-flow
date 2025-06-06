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
import {
  Building,
  Calendar,
  Edit,
  Mail,
  Phone,
  Search,
  Shield,
  Trash2,
  User,
  UserPlus,
} from 'lucide-react';
import { useState } from 'react';

// Mock data for users
const mockUsers = [
  {
    id: 'USR-001',
    name: 'Ahmed Ben Ali',
    email: 'ahmed@techcorp.tn',
    phone: '+216 98 123 456',
    company: 'TechCorp SARL',
    role: 'client',
    status: 'active',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-23',
    totalOrders: 5,
    totalSpent: '7,500 TND',
  },
  {
    id: 'USR-002',
    name: 'Fatma Trabelsi',
    email: 'fatma@designstudio.tn',
    phone: '+216 97 234 567',
    company: 'Design Studio',
    role: 'client',
    status: 'active',
    joinDate: '2024-01-12',
    lastLogin: '2024-01-22',
    totalOrders: 3,
    totalSpent: '4,200 TND',
  },
  {
    id: 'USR-003',
    name: 'Mohamed Sassi',
    email: 'mohamed@cafecentral.tn',
    phone: '+216 96 345 678',
    company: 'Café Central',
    role: 'client',
    status: 'inactive',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20',
    totalOrders: 1,
    totalSpent: '2,000 TND',
  },
  {
    id: 'USR-004',
    name: 'Salma Khelifi',
    email: 'salma@cylindreimpression.tn',
    phone: '+216 95 456 789',
    company: 'CylindreImpression',
    role: 'moderator',
    status: 'active',
    joinDate: '2023-12-01',
    lastLogin: '2024-01-23',
    totalOrders: 0,
    totalSpent: '0 TND',
  },
  {
    id: 'USR-005',
    name: 'Karim Bouazizi',
    email: 'karim@cylindreimpression.tn',
    phone: '+216 94 567 890',
    company: 'CylindreImpression',
    role: 'admin',
    status: 'active',
    joinDate: '2023-11-15',
    lastLogin: '2024-01-23',
    totalOrders: 0,
    totalSpent: '0 TND',
  },
];

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'admin':
      return (
        <Badge className="bg-red-500">
          <Shield className="mr-1 h-3 w-3" />
          Admin
        </Badge>
      );
    case 'moderator':
      return (
        <Badge className="bg-blue-500">
          <User className="mr-1 h-3 w-3" />
          Modérateur
        </Badge>
      );
    case 'client':
      return (
        <Badge variant="secondary">
          <Building className="mr-1 h-3 w-3" />
          Client
        </Badge>
      );
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return (
        <Badge variant="default" className="bg-green-500">
          Actif
        </Badge>
      );
    case 'inactive':
      return <Badge variant="secondary">Inactif</Badge>;
    case 'suspended':
      return <Badge variant="destructive">Suspendu</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const updateUserStatus = (userId: string, newStatus: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)));
  };

  const updateUserRole = (userId: string, newRole: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
  };

  const getUserStats = () => {
    const total = users.length;
    const clients = users.filter((u) => u.role === 'client').length;
    const moderators = users.filter((u) => u.role === 'moderator').length;
    const admins = users.filter((u) => u.role === 'admin').length;
    const active = users.filter((u) => u.status === 'active').length;

    return { total, clients, moderators, admins, active };
  };

  const stats = getUserStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les comptes utilisateurs, rôles et permissions
          </p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-1 h-4 w-4" />
              Ajouter Utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un Nouvel Utilisateur</DialogTitle>
              <DialogDescription>
                Créer un nouveau compte utilisateur avec les informations requises
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom Complet *</Label>
                <Input id="name" placeholder="Ahmed Ben Ali" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="ahmed@example.tn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="+216 XX XXX XXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Entreprise</Label>
                <Input id="company" placeholder="Nom de l'entreprise" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select defaultValue="client">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="moderator">Modérateur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsAddUserOpen(false)}>Créer Utilisateur</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-muted-foreground text-xs">Total Utilisateurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.clients}</div>
            <p className="text-muted-foreground text-xs">Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.moderators}</div>
            <p className="text-muted-foreground text-xs">Modérateurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
            <p className="text-muted-foreground text-xs">Administrateurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-muted-foreground text-xs">Actifs</p>
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
                placeholder="Rechercher par nom, email ou entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="client">Clients</SelectItem>
                <SelectItem value="moderator">Modérateurs</SelectItem>
                <SelectItem value="admin">Administrateurs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="inactive">Inactifs</SelectItem>
                <SelectItem value="suspended">Suspendus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Utilisateurs</CardTitle>
          <CardDescription>Gérez les comptes utilisateurs et leurs permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière Connexion</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-muted-foreground text-sm">{user.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-1 h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="text-muted-foreground flex items-center text-sm">
                        <Phone className="mr-1 h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{user.totalOrders}</div>
                      <div className="text-muted-foreground text-xs">{user.totalSpent}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Modifier Utilisateur</DialogTitle>
                            <DialogDescription>
                              Modifier les informations et permissions de l'utilisateur
                            </DialogDescription>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Nom Complet</Label>
                                  <Input id="edit-name" defaultValue={selectedUser.name} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-email">Email</Label>
                                  <Input id="edit-email" defaultValue={selectedUser.email} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-phone">Téléphone</Label>
                                  <Input id="edit-phone" defaultValue={selectedUser.phone} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-company">Entreprise</Label>
                                  <Input id="edit-company" defaultValue={selectedUser.company} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-role">Rôle</Label>
                                  <Select
                                    value={selectedUser.role}
                                    onValueChange={(value) =>
                                      updateUserRole(selectedUser.id, value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="client">Client</SelectItem>
                                      <SelectItem value="moderator">Modérateur</SelectItem>
                                      <SelectItem value="admin">Administrateur</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-status">Statut</Label>
                                  <Select
                                    value={selectedUser.status}
                                    onValueChange={(value) =>
                                      updateUserStatus(selectedUser.id, value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Actif</SelectItem>
                                      <SelectItem value="inactive">Inactif</SelectItem>
                                      <SelectItem value="suspended">Suspendu</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <h4 className="mb-3 font-semibold">Statistiques</h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Membre depuis:</span>
                                    <div className="font-medium">
                                      {new Date(selectedUser.joinDate).toLocaleDateString('fr-FR')}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Total commandes:</span>
                                    <div className="font-medium">{selectedUser.totalOrders}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Total dépensé:</span>
                                    <div className="font-medium">{selectedUser.totalSpent}</div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Annuler</Button>
                                <Button>Sauvegarder</Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
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
