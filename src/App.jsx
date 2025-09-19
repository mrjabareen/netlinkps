import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppContext, ROLES, PERMISSIONS } from '@/contexts/AppContext';
import { Toaster } from '@/components/ui/toaster';

import SiteLayout from '@/components/layout/SiteLayout';
import HomePage from '@/pages/site/HomePage';
import AboutUsPage from '@/pages/site/AboutUsPage';
import ServicesPage from '@/pages/site/ServicesPage';
import ProductsPage from '@/pages/site/ProductsPage';
import ProductDetailPage from '@/pages/site/ProductDetailPage';
import InternetPackagesPage from '@/pages/site/InternetPackagesPage';
import SpecialOffersPage from '@/pages/site/SpecialOffersPage';
import InvestorsPage from '@/pages/site/InvestorsPage';
import AgentsPage from '@/pages/site/AgentsPage';
import TowerHostsPage from '@/pages/site/TowerHostsPage';
import SupportPage from '@/pages/site/SupportPage';
import ContactPage from '@/pages/site/ContactPage';
import CartPage from '@/pages/site/CartPage';
import WishlistPage from '@/pages/site/WishlistPage';
import CheckoutPage from '@/pages/site/CheckoutPage';
import PoliciesPage from '@/pages/site/PoliciesPage';
import AccountPage from '@/pages/site/AccountPage';
import LoginPage from '@/pages/site/LoginPage';
import RegisterPage from '@/pages/site/RegisterPage';
import OrderDetailPage from '@/pages/site/OrderDetailPage';

import AdminLayout from '@/components/layout/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminPackages from '@/pages/admin/AdminPackages';
import AdminOffers from '@/pages/admin/AdminOffers';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminBackup from '@/pages/admin/AdminBackup';
import AdminReports from '@/pages/admin/AdminReports';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminInvestors from '@/pages/admin/AdminInvestors';
import AdminPermissions from '@/pages/admin/AdminPermissions';
import ProtectedRoute from '@/components/shared/ProtectedRoute';

function App() {
  const { language, i18n } = useAppContext();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = i18n.dir(language);
    document.body.className = `lang-${language}`;
  }, [language, i18n]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about-us" element={<AboutUsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/:productId" element={<ProductDetailPage />} />
            <Route path="internet-packages" element={<InternetPackagesPage />} />
            <Route path="special-offers" element={<SpecialOffersPage />} />
            <Route path="investors" element={<ProtectedRoute requiredPermission={PERMISSIONS.VIEW_INVESTORS_PAGE}><InvestorsPage /></ProtectedRoute>} />
            <Route path="agents" element={<ProtectedRoute requiredPermission={PERMISSIONS.VIEW_AGENTS_PAGE}><AgentsPage /></ProtectedRoute>} />
            <Route path="tower-hosts" element={<ProtectedRoute requiredPermission={PERMISSIONS.VIEW_TOWER_HOSTS_PAGE}><TowerHostsPage /></ProtectedRoute>} />
            <Route path="support" element={<SupportPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="policies" element={<PoliciesPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="order/:orderId" element={<OrderDetailPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute requiredPermission={PERMISSIONS.VIEW_ADMIN_DASHBOARD}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_ORDERS}><AdminOrders /></ProtectedRoute>} />
            <Route path="orders/:orderId" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_ORDERS}><OrderDetailPage /></ProtectedRoute>} />
            <Route path="products" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_PRODUCTS}><AdminProducts /></ProtectedRoute>} />
            <Route path="packages" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_PACKAGES}><AdminPackages /></ProtectedRoute>} />
            <Route path="offers" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_OFFERS}><AdminOffers /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_USERS}><AdminUsers /></ProtectedRoute>} />
            <Route path="backup" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_BACKUP}><AdminBackup /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute requiredPermission={PERMISSIONS.VIEW_REPORTS}><AdminReports /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_EXCHANGE_RATES}><AdminSettings /></ProtectedRoute>} />
            <Route path="investors" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_INVESTORS_DATA}><AdminInvestors /></ProtectedRoute>} />
            <Route path="permissions" element={<ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_PERMISSIONS}><AdminPermissions /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;