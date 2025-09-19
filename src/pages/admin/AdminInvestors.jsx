import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';

const AdminInvestors = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { investmentData, updateInvestmentData } = useAppContext();
  const [data, setData] = useState(investmentData);

  const handleMetricChange = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  const handleSummaryChange = (lang, value) => {
    setData(prev => ({
      ...prev,
      summary: {
        ...prev.summary,
        [lang]: value,
      },
    }));
  };

  const handleHistoryChange = (index, key, value) => {
    const newHistory = [...data.profitHistory];
    newHistory[index] = { ...newHistory[index], [key]: value };
    setData(prev => ({ ...prev, profitHistory: newHistory }));
  };

  const addHistoryRow = () => {
    const newYear = data.profitHistory.length > 0 ? String(parseInt(data.profitHistory[data.profitHistory.length - 1].year) + 1) : new Date().getFullYear().toString();
    setData(prev => ({
      ...prev,
      profitHistory: [...prev.profitHistory, { year: newYear, profit: 0 }],
    }));
  };

  const removeHistoryRow = (index) => {
    const newHistory = data.profitHistory.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, profitHistory: newHistory }));
  };

  const handleSave = () => {
    updateInvestmentData(data);
    toast({
      title: t('save_changes'),
      description: t('investment_data_updated'),
    });
  };

  return (
    <>
      <PageTitle title={t('investor_dashboard')} />
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('investor_dashboard')}</h1>
          <Button onClick={handleSave}>{t('save_changes')}</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('key_metrics')}</CardTitle>
            <CardDescription>{t('investor_dashboard_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sharePrice">{t('share_price')}</Label>
              <Input id="sharePrice" type="number" value={data.sharePrice} onChange={(e) => handleMetricChange('sharePrice', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalValue">{t('company_valuation')}</Label>
              <Input id="totalValue" type="number" value={data.totalValue} onChange={(e) => handleMetricChange('totalValue', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalShares">{t('total_shares')}</Label>
              <Input id="totalShares" type="number" value={data.totalShares} onChange={(e) => handleMetricChange('totalShares', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualProfit">{t('annual_profit')}</Label>
              <Input id="annualProfit" type="number" value={data.annualProfit} onChange={(e) => handleMetricChange('annualProfit', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('profit_history')}</CardTitle>
            <CardDescription>{t('profit_history_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.profitHistory.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`year-${index}`}>{t('year')}</Label>
                  <Input id={`year-${index}`} value={item.year} onChange={(e) => handleHistoryChange(index, 'year', e.target.value)} />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`profit-${index}`}>{t('profit')}</Label>
                  <Input id={`profit-${index}`} type="number" value={item.profit} onChange={(e) => handleHistoryChange(index, 'profit', e.target.value)} />
                </div>
                <Button variant="destructive" size="icon" onClick={() => removeHistoryRow(index)} className="self-end">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addHistoryRow}>{t('add_year')}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('investor_summary')}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="summary_en">{t('summary_en')}</Label>
              <Textarea id="summary_en" value={data.summary.en} onChange={(e) => handleSummaryChange('en', e.target.value)} rows={6} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary_ar">{t('summary_ar')}</Label>
              <Textarea id="summary_ar" value={data.summary.ar} onChange={(e) => handleSummaryChange('ar', e.target.value)} rows={6} dir="rtl" />
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

export default AdminInvestors;