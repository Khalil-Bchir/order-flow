'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Calendar, Camera, Edit, Mail, MapPin, Phone, Save, User } from 'lucide-react';
import { useState } from 'react';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ahmed Ben Ali',
    email: 'ahmed@techcorp.tn',
    phone: '+216 98 123 456',
    company: 'TechCorp SARL',
    address: 'Avenue Habib Bourguiba, Tunis 1000',
    role: 'Client',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-23 14:30',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mon Profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et préférences de compte
          </p>
        </div>
        <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} className="w-fit">
          {isEditing ? (
            <>
              <Save className="mr-1 h-4 w-4" />
              Sauvegarder
            </>
          ) : (
            <>
              <Edit className="mr-1 h-4 w-4" />
              Modifier
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatars/1.svg" alt={profileData.name} />
                    <AvatarFallback className="text-lg">
                      {profileData.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-semibold">{profileData.name}</h3>
                  <p className="text-muted-foreground">{profileData.company}</p>
                  <Badge variant="secondary" className="mt-2">
                    <User className="mr-1 h-3 w-3" />
                    {profileData.role}
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Membre depuis</p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(profileData.joinDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Dernière connexion</p>
                    <p className="text-muted-foreground text-sm">{profileData.lastLogin}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Informations Personnelles</TabsTrigger>
              <TabsTrigger value="company">Entreprise</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Personnelles</CardTitle>
                  <CardDescription>
                    Gérez vos informations personnelles et de contact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom Complet</Label>
                      <div className="relative">
                        <User className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <div className="relative">
                        <MapPin className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          disabled={!isEditing}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Entreprise</CardTitle>
                  <CardDescription>
                    Détails de votre entreprise et informations commerciales
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Nom de l'Entreprise</Label>
                      <div className="relative">
                        <Building className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          disabled={!isEditing}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Secteur d'Activité</Label>
                      <Input
                        id="industry"
                        placeholder="Ex: Technologie, Restauration..."
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Numéro Fiscal</Label>
                      <Input
                        id="tax-id"
                        placeholder="Numéro d'identification fiscale"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Site Web</Label>
                      <Input
                        id="website"
                        placeholder="https://www.example.tn"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-address">Adresse de l'Entreprise</Label>
                    <Input
                      id="company-address"
                      placeholder="Adresse complète de l'entreprise"
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité du Compte</CardTitle>
                  <CardDescription>
                    Gérez votre mot de passe et les paramètres de sécurité
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de Passe Actuel</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Entrez votre mot de passe actuel"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nouveau Mot de Passe</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Entrez un nouveau mot de passe"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le Mot de Passe</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirmez le nouveau mot de passe"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="border-t pt-4">
                      <Button variant="outline" className="w-full">
                        Changer le Mot de Passe
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
