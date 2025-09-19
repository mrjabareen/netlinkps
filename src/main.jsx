
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from '@/App';
    import '@/index.css';
    import '@/i18n';
    import { AppProvider } from '@/contexts/AppContext';
    import { HelmetProvider } from 'react-helmet-async';
    
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <HelmetProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </HelmetProvider>
      </React.StrictMode>
    );
  