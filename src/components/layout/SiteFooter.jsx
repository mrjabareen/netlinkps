
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const SiteFooter = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast({
      title: t('feature_not_implemented'),
    });
  };

  const footerLinks = {
    company: [
      { label: t('about_us'), to: '/about-us' },
      { label: t('services'), to: '/services' },
      { label: t('contact_us'), to: '/contact' },
    ],
    shop: [
      { label: t('products'), to: '/products' },
      { label: t('internet_packages'), to: '/internet-packages' },
      { label: t('special_offers'), to: '/special-offers' },
    ],
    legal: [
      { label: t('privacy_policy'), to: '/policies' },
      { label: t('terms_of_service'), to: '/policies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t('newsletter_title')}</h3>
            <p className="text-muted-foreground mb-4">{t('newsletter_subtitle')}</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input type="email" placeholder={t('email_placeholder')} required />
              <Button type="submit">{t('subscribe')}</Button>
            </form>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">{t('company')}</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('shop')}</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('legal')}</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} NetLink. {t('rights_reserved')}
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="text-sm font-semibold">{t('follow_us')}:</p>
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
