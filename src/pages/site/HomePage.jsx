import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart, Zap, ShieldCheck, Users, Star } from 'lucide-react';
import { hotDeals } from '@/data/mockData';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/use-toast';
import CountdownTimer from '@/components/shared/CountdownTimer';
import PageTitle from '@/components/shared/PageTitle';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Editable from '@/components/shared/Editable';
const HomePage = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    currency,
    language,
    addToCart,
    addToWishlist,
    isItemInWishlist
  } = useAppContext();
  const {
    toast
  } = useToast();
  const handleAddToCart = deal => {
    addToCart(deal);
    toast({
      title: t('add_to_cart'),
      description: `${deal.name[language]} ${t('has_been_added_to_cart')}`
    });
  };
  const handleAddToWishlist = deal => {
    addToWishlist(deal);
    toast({
      title: isItemInWishlist(deal.id) ? t('removed_from_wishlist') : t('added_to_wishlist')
    });
  };
  const heroSlides = [{
    titleKey: 'hero_title_1',
    subtitleKey: 'hero_subtitle_1',
    ctaKey: 'hero_cta_1',
    link: '/internet-packages',
    image: <img alt="Abstract network visualization with glowing lines" src="https://images.unsplash.com/photo-1643101807331-21a4a3f081d5" />
  }, {
    titleKey: 'hero_title_2',
    subtitleKey: 'hero_subtitle_2',
    ctaKey: 'hero_cta_2',
    link: '/products',
    image: <img alt="Modern office with people working on laptops" src="https://images.unsplash.com/photo-1651009188116-bb5f80eaf6aa" />
  }, {
    titleKey: 'hero_title_3',
    subtitleKey: 'hero_subtitle_3',
    ctaKey: 'hero_cta_3',
    link: '/special-offers',
    image: <img alt="Fiber optic cables with glowing ends" src="https://images.unsplash.com/photo-1672133796636-69fdedf388d8" />
  }];
  const whyChooseUsItems = [{
    icon: Zap,
    titleKey: 'why_choose_us_1_title',
    descriptionKey: 'why_choose_us_1_desc'
  }, {
    icon: ShieldCheck,
    titleKey: 'why_choose_us_2_title',
    descriptionKey: 'why_choose_us_2_desc'
  }, {
    icon: Users,
    titleKey: 'why_choose_us_3_title',
    descriptionKey: 'why_choose_us_3_desc'
  }];
  const testimonials = [{
    name: 'Ahmad Mahmoud',
    roleKey: 'testimonial_1_role',
    textKey: 'testimonial_1_text',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  }, {
    name: 'Sara Khoury',
    roleKey: 'testimonial_2_role',
    textKey: 'testimonial_2_text',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  }, {
    name: 'Youssef Nader',
    roleKey: 'testimonial_3_role',
    textKey: 'testimonial_3_text',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
  }];
  return <>
      <PageTitle title={t('home')} description={t('hero_subtitle_1')} />
      <div className="space-y-16 md:space-y-24 pb-24">
        <section className="relative">
          <Carousel plugins={[Autoplay({
          delay: 5000,
          stopOnInteraction: true
        })]} className="w-full" opts={{
          loop: true,
          direction: i18n.dir(),
          duration: 30
        }}>
            <CarouselContent>
              {heroSlides.map((slide, index) => <CarouselItem key={index}>
                  <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <div className="absolute inset-0 w-full h-full">
                      {React.cloneElement(slide.image, {
                    className: "w-full h-full object-cover"
                  })}
                    </div>
                    <motion.div initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.8
                }} className="relative z-20 px-4">
                      <Editable as="h1" contentKey={slide.titleKey} className="text-4xl md:text-6xl font-bold tracking-tight">{t(slide.titleKey)}</Editable>
                      <Editable as="p" contentKey={slide.subtitleKey} className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">{t(slide.subtitleKey)}</Editable>
                      <Button asChild size="lg" className="mt-8">
                        <Link to={slide.link}>{t(slide.ctaKey)}</Link>
                      </Button>
                    </motion.div>
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex bg-white/20 hover:bg-white/30 border-none text-white" />
            <CarouselNext className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex bg-white/20 hover:bg-white/30 border-none text-white" />
          </Carousel>
        </section>

        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Editable as="h2" contentKey="hot_deals_title" className="text-3xl md:text-4xl font-bold">{t('hot_deals')}</Editable>
            <Editable as="p" contentKey="hot_deals_subtitle" className="text-muted-foreground mt-2">{t('dont_miss_out')}</Editable>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotDeals.map((deal, index) => <motion.div key={deal.id} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }}>
                <Card className="overflow-hidden h-full flex flex-col group">
                  <CardHeader className="p-0 relative overflow-hidden">
                    <img alt={deal.name[language]} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" src="https://horizons-cdn.hostinger.com/c3363b8c-9c1d-4f1a-b691-83b2cfa81a04/imgi_17_testimonial1-image-3-DNmdg.jpeg" />
                    <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                      - {Math.round((deal.oldPrice - deal.price) / deal.oldPrice * 100)}%
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="mb-2 text-xl">{deal.name[language]}</CardTitle>
                    <p className="text-muted-foreground mb-4 text-sm">{deal.description[language]}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{currency.symbol}{deal.price.toFixed(2)}</span>
                      <span className="text-lg line-through text-muted-foreground">{currency.symbol}{deal.oldPrice.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center gap-4 p-6 bg-secondary/50">
                    <p className="text-sm font-semibold text-primary">{t('deal_ends_in')}</p>
                    <CountdownTimer targetDate={deal.countdownTarget} />
                    <div className="w-full flex gap-2 mt-2">
                      <Button className="w-full" onClick={() => handleAddToCart(deal)}>
                        <ShoppingCart className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t('add_to_cart')}
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleAddToWishlist(deal)}>
                        <Heart className={`h-4 w-4 ${isItemInWishlist(deal.id) ? 'fill-destructive text-destructive' : ''}`} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>)}
          </div>
        </section>

        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Editable as="h2" contentKey="why_choose_us_title" className="text-3xl md:text-4xl font-bold">{t('why_choose_us')}</Editable>
              <Editable as="p" contentKey="why_choose_us_subtitle" className="text-muted-foreground mt-2">{t('why_choose_us_subtitle')}</Editable>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUsItems.map((item, index) => <div key={index} className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-4">
                      <item.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <Editable as="h3" contentKey={item.titleKey} className="text-xl font-bold mb-2">{t(item.titleKey)}</Editable>
                  <Editable as="p" contentKey={item.descriptionKey} className="text-muted-foreground">{t(item.descriptionKey)}</Editable>
                </div>)}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Editable as="h2" contentKey="testimonials_title" className="text-3xl md:text-4xl font-bold">{t('customer_testimonials')}</Editable>
            <Editable as="p" contentKey="testimonials_subtitle" className="text-muted-foreground mt-2">{t('what_our_clients_say')}</Editable>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="flex flex-col justify-between">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <Editable as="p" contentKey={testimonial.textKey} className="text-muted-foreground italic">"{t(testimonial.textKey)}"</Editable>
                </CardContent>
                <CardFooter className="p-6 bg-secondary/50 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{t(testimonial.roleKey)}</p>
                  </div>
                </CardFooter>
              </Card>)}
          </div>
        </section>
      </div>
    </>;
};
export default HomePage;