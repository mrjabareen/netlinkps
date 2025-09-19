import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/use-toast';
import Stepper from '@/components/shared/Stepper';
import { CreditCard, Truck, CheckCircle, Landmark, Wallet, Coins as HandCoins } from 'lucide-react';

const CheckoutPage = () => {
  const { t, i18n } = useTranslation();
  const { cart, currency, cartSubtotal, placeOrder, currentUser, language } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    zip: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  useEffect(() => {
    if (cart.length === 0 && currentStep < 2) {
      navigate('/cart');
    }
    if (currentUser) {
      setShippingInfo(prev => ({ ...prev, name: currentUser.name, email: currentUser.email }));
    }
  }, [cart, navigate, currentUser, currentStep]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [id]: value }));
  };

  const shippingCost = shippingMethod === 'express' ? 15.00 : 5.00;
  const orderTotal = cartSubtotal + shippingCost;

  const steps = [
    { name: t('shipping') },
    { name: t('payment') },
    { name: t('confirmation') },
  ];

  const paymentOptions = [
    { value: 'credit_card', label: t('credit_card'), icon: CreditCard },
    { value: 'cash_on_delivery', label: t('cash_on_delivery'), icon: HandCoins },
    { value: 'reflect_wallet', label: t('reflect_wallet'), icon: Wallet },
    { value: 'palpay_wallet', label: t('palpay_wallet'), icon: Wallet },
    { value: 'bank_transfer', label: t('bank_transfer'), icon: Landmark },
  ];

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePlaceOrder = () => {
    placeOrder({
      shippingInfo,
      shippingMethod,
      paymentMethod,
      items: cart,
      subtotal: cartSubtotal,
      shippingCost,
      total: orderTotal,
    });
    toast({
      title: t('order_placed_successfully'),
      description: t('order_placed_desc'),
    });
    handleNextStep();
  };

  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case 'credit_card':
        return (
          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="card-number">{t('card_number')}</Label>
              <Input id="card-number" placeholder="•••• •••• •••• ••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry-date">{t('expiry_date')}</Label>
              <Input id="expiry-date" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">{t('cvc')}</Label>
              <Input id="cvc" placeholder="•••" />
            </div>
          </form>
        );
      case 'cash_on_delivery':
        return <p className="mt-4 text-muted-foreground">{t('cod_details')}</p>;
      case 'bank_transfer':
        return (
          <div className="mt-4 text-sm text-muted-foreground p-4 border rounded-md bg-secondary/50">
            <p className="mb-4">{t('bank_transfer_details')}</p>
            <ul className="space-y-2">
              <li><strong>{t('bank_name')}:</strong> Bank of Palestine</li>
              <li><strong>{t('account_name')}:</strong> NetLink ISP</li>
              <li><strong>{t('account_number')}:</strong> 123456789</li>
              <li><strong>{t('iban')}:</strong> PS00 BANK 0000 0000 1234 5678 9</li>
            </ul>
          </div>
        );
      case 'reflect_wallet':
      case 'palpay_wallet':
        return <p className="mt-4 text-muted-foreground">{t('feature_not_implemented')}</p>;
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Shipping
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader><CardTitle>{t('shipping_address')}</CardTitle></CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="name">{t('full_name')}</Label>
                    <Input id="name" value={shippingInfo.name} onChange={handleInputChange} />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address">{t('address')}</Label>
                    <Input id="address" value={shippingInfo.address} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">{t('city')}</Label>
                    <Input id="city" value={shippingInfo.city} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{t('country')}</Label>
                    <Input id="country" value={shippingInfo.country} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">{t('zip_code')}</Label>
                    <Input id="zip" value={shippingInfo.zip} onChange={handleInputChange} />
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader><CardTitle>{t('shipping_method')}</CardTitle></CardHeader>
              <CardContent>
                <RadioGroup defaultValue="standard" onValueChange={setShippingMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-md">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-grow">{t('standard_shipping')} (3-5 {t('days')})</Label>
                    <span>{currency.symbol}5.00</span>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-md">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-grow">{t('express_shipping')} (1-2 {t('days')})</Label>
                    <span>{currency.symbol}15.00</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        );
      case 1: // Payment
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader><CardTitle>{t('payment_method')}</CardTitle></CardHeader>
              <CardContent>
                <Select onValueChange={setPaymentMethod} defaultValue={paymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select_payment_method')} />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4 text-muted-foreground" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {renderPaymentDetails()}
              </CardContent>
            </Card>
          </motion.div>
        );
      case 2: // Confirmation
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
            <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
            <h2 className="mt-6 text-2xl font-bold">{t('order_placed_successfully')}</h2>
            <p className="mt-2 text-muted-foreground">{t('order_placed_desc')}</p>
            <Button asChild className="mt-8">
              <Link to="/products">{t('continue_shopping')}</Link>
            </Button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PageTitle title={t('checkout')} />
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{t('checkout')}</h1>
        </header>
        <div className="max-w-4xl mx-auto mb-12">
          <Stepper currentStep={currentStep} steps={steps} />
        </div>

        {currentStep < 2 ? (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              {renderStepContent()}
            </div>
            <div className="lg:col-span-1 sticky top-24">
              <Card>
                <CardHeader><CardTitle>{t('order_summary')}</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <img src="https://images.unsplash.com/photo-1527264935190-1401c51b5bbc" alt={item.name[language]} className="w-10 h-10 rounded-md object-cover" />
                          <div>
                            <p className="font-medium">{item.name[language]}</p>
                            <p className="text-muted-foreground">{t('quantity')}: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">{currency.symbol}{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('subtotal')}</span>
                      <span>{currency.symbol}{cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('shipping')}</span>
                      <span>{currency.symbol}{shippingCost.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>{t('total')}</span>
                      <span>{currency.symbol}{orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {currentStep === 0 && <Button size="lg" className="w-full" onClick={handleNextStep}>{t('continue_to_payment')}</Button>}
                  {currentStep === 1 && <Button size="lg" className="w-full" onClick={handlePlaceOrder}>{t('place_order')}</Button>}
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          renderStepContent()
        )}
      </div>
    </>
  );
};

export default CheckoutPage;