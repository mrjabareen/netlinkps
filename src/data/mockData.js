export const siteContent = {
  hero_title_1: { en: "Lightning-Fast Internet", ar: "إنترنت فائق السرعة" },
  hero_subtitle_1: { en: "Experience seamless connectivity for your home and business.", ar: "استمتع باتصال سلس لمنزلك وعملك." },
  hero_cta_1: { en: "Explore Packages", ar: "اكتشف الباقات" },
  hero_title_2: { en: "Top-Tier Tech Gear", ar: "أفضل الأجهزة التقنية" },
  hero_subtitle_2: { en: "Get the latest routers, cameras, and smart devices.", ar: "احصل على أحدث أجهزة الراوتر والكاميرات والأجهزة الذكية." },
  hero_cta_2: { en: "Shop Now", ar: "تسوق الآن" },
  hero_title_3: { en: "Unbeatable Special Offers", ar: "عروض خاصة لا تقاوم" },
  hero_subtitle_3: { en: "Don't miss out on our limited-time deals.", ar: "لا تفوت صفقاتنا المتاحة لفترة محدودة." },
  hero_cta_3: { en: "View Offers", ar: "شاهد العروض" },
  hot_deals_title: { en: "🔥 Hot Deals", ar: "🔥 عروض ساخنة" },
  hot_deals_subtitle: { en: "Don't miss out on these limited-time offers!", ar: "لا تفوت هذه العروض المتاحة لفترة محدودة!" },
  why_choose_us_title: { en: "Why Choose Us?", ar: "لماذا تختارنا؟" },
  why_choose_us_subtitle: { en: "We provide the best service and support in the industry.", ar: "نحن نقدم أفضل خدمة ودعم في هذا المجال." },
  why_choose_us_1_title: { en: "Blazing Fast Speed", ar: "سرعة فائقة" },
  why_choose_us_1_desc: { en: "Enjoy ultra-fast internet speeds for streaming, gaming, and more.", ar: "استمتع بسرعات إنترنت فائقة للمشاهدة والألعاب والمزيد." },
  why_choose_us_2_title: { en: "Reliable Connection", ar: "اتصال موثوق" },
  why_choose_us_2_desc: { en: "Our network is built for stability, ensuring you're always online.", ar: "شبكتنا مصممة للاستقرار، مما يضمن أنك متصل دائمًا." },
  why_choose_us_3_title: { en: "24/7 Customer Support", ar: "دعم فني 24/7" },
  why_choose_us_3_desc: { en: "Our expert team is always here to help you, day or night.", ar: "فريق الخبراء لدينا جاهز دائمًا لمساعدتك، ليلاً أو نهارًا." },
  testimonials_title: { en: "Customer Testimonials", ar: "شهادات العملاء" },
  testimonials_subtitle: { en: "See what our satisfied customers are saying about us.", ar: "شاهد ما يقوله عملاؤنا الراضون عنا." },
  testimonial_1_text: { en: "The best internet service I've ever had. The speed is incredible and it never goes down. Highly recommended!", ar: "أفضل خدمة إنترنت حصلت عليها على الإطلاق. السرعة لا تصدق ولا تنقطع أبدًا. موصى به بشدة!" },
  testimonial_2_text: { en: "NetLink has transformed our business operations. The reliable connection and great support are game-changers.", ar: "لقد غيرت نت لينك عملياتنا التجارية. الاتصال الموثوق والدعم الرائع يغيران قواعد اللعبة." },
  testimonial_3_text: { en: "I bought all my networking gear from their store. Great prices and high-quality products. A five-star experience!", ar: "اشتريت كل معدات الشبكات الخاصة بي من متجرهم. أسعار رائعة ومنتجات عالية الجودة. تجربة خمس نجوم!" },
};

