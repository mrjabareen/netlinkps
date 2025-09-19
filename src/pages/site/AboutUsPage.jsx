import React from 'react';
    import { useTranslation } from 'react-i18next';
    import PageTitle from '@/components/shared/PageTitle';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    
    const AboutUsPage = () => {
      const { t } = useTranslation();
      const { toast } = useToast();
    
      const showToast = () => {
        toast({
          title: "Coming Soon!",
          description: t('feature_not_implemented'),
        });
      };
    
      return (
        <>
          <PageTitle title={t('about_us')} />
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">{t('about_us')}</h1>
            <p className="text-xl text-muted-foreground mb-8">Information about NetLink will be here.</p>
            <Button onClick={showToast}>Learn More</Button>
          </div>
        </>
      );
    };
    
    export default AboutUsPage;