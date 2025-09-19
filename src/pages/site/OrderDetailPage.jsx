import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import PageTitle from '@/components/shared/PageTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { t, i18n } = useTranslation();
  const { orders, currency, language } = useAppContext();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === decodeURIComponent(orderId));

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Pending': return 'secondary';
      case 'Shipped': return 'outline';
      case 'Cancelled': return 'destructive';
      default: return 'destructive';
    }
  };

  if (!order) {
    return (
      <>
        <PageTitle title={t('order_not_found')} />
        <div className="container mx-auto px-4 py-12 text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
          <h1 className="mt-6 text-2xl font-bold">{t('order_not_found')}</h1>
          <p className="mt-2 text-muted-foreground">{t('order_not_found_desc')}</p>
          <Button asChild className="mt-6">
            <Link to="/account">{t('back_to_orders')}</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTitle title={`${t('order_details')} ${order.id}`} />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold mx-4">{t('order_details')}</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{t('order_id')} {order.id}</CardTitle>
                    <CardDescription>{new Date(order.date).toLocaleString()}</CardDescription>
                  </div>
                  <Badge variant={getStatusVariant(order.status)} className="text-base py-1 px-4">{t(`status_${order.status.toLowerCase()}`)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-4">{t('items_in_order')}</h3>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <img src="https://images.unsplash.com/photo-1527264935190-1401c51b5bbc" alt={item.name[language]} className="w-16 h-16 rounded-md object-cover" />
                        <div>
                          <p className="font-medium">{item.name[language]}</p>
                          <p className="text-sm text-muted-foreground">{t('quantity')}: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">{currency.symbol}{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('shipping_address')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{order.shippingInfo.name}</p>
                <p>{order.shippingInfo.address}</p>
                <p>{order.shippingInfo.city}, {order.shippingInfo.country} {order.shippingInfo.zip}</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>{t('order_summary')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('subtotal')}</span>
                    <span>{currency.symbol}{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('shipping')}</span>
                    <span>{currency.symbol}{order.shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('total')}</span>
                    <span>{currency.symbol}{order.total.toFixed(2)}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-semibold mb-2">{t('payment_method')}</h4>
                  <p className="text-muted-foreground">{t(order.paymentMethod)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;