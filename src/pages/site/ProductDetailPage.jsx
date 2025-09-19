import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/use-toast';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { t, i18n } = useTranslation();
  const { products, currency, language, addToCart, addToWishlist, isItemInWishlist, getDisplayPrice } = useAppContext();
  const { toast } = useToast();

  const product = products.find(p => p.id.toString() === productId);
  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const images = useMemo(() => {
    if (!product || !product.images || product.images.length === 0) {
      return ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'];
    }
    return product.images;
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: t('add_to_cart'),
      description: `${quantity} x ${product.name[language]} ${t('has_been_added_to_cart')}`,
    });
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast({
      title: isItemInWishlist(product.id) ? t('removed_from_wishlist') : t('added_to_wishlist'),
    });
  };

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">{t('product_not_found')}</h1>
        <Button asChild className="mt-4">
          <Link to="/products">{t('back_to_shop')}</Link>
        </Button>
      </div>
    );
  }

  const mainImage = images[mainImageIndex];

  const nextImage = () => setMainImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setMainImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const description = product.description?.[language] || '';
  const title = product.name?.[language] || '';
  const displayPrice = getDisplayPrice(product.price);

  return (
    <>
      <PageTitle title={title} description={description} />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <Card className="overflow-hidden relative group">
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  alt={title}
                  className="w-full h-auto aspect-square object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {images.length > 1 && (
                  <>
                    <Button onClick={prevImage} variant="outline" size="icon" className="absolute top-1/2 left-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button onClick={nextImage} variant="outline" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </Card>
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((img, index) => (
                    <button key={index} onClick={() => setMainImageIndex(index)} className={`rounded-lg overflow-hidden border-2 ${mainImageIndex === index ? 'border-primary' : 'border-transparent'}`}>
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full aspect-square object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <Badge variant="secondary" className="w-fit mb-2">{product.category}</Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-3xl font-bold text-primary mb-6">{currency.symbol}{displayPrice.toFixed(2)}</p>
              
              {description && (
                <div className="prose prose-lg text-muted-foreground mb-8" dir={i18n.dir()}>
                  <p>{description}</p>
                </div>
              )}

              <Separator className="my-6" />

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-16 text-center"
                  />
                  <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{t('stock')}: {product.stock}</p>
              </div>

              <div className="flex gap-2">
                <Button size="lg" className="flex-grow" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> {t('add_to_cart')}
                </Button>
                <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
                  <Heart className={`h-5 w-5 ${isItemInWishlist(product.id) ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProductDetailPage;