import OrdersOverview from '@/components/pages/orders/overview';
import AdminView from '@/views/admin-view';

export default function AdminOrdersPage() {
  return (
    <AdminView>
      <OrdersOverview />
    </AdminView>
  );
}
