import { AdminOrdersPage } from '@/components/pages/admin/orders/admin-orders';
import ProtectedRoute from '@/views/private-route';

export default function AdminOrders() {
  return (
    <ProtectedRoute>
      <AdminOrdersPage />
    </ProtectedRoute>
  );
}
