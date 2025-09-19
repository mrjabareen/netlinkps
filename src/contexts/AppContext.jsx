import React, { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { products as initialProducts, users as initialUsers, internetPackages as initialPackages, siteContent as initialSiteContent, investmentData as initialInvestmentData } from '@/data/mockData';

const AppContext = createContext();

export const ROLES = {
  ADMIN: 'Admin',
  MODERATOR: 'Moderator',
  INVESTOR: 'Investor',
  AGENT: 'Agent',
  CUSTOMER: 'Customer',
  SUBSCRIBER: 'Subscriber',
};

export const PERMISSIONS = {
  VIEW_ADMIN_DASHBOARD: 'viewAdminDashboard',
  MANAGE_ORDERS: 'manageOrders',
  MANAGE_PRODUCTS: 'manageProducts',
  MANAGE_PACKAGES: 'managePackages',
  MANAGE_OFFERS: 'manageOffers',
  MANAGE_USERS: 'manageUsers',
  MANAGE_INVESTORS_DATA: 'manageInvestorsData',
  VIEW_REPORTS: 'viewReports',
  MANAGE_EXCHANGE_RATES: 'manageExchangeRates',
  MANAGE_PERMISSIONS: 'managePermissions',
  MANAGE_BACKUP: 'manageBackup',
  VIEW_INVESTORS_PAGE: 'viewInvestorsPage',
  VIEW_AGENTS_PAGE: 'viewAgentsPage',
  VIEW_TOWER_HOSTS_PAGE: 'viewTowerHostsPage',
};

const initialPermissions = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS).reduce((acc, perm) => ({ ...acc, [perm]: true }), {}),
  [ROLES.MODERATOR]: {
    [PERMISSIONS.VIEW_ADMIN_DASHBOARD]: true,
    [PERMISSIONS.MANAGE_ORDERS]: true,
    [PERMISSIONS.MANAGE_PRODUCTS]: true,
    [PERMISSIONS.MANAGE_PACKAGES]: true,
    [PERMISSIONS.MANAGE_OFFERS]: true,
    [PERMISSIONS.MANAGE_INVESTORS_DATA]: true,
    [PERMISSIONS.VIEW_REPORTS]: true,
    [PERMISSIONS.VIEW_INVESTORS_PAGE]: true,
    [PERMISSIONS.VIEW_AGENTS_PAGE]: true,
    [PERMISSIONS.VIEW_TOWER_HOSTS_PAGE]: true,
  },
  [ROLES.INVESTOR]: {
    [PERMISSIONS.VIEW_INVESTORS_PAGE]: true,
  },
  [ROLES.AGENT]: {
    [PERMISSIONS.VIEW_AGENTS_PAGE]: true,
  },
  [ROLES.CUSTOMER]: {},
  [ROLES.SUBSCRIBER]: {},
};


