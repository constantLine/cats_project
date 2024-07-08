# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы requirements.txt и backend.py в контейнер
COPY requirements.txt .
COPY backend.py .

# Устанавливаем необходимые инструменты и библиотеки
RUN apt-get update && \
    apt-get install -y gcc libc-dev python3-dev build-essential && \
    apt-get install -y nginx tini && \
    apt-get install -y linux-headers-$(uname -r) && \
    apt-get clean

# Устанавливаем зависимости из requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Устанавливаем uWSGI
RUN pip install uwsgi

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
CMD ["/start.sh"]

