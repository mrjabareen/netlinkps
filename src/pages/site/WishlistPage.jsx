import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WishlistPage = () => {
  const { t, i18n } = useTranslation();
  const { wishlist, removeFromWishlist, addToCart, currency } = useAppContext();
  const { toast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: t('added_to_cart'),
      description: `${product.name[i18n.language]} ${t('has_been_added_to_cart')}.`,
    });
  };

  return (
    <>
      <PageTitle title={t('wishlist')} />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">{t('my_wishlist')}</h1>
            <p className="text-muted-foreground mt-2">{t('wishlist_subtitle')}</p>
          </header>

          {wishlist.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
              <h2 className="mt-6 text-xl font-semibold">{t('wishlist_empty')}</h2>
              <p className="mt-2 text-muted-foreground">{t('wishlist_empty_desc')}</p>
              <Button asChild className="mt-6">
                <Link to="/products">{t('discover_products')}</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <CardHeader className="p-0">
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          alt={product.name[i18n.language]}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                         src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <CardTitle className="text-lg font-semibold mb-2 h-12">{product.name[i18n.language]}</CardTitle>
                      <p className="text-2xl font-bold text-primary">
                        {currency.symbol}{product.price.toFixed(2)}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                      <Button className="w-full" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> {t('add_to_cart')}
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => removeFromWishlist(product.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> {t('remove')}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default WishlistPage;