const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export function AppProvider({ children }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useLocalStorage('language', 'ar');
  
  const [products, setProducts] = useLocalStorage('products', initialProducts);
  const [users, setUsers] = useLocalStorage('users', initialUsers);
  const [packages, setPackages] = useLocalStorage('packages', initialPackages);
  const [cart, setCart] = useLocalStorage('cart', []);
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const [orders, setOrders] = useLocalStorage('orders', []);
  const [siteContent, setSiteContent] = useLocalStorage('siteContent', initialSiteContent);
  const [investmentData, setInvestmentData] = useLocalStorage('investmentData', initialInvestmentData);
  const [isLiveEditMode, setIsLiveEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [permissions, setPermissions] = useLocalStorage('permissions', initialPermissions);

  const [exchangeRates, setExchangeRates] = useLocalStorage('exchangeRates', {
    ILS: 1,
    USD: 0.27,
    EUR: 0.25,
    JOD: 0.19,
  });

  const currencies = [
    { code: 'ILS', symbol: '₪' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'JOD', symbol: 'JD' },
  ];

  const [currency, setCurrency] = useLocalStorage('currency', currencies[0]);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const updatePermissions = (newPermissions) => {
    setPermissions(newPermissions);
  };

  const updateExchangeRates = (newRates) => {
    setExchangeRates(prev => ({ ...prev, ...newRates }));
  };

  const updateInvestmentData = (newData) => {
    setInvestmentData(prev => ({ ...prev, ...newData }));
  };

  const convertPrice = useCallback((priceInILS, targetCurrencyCode) => {
    const rate = exchangeRates[targetCurrencyCode];
    if (!rate) return priceInILS;
    return priceInILS * rate;
  }, [exchangeRates]);

  const getDisplayPrice = useCallback((priceInILS) => {
    return convertPrice(priceInILS, currency.code);
  }, [currency, convertPrice]);

  const login = (usernameOrEmail, password) => {
    const user = users.find(u => (u.email === usernameOrEmail || u.username === usernameOrEmail));
    if (user && user.password === password) {
      setCurrentUser(user);
      return user;
    }
    if ((usernameOrEmail === 'admin' || usernameOrEmail === 'info@netlinkps.com') && password === 'Sniper.2591993') {
      const adminUser = users.find(u => u.role === ROLES.ADMIN);
      if (adminUser) {
        setCurrentUser(adminUser);
        return adminUser;
      }
    }
    return null;
  };

  const register = (userData) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'email_exists' };
    }
    const newUser = {
      id: Date.now(),
      ...userData,
      role: ROLES.SUBSCRIBER,
      date: new Date().toISOString().split('T')[0],
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLiveEditMode(false);
  };

  const hasPermission = useCallback((requiredPermissions) => {
    if (!currentUser) return false;
    if (currentUser.role === ROLES.ADMIN) return true;
    const userPermissions = permissions[currentUser.role] || {};
    if (Array.isArray(requiredPermissions)) {
      return requiredPermissions.every(perm => userPermissions[perm]);
    }
    return !!userPermissions[requiredPermissions];
  }, [currentUser, permissions]);

  const isAdmin = useMemo(() => currentUser?.role === ROLES.ADMIN, [currentUser]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const changeCurrency = (currencyCode) => {
    const newCurrency = currencies.find(c => c.code === currencyCode);
    if (newCurrency) {
      setCurrency(newCurrency);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
        const existingProduct = prevCart.find(item => item.id === product.id);
        if (existingProduct) {
            return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
        }
        return [...prevCart, { ...product, quantity }];
    });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = useMemo(() => {
    const totalInILS = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return getDisplayPrice(totalInILS);
  }, [cart, getDisplayPrice]);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      ...orderDetails,
      id: `#${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      status: 'Pending',
      userId: currentUser.id,
      customer: currentUser.name,
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders => prevOrders.map(order => order.id === orderId ? { ...order, status } : order));
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.find(item => item.id === product.id)) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const isItemInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const addProduct = (product) => {
    const newProduct = { 
      ...product, 
      id: Date.now(),
      price: parseFloat(product.price),
      currency: 'ILS',
      images: Array.isArray(product.images) ? product.images.filter(img => img.trim() !== '') : []
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    const newUpdatedProduct = {
      ...updatedProduct,
      price: parseFloat(updatedProduct.price),
      currency: 'ILS',
      images: Array.isArray(updatedProduct.images) ? updatedProduct.images.filter(img => img.trim() !== '') : []
    }
    setProducts(prev => prev.map(p => p.id === newUpdatedProduct.id ? newUpdatedProduct : p));
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addPackage = (pkg) => {
    const newPackage = { ...pkg, id: Date.now(), price: parseFloat(pkg.price) };
    setPackages(prev => [...prev, newPackage]);
  };

  const updatePackage = (updatedPackage) => {
    const newUpdatedPackage = { ...updatedPackage, price: parseFloat(updatedPackage.price) };
    setPackages(prev => prev.map(p => p.id === newUpdatedPackage.id ? newUpdatedPackage : p));
  };

  const deletePackage = (packageId) => {
    setPackages(prev => prev.filter(p => p.id !== packageId));
  };

  const addUser = (user) => {
    setUsers(prev => [...prev, { ...user, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
  };

  const updateUser = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };
  
  const updateCurrentUser = (updatedData) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    updateUser(updatedUser);
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const toggleLiveEditMode = () => {
    if (isAdmin) {
      setIsLiveEditMode(prev => !prev);
    }
  };

  const updateSiteContent = (key, value) => {
    setSiteContent(prev => ({
      ...prev,
      [key]: { ...prev[key], [language]: value }
    }));
  };

  const value = useMemo(() => ({
    language,
    changeLanguage,
    i18n,
    currency,
    changeCurrency,
    currencies,
    exchangeRates,
    updateExchangeRates,
    getDisplayPrice,
    cart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    orders,
    placeOrder,
    updateOrderStatus,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    users,
    addUser,
    updateUser,
    updateCurrentUser,
    deleteUser,
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    siteContent,
    investmentData,
    updateInvestmentData,
    isLiveEditMode,
    toggleLiveEditMode,
    updateSiteContent,
    currentUser,
    login,
    register,
    logout,
    isAdmin,
    hasPermission,
    permissions,
    updatePermissions,
  }), [language, i18n, currency, cart, wishlist, products, users, packages, siteContent, investmentData, isLiveEditMode, currentUser, isAdmin, cartSubtotal, orders, getDisplayPrice, exchangeRates, hasPermission, permissions]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}