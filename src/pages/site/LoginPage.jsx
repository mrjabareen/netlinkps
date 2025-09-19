import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAppContext, ROLES } from '@/contexts/AppContext';
import { Separator } from '@/components/ui/separator';
import { Chrome, Facebook } from 'lucide-react';

const LoginPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { login } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from?.pathname || "/account";

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      toast({
        title: t('login_successful'),
        description: `${t('welcome_back')}, ${user.username || user.name}!`,
      });
      if (user.role === ROLES.ADMIN || user.role === ROLES.MODERATOR) {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      toast({
        title: t('login_failed'),
        description: t('invalid_credentials'),
        variant: 'destructive',
      });
    }
  };

  const handleSocialLogin = () => {
    toast({
      title: t('feature_not_implemented_title'),
      description: t('feature_not_implemented'),
    });
  };

  return (
    <>
      <PageTitle title={t('login')} />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-280px)] bg-gradient-to-br from-background to-secondary/20">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-4xl w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block"
          >
            <h1 className="text-4xl font-bold mb-4">{t('welcome_back_long')}</h1>
            <p className="text-muted-foreground text-lg">{t('login_promo_text')}</p>
            <div className="mt-8">
              <img alt="Modern network technology illustration" class="w-full h-auto rounded-lg" src="https://images.unsplash.com/photo-1643101807331-21a4a3f081d5" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t('login_to_account')}</CardTitle>
                <CardDescription>{t('enter_credentials_below')}</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email_address')}</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('password')}</Label>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full">{t('login')}</Button>
                  <div className="relative w-full">
                    <Separator />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">{t('or_continue_with')}</span>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={handleSocialLogin}><Chrome className="mr-2 h-4 w-4" /> Google</Button>
                    <Button variant="outline" onClick={handleSocialLogin}><Facebook className="mr-2 h-4 w-4" /> Facebook</Button>
                  </div>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    {t('dont_have_account')}{' '}
                    <Link to="/register" className="underline text-primary hover:text-primary/80">
                      {t('register_now')}
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;