#!/bin/bash

# Запускаем frontend
node dist/frontend.js &

# Запускаем nginx
nginx -g 'daemon off;'

# Ожидаем завершения процессов
wait -n

# Выходим с кодом завершения первого завершившегося процесса
exit $?

