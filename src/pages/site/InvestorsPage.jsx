import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import PageTitle from '@/components/shared/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, PieChart, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestorsPage = () => {
  const { t, i18n } = useTranslation();
  const { language, investmentData, getDisplayPrice, currency } = useAppContext();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US').format(value);
  };

  const chartData = investmentData.profitHistory.map(item => ({
    name: item.year,
    [t('profit')]: item.profit,
  }));

  const metrics = [
    {
      icon: TrendingUp,
      title: t('share_price'),
      value: formatCurrency(getDisplayPrice(investmentData.sharePrice)),
      color: 'text-green-500',
    },
    {
      icon: Target,
      title: t('company_valuation'),
      value: formatCurrency(getDisplayPrice(investmentData.totalValue)),
      color: 'text-blue-500',
    },
    {
      icon: PieChart,
      title: t('total_shares'),
      value: formatNumber(investmentData.totalShares),
      color: 'text-purple-500',
    },
    {
      icon: BarChart,
      title: t('annual_profit'),
      value: formatCurrency(getDisplayPrice(investmentData.annualProfit)),
      color: 'text-yellow-500',
    },
  ];

  return (
    <>
      <PageTitle title={t('investor_relations')} description={t('financial_overview')} />
      <div className="bg-background">
        <header className="bg-secondary py-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            {t('investor_relations')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t('financial_overview')}
          </motion.p>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">{t('company_performance')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="text-center h-full">
                    <CardHeader>
                      <metric.icon className={`mx-auto h-10 w-10 mb-2 ${metric.color}`} />
                      <CardTitle className="text-muted-foreground font-medium">{metric.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{metric.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('annual_profit_growth')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: 400 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" reversed={i18n.dir() === 'rtl'} />
                      <YAxis 
                        tickFormatter={(value) => formatCurrency(getDisplayPrice(value))} 
                        orientation={i18n.dir() === 'rtl' ? 'right' : 'left'}
                      />
                      <Tooltip
                        formatter={(value) => [formatCurrency(getDisplayPrice(value)), t('profit')]}
                        labelStyle={{ color: '#333' }}
                        itemStyle={{ fontWeight: 'bold' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey={t('profit')} stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4">{t('executive_summary')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {investmentData.summary[language]}
              </p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">{t('my_account')}</h3>
              <p className="text-muted-foreground mb-6">{t('login_to_view_portfolio')}</p>
              <Button asChild size="lg">
                <Link to="/login">{t('login')}</Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default InvestorsPage;