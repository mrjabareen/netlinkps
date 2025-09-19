import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAppContext } from '@/contexts/AppContext';

const RegisterPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { register } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t('error'),
        description: t('passwords_do_not_match'),
        variant: 'destructive',
      });
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const result = register(userData);

    if (result.success) {
      toast({
        title: t('registration_successful'),
        description: `${t('welcome')}, ${result.user.name}!`,
      });
      navigate('/account');
    } else {
      toast({
        title: t('registration_failed'),
        description: t(result.message),
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <PageTitle title={t('register')} />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-280px)]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('create_account')}</CardTitle>
              <CardDescription>{t('join_us_today')}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('full_name')}</Label>
                  <Input id="name" type="text" placeholder="John Doe" required value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email_address')}</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone_number')}</Label>
                  <Input id="phone" type="tel" required value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">{t('whatsapp_number')}</Label>
                  <Input id="whatsapp" type="tel" value={formData.whatsapp} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{t('address')}</Label>
                  <Input id="address" type="text" required value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Input id="password" type="password" required value={formData.password} onChange={handleInputChange} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('confirm_password')}</Label>
                  <Input id="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleInputChange} />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">{t('register')}</Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  {t('already_have_account')}{' '}
                  <Link to="/login" className="underline text-primary hover:text-primary/80">
                    {t('login')}
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;