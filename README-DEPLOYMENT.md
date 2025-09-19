# دليل نشر NetLink على Portainer

## الملفات المضافة:
- `Dockerfile` - ملف بناء الحاوية
- `nginx.conf` - إعدادات الخادم الداخلي
- `.dockerignore` - ملفات مستثناة من البناء

## خطوات النشر:

### 1. في Portainer:
- اذهب إلى **Images** → **Build a new image**
- اختر **Upload** وارفع مجلد المشروع كملف ZIP
- اسم الصورة: `netlinkps:latest`
- اضغط **Build the image**

### 2. إنشاء الحاوية:
- اذهب إلى **Containers** → **Add container**
- اختر الصورة: `netlinkps:latest`
- اسم الحاوية: `netlinkps-app`
- Port mapping: `8080:80` (أو أي بورت تريده)
- اضغط **Deploy the container**

### 3. ربط مع Nginx الخارجي:
- الحاوية ستعمل على: `http://IP-CONTAINER:8080`
- في nginx الخارجي، أضف:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://IP-CONTAINER:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4. اختبار:
- تأكد من عمل الحاوية: `http://IP-CONTAINER:8080`
- تأكد من عمل الدومين الخارجي

## ملاحظات:
- الحاوية تحتوي على nginx داخلي لتقديم ملفات React
- يدعم React Router للصفحات المتعددة
- مضغوط ومحسن للأداء
