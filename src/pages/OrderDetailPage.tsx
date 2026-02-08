import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Package, MapPin, CreditCard, Check } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderItem } from '@/types/database';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending: 'bg-warning text-warning-foreground',
  processing: 'bg-info text-info-foreground',
  shipped: 'bg-info text-info-foreground',
  delivered: 'bg-success text-success-foreground',
  completed: 'bg-success text-success-foreground',
  cancelled: 'bg-destructive text-destructive-foreground',
};

const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'completed'];

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId && user) fetchOrder();
  }, [orderId, user]);

  const fetchOrder = async () => {
    const [orderRes, itemsRes] = await Promise.all([
      supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('user_id', user?.id)
        .single(),
      supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId),
    ]);

    if (orderRes.data) setOrder(orderRes.data as unknown as Order);
    if (itemsRes.data) setItems(itemsRes.data as OrderItem[]);
    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const currentStatusIndex = order ? orderStatuses.indexOf(order.status) : -1;

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-8" />
          <div className="space-y-6">
            <div className="h-32 bg-muted animate-pulse rounded-xl" />
            <div className="h-64 bg-muted animate-pulse rounded-xl" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button asChild>
            <Link to="/orders">Back to Orders</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">
              {order.order_number}
            </h1>
            <p className="text-muted-foreground">
              Placed on {format(new Date(order.created_at), 'MMM d, yyyy')}
            </p>
          </div>
          <Badge className={cn(statusColors[order.status], 'text-sm')}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        {/* Status Timeline */}
        {order.status !== 'cancelled' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between relative">
                {orderStatuses.slice(0, -1).map((status, index) => (
                  <div key={status} className="flex flex-col items-center relative z-10">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center border-2',
                        index <= currentStatusIndex
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-muted border-border text-muted-foreground'
                      )}
                    >
                      {index < currentStatusIndex ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs mt-2 capitalize hidden sm:block">
                      {status}
                    </span>
                  </div>
                ))}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-0">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${(currentStatusIndex / (orderStatuses.length - 2)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × {formatPrice(item.unit_price)}
                        </p>
                      </div>
                      <p className="font-semibold">{formatPrice(item.total_price)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Address */}
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {order.shipping_amount === 0
                      ? 'Free'
                      : formatPrice(order.shipping_amount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(order.tax_amount)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(order.total_amount)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            {order.shipping_address && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{order.shipping_address.full_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shipping_address.address_line_1}
                    {order.shipping_address.address_line_2 &&
                      `, ${order.shipping_address.address_line_2}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.shipping_address.city}, {order.shipping_address.state} -{' '}
                    {order.shipping_address.pincode}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Phone: {order.shipping_address.phone}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
