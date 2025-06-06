import { OrderTrackingPage } from '@/components/pages/order-tracking/order-tracking';
import ProtectedRoute from '@/views/private-route';

export default function OrderTracking() {
  return (
    <ProtectedRoute>
      <OrderTrackingPage />
    </ProtectedRoute>
  );
}
