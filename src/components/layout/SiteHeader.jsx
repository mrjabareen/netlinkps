import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext, ROLES } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Globe, DollarSign, Heart, ShoppingCart, User, LayoutDashboard, LogIn, UserPlus, Menu, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from "@/lib/utils";

const SiteHeader = () => {
  const { t, i18n } = useTranslation();
  const { language, changeLanguage, currency, changeCurrency, currencies, cart, wishlist, currentUser, hasPermission, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const companyLinks = [
    { to: '/about-us', label: t('about_us') },
    { to: '/contact', label: t('contact_us') },
    { to: '/services', label: t('services') },
  ];

  const shopLinks = [
    { to: '/products', label: t('products') },
    { to: '/internet-packages', label: t('internet_packages') },
    { to: '/special-offers', label: t('special_offers') },
  ];

  const portalLinks = [
    { to: '/investors', label: t('investors_area'), allowedRoles: [ROLES.ADMIN, ROLES.MODERATOR, ROLES.INVESTOR] },
    { to: '/agents', label: t('agents_area'), allowedRoles: [ROLES.ADMIN, ROLES.MODERATOR, ROLES.AGENT] },
    { to: '/tower-hosts', label: t('tower_hosts_area'), allowedRoles: [ROLES.ADMIN, ROLES.MODERATOR] },
  ].filter(link => hasPermission(link.allowedRoles));

  const NavContent = ({ isMobile = false }) => (
    <>
      <NavLink to="/" className={({ isActive }) => `font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'} ${isMobile ? 'block py-2' : ''}`}>{t('home')}</NavLink>
      
      {isMobile ? (
        <>
          <p className="font-bold mt-4">{t('company')}</p>
          {companyLinks.map(link => <NavLink key={link.to} to={link.to} className="block py-2 text-muted-foreground hover:text-primary">{link.label}</NavLink>)}
          <p className="font-bold mt-4">{t('shop')}</p>
          {shopLinks.map(link => <NavLink key={link.to} to={link.to} className="block py-2 text-muted-foreground hover:text-primary">{link.label}</NavLink>)}
          {portalLinks.length > 0 && <p className="font-bold mt-4">{t('portals')}</p>}
          {portalLinks.map(link => <NavLink key={link.to} to={link.to} className="block py-2 text-muted-foreground hover:text-primary">{link.label}</NavLink>)}
        </>
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('company')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[200px] lg:w-[250px]">
                  {companyLinks.map((component) => (
                    <ListItem key={component.label} to={component.to} title={component.label} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('shop')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[200px] lg:w-[250px]">
                  {shopLinks.map((component) => (
                    <ListItem key={component.label} to={component.to} title={component.label} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {portalLinks.length > 0 && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('portals')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[200px] lg:w-[250px]">
                    {portalLinks.map((component) => (
                      <ListItem key={component.label} to={component.to} title={component.label} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
               <Link to="/support">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('support')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </>
  );

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <img alt="NetLink Logo" class="h-8 w-auto" src="https://images.unsplash.com/photo-1683201681334-f25eb7658958" />
            <span className="text-2xl font-bold text-primary">NetLink</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">
            <NavContent />
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => changeLanguage('en')} disabled={language === 'en'}>English</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => changeLanguage('ar')} disabled={language === 'ar'}>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <DollarSign className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {currencies.map(c => (
                  <DropdownMenuItem key={c.code} onSelect={() => changeCurrency(c.code)} disabled={currency.code === c.code}>
                    {c.code} ({c.symbol})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{wishlist.length}</span>
                )}
              </Link>
            </Button>

            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{cart.length}</span>
                )}
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={i18n.dir() === 'rtl' ? 'start' : 'end'}>
                {currentUser ? (
                  <>
                    <DropdownMenuItem asChild><Link to="/account" className="flex items-center"><User className="ltr:mr-2 rtl:ml-2 h-4 w-4" />{t('my_account')}</Link></DropdownMenuItem>
                    {hasPermission([ROLES.ADMIN, ROLES.MODERATOR]) && <DropdownMenuItem asChild><Link to="/admin" className="flex items-center"><LayoutDashboard className="ltr:mr-2 rtl:ml-2 h-4 w-4" />{t('dashboard')}</Link></DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center text-destructive"><LogOut className="ltr:mr-2 rtl:ml-2 h-4 w-4" />{t('logout')}</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild><Link to="/login" className="flex items-center"><LogIn className="ltr:mr-2 rtl:ml-2 h-4 w-4" />{t('login')}</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/register" className="flex items-center"><UserPlus className="ltr:mr-2 rtl:ml-2 h-4 w-4" />{t('register')}</Link></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side={i18n.dir() === 'rtl' ? 'left' : 'right'}>
                  <nav className="grid gap-2 text-lg font-medium mt-8">
                    <NavContent isMobile={true} />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef(({ className, title, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default SiteHeader;