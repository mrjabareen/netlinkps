import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminSettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { exchangeRates, updateExchangeRates } = useAppContext();
  const [rates, setRates] = useState(exchangeRates);

  const handleRateChange = (currency, value) => {
    setRates(prev => ({
      ...prev,
      [currency]: parseFloat(value) || 0,
    }));
  };

  const handleSave = () => {
    updateExchangeRates(rates);
    toast({
      title: t('settings_saved'),
      description: t('exchange_rates_updated'),
    });
  };

  return (
    <>
      <PageTitle title={t('exchange_rates')} />
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('exchange_rates')}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('exchange_rates')}</CardTitle>
            <CardDescription>{t('exchange_rates_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <Label htmlFor="ils-rate">{t('base_currency')}</Label>
                <Input id="ils-rate" value="1 ILS (₪)" disabled />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(rates).filter(c => c !== 'ILS').map(currency => (
                <div key={currency} className="space-y-2">
                  <Label htmlFor={`${currency}-rate`}>1 ILS to {currency}</Label>
                  <Input
                    id={`${currency}-rate`}
                    type="number"
                    step="0.001"
                    value={rates[currency]}
                    onChange={(e) => handleRateChange(currency, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>{t('save_changes')}</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AdminSettings;