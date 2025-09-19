# استخدام Node.js كصورة أساسية للبناء
FROM node:18-alpine AS builder

# تعيين مجلد العمل
WORKDIR /app

# نسخ ملفات package.json و package-lock.json
COPY package*.json ./

# تثبيت التبعيات
RUN npm ci

# نسخ باقي ملفات المشروع
COPY . .

# بناء التطبيق للإنتاج
RUN npm run build

# استخدام Nginx لتقديم الملفات الثابتة
FROM nginx:alpine

# نسخ ملفات البناء إلى مجلد Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# نسخ إعدادات Nginx البسيطة
COPY nginx.conf /etc/nginx/nginx.conf

# كشف المنفذ 80
EXPOSE 80

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]
