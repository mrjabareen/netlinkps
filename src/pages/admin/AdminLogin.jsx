import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import PageTitle from '@/components/shared/PageTitle';

const AdminLogin = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { login, isAdmin } = useAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(username, password);
    if (user && user.role === 'Admin') {
      toast({
        title: t('login_successful'),
        description: `${t('welcome_back')}, ${user.username}!`,
      });
      navigate('/admin');
    } else {
      toast({
        title: t('login_failed'),
        description: t('invalid_credentials_admin'),
        variant: 'destructive',
      });
    }
  };

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <PageTitle title={t('admin_login')} />
      <div className="min-h-screen flex items-center justify-center bg-secondary/50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('admin_login')}</CardTitle>
              <CardDescription>{t('admin_login_prompt')}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">{t('username_or_email')}</Label>
                  <Input id="username" placeholder="admin or info@netlinkps.com" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">{t('login')}</Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;