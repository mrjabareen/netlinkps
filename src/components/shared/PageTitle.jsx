
    import React from 'react';
    import { Helmet } from 'react-helmet-async';
    
    const PageTitle = ({ title, description }) => {
      const siteName = "NetLink";
      const fullTitle = title ? `${title} | ${siteName}` : siteName;
    
      return (
        <Helmet>
          <title>{fullTitle}</title>
          {description && <meta name="description" content={description} />}
        </Helmet>
      );
    };
    
    export default PageTitle;
  