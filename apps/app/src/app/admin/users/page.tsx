import { AdminUsersPage } from '@/components/pages/admin/users/admin-users';
import ProtectedRoute from '@/views/private-route';

export default function AdminUsers() {
  return (
    <ProtectedRoute>
      <AdminUsersPage />
    </ProtectedRoute>
  );
}
