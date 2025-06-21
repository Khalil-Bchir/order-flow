export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
}

export const AdminUser: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
};

export const ClientUser: User = {
  id: '2',
  email: 'client@example.com',
  name: 'Client User',
  role: 'client',
};
