# ใช้ nginx เป็น base image
FROM nginx:alpine

# คัดลอกไฟล์ index.html ไปที่ directory /usr/share/nginx/html/
COPY index.html /usr/share/nginx/html/

# คัดลอกไฟล์ frontend.js ที่อยู่ในโฟลเดอร์ js ไปที่ directory /usr/share/nginx/html/js
COPY js/frontend.js /usr/share/nginx/html/js/

# คัดลอกไฟล์คอนฟิก nginx ไปที่ directory /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# เปิด port 80 สำหรับการให้บริการเว็บแอปพลิเคชัน
EXPOSE 40
