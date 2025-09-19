import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/use-toast';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, ShoppingCart, ListFilter } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProductsPage = () => {
  const { t } = useTranslation();
  const { products, currency, language, addToCart, addToWishlist, isItemInWishlist, getDisplayPrice, exchangeRates } = useAppContext();
  const { toast } = useToast();

  const categories = useMemo(() => [
    t('all_categories'),
    ...[...new Set(products.map(p => p.category))]
  ], [t, products]);

  const maxPriceInILS = useMemo(() => Math.max(...products.map(p => p.price), 0), [products]);
  
  const maxDisplayPrice = useMemo(() => getDisplayPrice(maxPriceInILS), [getDisplayPrice, maxPriceInILS]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [priceRange, setPriceRange] = useState([0, maxDisplayPrice]);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setPriceRange([0, Math.ceil(maxDisplayPrice)]);
  }, [maxDisplayPrice, currency]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: t('add_to_cart'),
      description: `${product.name[language]} ${t('has_been_added_to_cart')}`,
    });
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    toast({
      title: isItemInWishlist(product.id) ? t('removed_from_wishlist') : t('added_to_wishlist'),
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const displayPrice = getDisplayPrice(p.price);
      const inCategory = selectedCategory === t('all_categories') || p.category === selectedCategory;
      const inPriceRange = displayPrice >= priceRange[0] && displayPrice <= priceRange[1];
      return inCategory && inPriceRange;
    });

    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => getDisplayPrice(a.price) - getDisplayPrice(b.price));
        break;
      case 'price_desc':
        filtered.sort((a, b) => getDisplayPrice(b.price) - getDisplayPrice(a.price));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy, t, products, getDisplayPrice]);

  const getProductImage = (product) => {
    if (!product.images || product.images.length === 0) {
      return 'https://images.unsplash.com/photo-1646193186132-7976c1670e81';
    }
    return product.images[0];
  };

  return (
    <>
      <PageTitle title={t('products')} description="Browse our collection of high-quality tech products." />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 bg-card p-6 rounded-lg shadow-sm h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center"><ListFilter className="mr-2 h-6 w-6" /> {t('filters')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">{t('category')}</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">{t('price_range')}</h3>
                <Slider
                  value={priceRange}
                  max={Math.ceil(maxDisplayPrice)}
                  step={10}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>{currency.symbol}{priceRange[0]}</span>
                  <span>{currency.symbol}{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{selectedCategory}</h1>
              <Select onValueChange={setSortBy} defaultValue={sortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('sort_by')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t('sort_featured')}</SelectItem>
                  <SelectItem value="price_asc">{t('sort_price_asc')}</SelectItem>
                  <SelectItem value="price_desc">{t('sort_price_desc')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col group">
                    <Link to={`/product/${product.id}`} className="block">
                      <CardHeader className="p-0 relative">
                        <div className="aspect-square w-full overflow-hidden">
                          <img
                            alt={product.name[language]}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            src={getProductImage(product)}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-grow">
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <h3 className="font-semibold text-lg mt-1 h-12">{product.name[language]}</h3>
                        <p className="text-xl font-bold text-primary mt-2">{currency.symbol}{getDisplayPrice(product.price).toFixed(2)}</p>
                      </CardContent>
                    </Link>
                    <CardFooter className="p-4 flex gap-2">
                      <Button className="w-full" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> {t('add_to_cart')}
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleAddToWishlist(product)}>
                        <Heart className={`h-4 w-4 ${isItemInWishlist(product.id) ? 'fill-destructive text-destructive' : ''}`} />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;