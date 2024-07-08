# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы requirements.txt и backend.py в контейнер
COPY requirements.txt .
COPY backend.py .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install uwsgi

# Устанавливаем nginx и tini
RUN apt-get update && apt-get install -y nginx tini

# Копируем конфигурацию nginx в контейнер
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем конфигурацию uWSGI в контейнер
COPY uwsgi.ini /app/uwsgi.ini

# Копируем скрипт запуска
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Открываем порты
EXPOSE 80 

# Используем tini в качестве init системы
ENTRYPOINT ["/usr/bin/tini", "--"]

# Запускаем скрипт, который будет стартовать оба сервиса
CMD ["/start.sh","--socket", "/tmp/backend.sock"]