export const hotDeals = [
  {
    id: 1,
    name: { en: "Super Fast 500Mbps", ar: "باقة 500 ميجابت الفائقة" },
    description: { en: "Unlimited data, free router, and zero installation fees.", ar: "بيانات غير محدودة، راوتر مجاني، وبدون رسوم تركيب." },
    price: 49.99,
    oldPrice: 69.99,
    image: "a high-speed internet modem with glowing lights",
    countdownTarget: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    name: { en: "4K Security Cam Bundle", ar: "حزمة كاميرات مراقبة 4K" },
    description: { en: "4 cameras, 1TB DVR, and mobile app access.", ar: "4 كاميرات، جهاز تسجيل 1 تيرابايت، ووصول عبر تطبيق الجوال." },
    price: 299.99,
    oldPrice: 399.99,
    image: "a set of modern 4K security cameras",
    countdownTarget: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    name: { en: "Gaming Laptop Pro", ar: "لابتوب الألعاب الاحترافي" },
    description: { en: "17-inch display, RTX 4080, 32GB RAM.", ar: "شاشة 17 بوصة، كرت شاشة RTX 4080، ذاكرة 32 جيجابايت." },
    price: 1899.99,
    oldPrice: 2299.99,
    image: "a powerful gaming laptop with RGB keyboard",
    countdownTarget: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const recentOrders = [
  { id: '#1256', customer: 'Ahmad Mahmoud', status: 'Completed', total: 150.00, date: '2025-09-17' },
  { id: '#1255', customer: 'Sara Khoury', status: 'Pending', total: 299.99, date: '2025-09-17' },
  { id: '#1254', customer: 'John Doe', status: 'Shipped', total: 49.99, date: '2025-09-16' },
  { id: '#1253', customer: 'Fatima Ali', status: 'Completed', total: 89.50, date: '2025-09-15' },
];

export const products = [
  { id: 101, name: { en: 'Gaming PC', ar: 'كمبيوتر ألعاب' }, description: { en: 'A high-performance gaming PC for the most demanding games.', ar: 'كمبيوتر ألعاب عالي الأداء لأكثر الألعاب تطلبًا.' }, category: 'Computers & Accessories', price: 4444, currency: 'ILS', stock: 15, images: ['https://images.unsplash.com/photo-1593640428252-1a5541a4a9af'] },
  { id: 102, name: { en: 'Wireless Mouse', ar: 'فأرة لاسلكية' }, description: { en: 'Ergonomic wireless mouse with long battery life.', ar: 'فأرة لاسلكية مريحة مع عمر بطارية طويل.' }, category: 'Computers & Accessories', price: 92, currency: 'ILS', stock: 120, images: ['https://images.unsplash.com/photo-1615663245652-8de3ab723a4a'] },
  { id: 103, name: { en: 'Dome Camera', ar: 'كاميرا قبة' }, description: { en: 'Full HD dome camera for indoor surveillance.', ar: 'كاميرا قبة عالية الدقة للمراقبة الداخلية.' }, category: 'Surveillance Cameras', price: 277, currency: 'ILS', stock: 50, images: ['https://images.unsplash.com/photo-1617316228999-39793b41533d'] },
  { id: 104, name: { en: 'Wi-Fi 6 Router', ar: 'راوتر واي فاي 6' }, description: { en: 'Next-gen Wi-Fi 6 router for faster speeds and more connected devices.', ar: 'راوتر واي فاي 6 من الجيل التالي لسرعات أعلى والمزيد من الأجهزة المتصلة.' }, category: 'Networking Devices', price: 333, currency: 'ILS', stock: 80, images: ['https://images.unsplash.com/photo-1602526431635-5c0b10b0f5a9'] },
  { id: 105, name: { en: 'Smart Watch', ar: 'ساعة ذكية' }, description: { en: 'Stay connected and track your fitness with this stylish smart watch.', ar: 'ابق على اتصال وتتبع لياقتك مع هذه الساعة الذكية الأنيقة.' }, category: 'Smart Devices', price: 737, currency: 'ILS', stock: 60, images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12'] },
  { id: 106, name: { en: 'Mechanical Keyboard', ar: 'لوحة مفاتيح ميكانيكية' }, description: { en: 'RGB mechanical keyboard for a superior typing and gaming experience.', ar: 'لوحة مفاتيح ميكانيكية بإضاءة RGB لتجربة كتابة وألعاب فائقة.' }, category: 'Computers & Accessories', price: 315, currency: 'ILS', stock: 75, images: ['https://images.unsplash.com/photo-1618384887924-3b36b8532502'] },
  { id: 107, name: { en: 'Bullet Camera', ar: 'كاميرا رصاصة' }, description: { en: 'Weatherproof outdoor bullet camera with night vision.', ar: 'كاميرا رصاصة خارجية مقاومة للعوامل الجوية مع رؤية ليلية.' }, category: 'Surveillance Cameras', price: 240, currency: 'ILS', stock: 40, images: ['https://images.unsplash.com/photo-1588392348656-234b4b7f873a'] },
  { id: 108, name: { en: 'Mesh Wi-Fi System', ar: 'نظام واي فاي شبكي' }, description: { en: 'Eliminate dead zones with this whole-home mesh Wi-Fi system.', ar: 'تخلص من المناطق الميتة مع نظام الواي فاي الشبكي هذا للمنزل بأكمله.' }, category: 'Networking Devices', price: 925, currency: 'ILS', stock: 30, images: ['https://images.unsplash.com/photo-1594223876649-35d342d26a43'] },
  { id: 109, name: { en: 'Smart Speaker', ar: 'مكبر صوت ذكي' }, description: { en: 'Voice-controlled smart speaker to play music, set alarms, and more.', ar: 'مكبر صوت ذكي يتم التحكم فيه بالصوت لتشغيل الموسيقى وضبط الإنذارات والمزيد.' }, category: 'Smart Devices', price: 181, currency: 'ILS', stock: 100, images: ['https://images.unsplash.com/photo-1593642702821-c84b36345d63'] },
];

export const internetPackages = [
  { id: 201, name: { en: 'Basic 50Mbps', ar: 'الأساسية 50 ميجا' }, speed: 50, data: 'Unlimited', price: 111, duration: { en: 'Monthly', ar: 'شهرياً' }, features: [{en: 'Free Router', ar: 'راوتر مجاني'}, {en: '24/7 Support', ar: 'دعم 24/7'}] },
  { id: 202, name: { en: 'Family 100Mbps', ar: 'العائلية 100 ميجا' }, speed: 100, data: 'Unlimited', price: 148, duration: { en: 'Monthly', ar: 'شهرياً' }, features: [{en: 'Free Router', ar: 'راوتر مجاني'}, {en: '24/7 Support', ar: 'دعم 24/7'}, {en: 'Parental Controls', ar: 'رقابة أبوية'}] },
  { id: 203, name: { en: 'Gamer 250Mbps', ar: 'لاعب 250 ميجا' }, speed: 250, data: 'Unlimited', price: 222, duration: { en: 'Monthly', ar: 'شهرياً' }, features: [{en: 'Gaming Optimized', ar: 'محسن للألعاب'}, {en: 'Low Latency', ar: 'زمن استجابة منخفض'}, {en: 'Free Router', ar: 'راوتر مجاني'}] },
  { id: 204, name: { en: 'Pro 500Mbps', ar: 'الاحترافية 500 ميجا' }, speed: 500, data: 'Unlimited', price: 296, duration: { en: 'Monthly', ar: 'شهرياً' }, features: [{en: 'For Businesses', ar: 'للشركات'}, {en: 'Static IP', ar: 'IP ثابت'}, {en: 'Priority Support', ar: 'دعم بأولوية'}] },
];

export const users = [
  { id: 1, name: 'Ahmad Mahmoud', email: 'ahmad@example.com', role: 'Subscriber', date: '2025-08-01', password: 'password123' },
  { id: 2, name: 'Sara Khoury', email: 'sara@example.com', role: 'Customer', date: '2025-08-05', password: 'password123' },
  { id: 3, name: 'Administrator', username: 'admin', email: 'info@netlinkps.com', role: 'Admin', date: '2025-01-01', password: 'Sniper.2591993' },
  { id: 4, name: 'John Doe', email: 'john.d@example.com', role: 'Agent', date: '2025-07-15', password: 'password123' },
  { id: 5, name: 'Fatima Ali', email: 'fatima.a@example.com', role: 'Investor', date: '2025-06-20', password: 'password123' },
  { id: 6, name: 'Moderator User', email: 'moderator@example.com', role: 'Moderator', date: '2025-05-10', password: 'password123' },
];

export const investmentData = {
  sharePrice: 150, // in ILS
  totalValue: 15000000, // in ILS
  totalShares: 100000,
  annualProfit: 2500000, // in ILS
  profitHistory: [
    { year: '2021', profit: 1200000 },
    { year: '2022', profit: 1500000 },
    { year: '2023', profit: 1800000 },
    { year: '2024', profit: 2200000 },
    { year: '2025', profit: 2500000 },
  ],
  summary: {
    en: "NetLink continues its strong growth trajectory, driven by network expansion and increased subscriber base. Our strategic investments in fiber-optic technology are paying off, resulting in higher revenue and improved profit margins. We are confident in our long-term strategy and expect to deliver even greater value to our shareholders in the coming years.",
    ar: "تواصل نت لينك مسار نموها القوي، مدفوعة بتوسع الشبكة وزيادة قاعدة المشتركين. استثماراتنا الاستراتيجية في تكنولوجيا الألياف البصرية تؤتي ثمارها، مما أدى إلى زيادة الإيرادات وتحسين هوامش الربح. نحن واثقون من استراتيجيتنا طويلة الأجل ونتوقع تقديم قيمة أكبر لمساهمينا في السنوات القادمة."
  }
};