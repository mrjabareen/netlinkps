import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import PageTitle from '@/components/shared/PageTitle';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { t } = useTranslation();
  const { currency, users, products, orders } = useAppContext();

  const totalRevenue = orders
    .filter(order => order.status === 'Completed')
    .reduce((sum, order) => sum + order.total, 0);

  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const stats = [
    { title: t('total_revenue'), value: `${currency.symbol}${totalRevenue.toFixed(2)}`, icon: DollarSign, change: "+2.5%" },
    { title: t('total_sales'), value: orders.length, icon: ShoppingCart, change: "+5.1%" },
    { title: t('total_users'), value: users.length, icon: Users, change: "" },
    { title: t('total_products'), value: products.length, icon: Package, change: "" },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Pending': return 'secondary';
      case 'Shipped': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <>
      <PageTitle title={t('admin_dashboard')} />
      <div>
        <h1 className="text-3xl font-bold">{t('welcome_admin')}</h1>
        <p className="text-muted-foreground">{t('dashboard_subtitle')}</p>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {/* <p className="text-xs text-muted-foreground">{stat.change} from last month</p> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('recent_orders')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('order_id')}</TableHead>
                  <TableHead>{t('customer')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead className="text-right">{t('total')}</TableHead>
                  <TableHead className="text-right">{t('date')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>{t(`status_${order.status.toLowerCase()}`)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{currency.symbol}{order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{new Date(order.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <Button asChild variant="outline">
                <Link to="/admin/orders">{t('view_all_orders')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;