import React from 'react';
    import { useTranslation } from 'react-i18next';
    import PageTitle from '@/components/shared/PageTitle';
    
    const PoliciesPage = () => {
      const { t } = useTranslation();
    
      return (
        <>
          <PageTitle title={t('policies')} />
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-4">{t('policies')}</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p>Our Privacy Policy, Terms of Service, and other legal documents will be displayed here.</p>
              <h2>Privacy Policy</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
              <h2>Terms of Service</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
            </div>
          </div>
        </>
      );
    };
    
    export default PoliciesPage;