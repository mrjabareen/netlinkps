import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import { User, ShoppingBag, Lock, LogOut, MapPin, Wifi, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AccountPage = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { currentUser, updateCurrentUser, logout, orders, currency } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser, navigate]);

  const userOrders = orders.filter(order => order.userId === currentUser?.id).sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateCurrentUser({ name, email });
    toast({
      title: t('profile_updated'),
      description: t('profile_updated_desc'),
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    toast({
      title: t('feature_not_implemented_title'),
      description: t('feature_not_implemented'),
    });
  };
  
  const handleFeatureNotImplemented = () => {
     toast({
      title: t('feature_not_implemented_title'),
      description: t('feature_not_implemented'),
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Pending': return 'secondary';
      case 'Shipped': return 'outline';
      default: return 'destructive';
    }
  };

  if (!currentUser) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <PageTitle title={t('my_account')} />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{t('my_account')}</h1>
            <p className="text-muted-foreground">{t('welcome_back')}, {currentUser.name}!</p>
          </header>

          <main>
            <Tabs defaultValue="profile" className="w-full" dir={i18n.dir()}>
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="profile">{t('profile')}</TabsTrigger>
                <TabsTrigger value="orders">{t('orders')}</TabsTrigger>
                <TabsTrigger value="addresses">{t('addresses')}</TabsTrigger>
                <TabsTrigger value="subscriptions">{t('my_subscriptions')}</TabsTrigger>
                <TabsTrigger value="security">{t('security')}</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('profile_information')}</CardTitle>
                    <CardDescription>{t('profile_information_desc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-lg" dir={i18n.dir()}>
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('full_name')}</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('email_address')}</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <Button type="submit">{t('save_changes')}</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('order_history')}</CardTitle>
                    <CardDescription>{t('order_history_desc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userOrders.length > 0 ? (
                      <div className="space-y-4">
                        {userOrders.map(order => (
                          <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border gap-4">
                            <div className="flex-grow">
                              <p className="font-semibold text-lg">{t('order_id')} {order.id}</p>
                              <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleString()}</p>
                              <p className="font-bold text-primary mt-2">{currency.symbol}{order.total.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                               <Badge variant={getStatusVariant(order.status)} className="text-sm py-1 px-3">{t(`status_${order.status.toLowerCase()}`)}</Badge>
                               <Button asChild variant="outline" size="sm">
                                <Link to={`/order/${encodeURIComponent(order.id)}`}>{t('view_details')}</Link>
                               </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                       <div className="text-center py-16 border-2 border-dashed rounded-lg">
                          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
                          <h2 className="mt-6 text-xl font-semibold">{t('no_orders_found')}</h2>
                          <p className="mt-2 text-muted-foreground">{t('no_orders_found_desc')}</p>
                          <Button asChild className="mt-6">
                            <a href="/products">{t('start_shopping')}</a>
                          </Button>
                        </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('manage_addresses')}</CardTitle>
                    <CardDescription>{t('manage_addresses_desc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <MapPin className="mx-auto h-16 w-16 text-muted-foreground" />
                        <h2 className="mt-6 text-xl font-semibold">{t('no_addresses_found')}</h2>
                        <p className="mt-2 text-muted-foreground">{t('no_addresses_found_desc')}</p>
                        <Button className="mt-6" onClick={handleFeatureNotImplemented}>
                          <PlusCircle className="h-4 w-4 me-2" />
                          {t('add_new_address')}
                        </Button>
                      </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="subscriptions">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('manage_subscriptions')}</CardTitle>
                    <CardDescription>{t('manage_subscriptions_desc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <Wifi className="mx-auto h-16 w-16 text-muted-foreground" />
                        <h2 className="mt-6 text-xl font-semibold">{t('no_subscriptions_found')}</h2>
                        <p className="mt-2 text-muted-foreground">{t('no_subscriptions_found_desc')}</p>
                        <Button asChild className="mt-6">
                           <a href="/internet-packages">{t('internet_packages')}</a>
                        </Button>
                      </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('change_password')}</CardTitle>
                    <CardDescription>{t('change_password_desc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg" dir={i18n.dir()}>
                      <div className="space-y-2">
                        <Label htmlFor="current-password">{t('current_password')}</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">{t('new_password')}</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-new-password">{t('confirm_new_password')}</Label>
                        <Input id="confirm-new-password" type="password" />
                      </div>
                      <Button type="submit">{t('update_password')}</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
             <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-destructive">{t('logout')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Are you sure you want to log out of your account?</p>
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 me-2" /> {t('logout')}
                    </Button>
                </CardContent>
            </Card>
          </main>
        </motion.div>
      </div>
    </>
  );
};

export default AccountPage;