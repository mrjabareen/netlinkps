
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/AppContext';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const CartPage = () => {
  const { t, i18n } = useTranslation();
  const { cart, currency, language, updateCartItemQuantity, removeFromCart, cartSubtotal } = useAppContext();
  const navigate = useNavigate();

  const shippingEstimate = 5.00;
  const cartTotal = cartSubtotal + shippingEstimate;

  return (
    <>
      <PageTitle title={t('cart')} />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{t('shopping_cart')}</h1>
          </header>

          {cart.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
              <h2 className="mt-6 text-xl font-semibold">{t('cart_is_empty')}</h2>
              <p className="mt-2 text-muted-foreground">{t('cart_is_empty_desc')}</p>
              <Button asChild className="mt-6">
                <Link to="/products">{t('start_shopping')}</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center p-4 gap-4">
                          <img
                            src="https://images.unsplash.com/photo-1527264935190-1401c51b5bbc"
                            alt={item.name[language]}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                          <div className="flex-grow">
                            <h3 className="font-semibold">{item.name[language]}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <p className="text-lg font-bold mt-1">{currency.symbol}{(item.price).toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value, 10))}
                              className="w-16 text-center"
                            />
                            <Button variant="outline" size="icon" onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-5 w-5 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('order_summary')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>{t('subtotal')}</span>
                      <span className="font-semibold">{currency.symbol}{cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('shipping_estimate')}</span>
                      <span className="font-semibold">{currency.symbol}{shippingEstimate.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t('order_total')}</span>
                      <span>{currency.symbol}{cartTotal.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="lg" className="w-full" onClick={() => navigate('/checkout')}>
                      {t('proceed_to_checkout')}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default CartPage;
