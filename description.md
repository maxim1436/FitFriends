Запуск проекта:
    Backend:
1. Переходим в директорию fit-friends-backend
2. Выполняем npm install
3. Выполняем ряд команд для настройки докера: cd apps -> cd users -> docker-compose up -d
4. Поднимаемся в директорию fit-friends-backend
5. Выполняем команду nx run fit-friends-backend:serve
6. Получаем подтверждение в консоли, проект запущен.
    Frontend:
1. Переходим в директорию fit-friends-frontend/project
2. Выполняем npm install
3. Выполняем npm start

Тестирование http запросов:
1. Переходим в директорию users (см. 3 пункт "Запуск прокта"), затем src -> app
2. Директория auth - создание и авторизация пользователя
3. Директория shop-user - редактирование, получение списка, подробная информация, друзья пользвателя, оповещения пользователя
3. Директория shop-training - функционал для тренировок
4. Директория shop-order - функционал заказов
5. Директория training-diary - функционал дневника тренировок
6. Директория personal-training - функционал персональных тренировок
7. Директория food-diary - функционал дневника питания
8. Директория comment - функционал комментариев

Юнит тесты:
1. Переходим в директорию fit-friends-backend
2. Для тестирования конкретного модуля выполняем команду 'npm test [имя файла].controller',
например, для тестирования функционала пользователя (shop-user) воспользоваться командой 'npm test shop-user.controller',
для функционала тренировок (shop-training) - 'npm test shop-training.controller'

Маршрут OpenApi: http://localhost:3333/spec
Маршрут FakeSmtp-сервера: http://localhost:1083
Маршрут Frontend: http://localhost:3000