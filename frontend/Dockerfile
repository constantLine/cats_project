# Используем официальный образ Node.js
FROM node:18-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json .
RUN npm install

# Копируем остальные файлы
COPY tsconfig.json .
COPY frontend.ts .
COPY index.jade .

# Собираем TypeScript в JavaScript
RUN npm run build

# Устанавливаем nginx и tini
RUN apt-get update && apt-get install -y nginx tini

# Копируем конфигурацию nginx в контейнер
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем скрипт запуска
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Открываем порты
EXPOSE 80 3000

# Используем tini в качестве init системы
ENTRYPOINT ["/usr/bin/tini", "--"]

# Запускаем скрипт, который будет стартовать оба сервиса
CMD ["/start.sh"]
