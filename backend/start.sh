#!/bin/bash

# Запускаем uWSGI с использованием конфигурации
uwsgi --ini /app/uwsgi.ini &

# Ожидаем, пока backend начнет слушать на сокете
while [ ! -S "$SOCKET_FILE" ]; do
    sleep 1
done

# Запускаем nginx
nginx -g 'daemon off;'

# Ожидаем завершения процессов
wait -n

# Выходим с кодом завершения первого завершившегося процесса
exit $?
