import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Clock } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types/database';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  pending: 'bg-warning text-warning-foreground',
  processing: 'bg-info text-info-foreground',
  shipped: 'bg-info text-info-foreground',
  delivered: 'bg-success text-success-foreground',
  completed: 'bg-success text-success-foreground',
  cancelled: 'bg-destructive text-destructive-foreground',
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) setOrders(data as unknown as Order[]);
    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-display font-bold mb-8">My Orders</h1>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (orders.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">No orders yet</h1>
          <p className="text-muted-foreground mb-6">
            Once you place an order, it will appear here.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/orders/${order.id}`}
                className="block bg-card rounded-xl border border-border p-4 sm:p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{order.order_number}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(order.created_at), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <Badge className={statusColors[order.status]}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <p className="font-bold text-primary mt-1">
                        {formatPrice(order.total_amount)}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
