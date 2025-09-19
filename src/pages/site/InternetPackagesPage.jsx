import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/use-toast';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wifi, Zap, Download, CheckCircle2 } from 'lucide-react';

const InternetPackagesPage = () => {
  const { t } = useTranslation();
  const { packages, currency, language, getDisplayPrice } = useAppContext();
  const { toast } = useToast();

  const handleSubscribe = (pkg) => {
    toast({
      title: t('feature_not_implemented_title'),
      description: t('feature_not_implemented'),
    });
  };

  return (
    <>
      <PageTitle title={t('internet_packages')} description={t('internet_packages_subtitle')} />
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-primary mb-4"
            >
              {t('internet_packages')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              {t('internet_packages_subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {packages.map((pkg, index) => {
              const featuresForLang = pkg.features?.[language] || pkg.features?.en || [];
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-primary">
                    <CardHeader className="bg-muted/30">
                      <Wifi className="h-12 w-12 mx-auto text-primary" />
                      <CardTitle className="mt-4 text-2xl">{pkg.name[language] || pkg.name.en}</CardTitle>
                      <CardDescription>{pkg.description?.[language] || ''}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pt-6">
                      <div className="text-4xl font-bold text-primary mb-6">
                        {currency.symbol}{getDisplayPrice(pkg.price).toFixed(2)}
                        <span className="text-base font-normal text-muted-foreground">/ {pkg.duration[language] || pkg.duration.en}</span>
                      </div>
                      <ul className="space-y-4 text-muted-foreground">
                        <li className="flex items-center justify-center gap-2">
                          <Zap className="h-5 w-5 text-green-500" />
                          <span className="font-medium">{t('speed')}:</span>
                          <span>{pkg.speed} Mbps</span>
                        </li>
                        <li className="flex items-center justify-center gap-2">
                          <Download className="h-5 w-5 text-green-500" />
                          <span className="font-medium">{t('data')}:</span>
                          <span>{pkg.data}</span>
                        </li>
                      </ul>
                      {featuresForLang.length > 0 && (
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="font-semibold mb-3 text-lg">{t('features')}</h4>
                          <ul className="space-y-2 text-sm">
                            {featuresForLang.map((feature, i) => (
                              <li key={i} className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" size="lg" onClick={() => handleSubscribe(pkg)}>
                        {t('subscribe_now')}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default InternetPackagesPage;