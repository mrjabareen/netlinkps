import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Package, Wifi, Tag, Users, HardDrive, BarChart, ArrowLeft, LogOut, ShoppingCart, DollarSign, Briefcase, ShieldCheck } from 'lucide-react';
import { useAppContext, PERMISSIONS } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const AdminSidebar = () => {
  const { t } = useTranslation();
  const { logout, hasPermission } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinks = [
    { to: '/admin', icon: LayoutDashboard, label: t('admin_dashboard'), permission: PERMISSIONS.VIEW_ADMIN_DASHBOARD },
    { to: '/admin/orders', icon: ShoppingCart, label: t('admin_orders'), permission: PERMISSIONS.MANAGE_ORDERS },
    { to: '/admin/products', icon: Package, label: t('admin_products'), permission: PERMISSIONS.MANAGE_PRODUCTS },
    { to: '/admin/packages', icon: Wifi, label: t('admin_packages'), permission: PERMISSIONS.MANAGE_PACKAGES },
    { to: '/admin/offers', icon: Tag, label: t('admin_offers'), permission: PERMISSIONS.MANAGE_OFFERS },
    { to: '/admin/users', icon: Users, label: t('admin_users'), permission: PERMISSIONS.MANAGE_USERS },
    { to: '/admin/investors', icon: Briefcase, label: t('admin_investors'), permission: PERMISSIONS.MANAGE_INVESTORS_DATA },
    { to: '/admin/reports', icon: BarChart, label: t('admin_reports'), permission: PERMISSIONS.VIEW_REPORTS },
    { to: '/admin/settings', icon: DollarSign, label: t('exchange_rates'), permission: PERMISSIONS.MANAGE_EXCHANGE_RATES },
    { to: '/admin/permissions', icon: ShieldCheck, label: t('admin_permissions'), permission: PERMISSIONS.MANAGE_PERMISSIONS },
    { to: '/admin/backup', icon: HardDrive, label: t('admin_backup'), permission: PERMISSIONS.MANAGE_BACKUP },
  ];

  const availableNavLinks = navLinks.filter(link => hasPermission(link.permission));

  return (
    <div className="flex flex-col w-64 bg-secondary text-secondary-foreground">
      <div className="flex items-center justify-center h-20 border-b">
        <Link to="/" className="flex items-center gap-2">
          <img alt="NetLink Logo" class="h-8 w-auto" src="https://images.unsplash.com/photo-1683201681334-f25eb7658958" />
          <span className="text-2xl font-bold text-primary">NetLink</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-col px-4 py-4">
          {availableNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-2 text-lg rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-primary/5 hover:text-primary/80'
                }`
              }
            >
              <link.icon className="w-6 h-6" />
              <span className="mx-4 font-medium">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t space-y-2">
        <Link to="/" className="flex items-center justify-center w-full px-4 py-2 text-lg font-medium text-center text-primary bg-primary/10 rounded-lg hover:bg-primary/20">
          <ArrowLeft className="w-6 h-6 mx-2" />
          {t('back_to_site')}
        </Link>
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          <LogOut className="w-5 h-5 mx-2" />
          {t('logout')}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;