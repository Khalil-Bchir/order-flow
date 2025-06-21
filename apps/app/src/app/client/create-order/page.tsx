import { CreateOrderOverview } from '@/components/pages/orders';
import ClientView from '@/views/client-view';

export default function AdminPage() {
  return (
    <ClientView>
      <CreateOrderOverview />
    </ClientView>
  );
}
