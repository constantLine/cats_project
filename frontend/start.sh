#!/bin/bash

# Определяем сокет
SOCKET_FILE=/tmp/frontend.sock

# Удаляем сокет, если он уже существует
if [ -S "$SOCKET_FILE" ]; then
    rm $SOCKET_FILE
fi

# Запускаем frontend с использованием сокета
node dist/frontend.js --socket $SOCKET_FILE &

# Ожидаем, пока frontend начнет слушать на сокете
while [ ! -S "$SOCKET_FILE" ]; do
    sleep 1
done

# Устанавливаем права доступа на сокет
chmod 666 $SOCKET_FILE

# Запускаем nginx
nginx -g 'daemon off;'

# Ожидаем завершения процессов
wait -n

# Выходим с кодом завершения первого завершившегося процесса
exit $?

