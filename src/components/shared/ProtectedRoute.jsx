import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const AccessDenied = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title={t('access_denied')} />
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[calc(100vh-280px)]">
        <Lock className="h-24 w-24 text-destructive mb-6" />
        <h1 className="text-4xl font-bold mb-2">{t('access_denied')}</h1>
        <p className="text-lg text-muted-foreground mb-8">{t('access_denied_desc')}</p>
        <Button onClick={() => navigate(-1)}>{t('back_to_site')}</Button>
      </div>
    </>
  );
};

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { currentUser, hasPermission } = useAppContext();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;