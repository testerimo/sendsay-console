# Sendsay Console

API-консоль состоит из формы авторизации и интерфейса консоли. Она используется, чтобы выполнять запросы к Sendsay API. [Подробности и задание](https://www.notion.so/Frontend-API-75cc5ecc28cd42f4a6f963e2dad88680)


## Демо-версия

Ссылка: https://testerimo.github.io/sendsay-console

### Тестовый аккаунт

* Логин: `x_1599157142912182`
* Сублогин: `x_1599157142912182`
* Пароль: `ge7Rekafoo`

### Валидные запросы для теста

```
Пинг без авторизации
{
  "action": "ping"
}

Вернет логин-саблогин, если авторизован
{
  "action": "pong"
}

Вернет некоторые настройки аккаунта
{
  "action": "sys.settings.get"
}
```

## Описание

### Страница авторизации

Данные об авторизации пользователя хранятся в `Cookies`. При запуске приложение проверяет ключ сессии в `Cookies`.

Валидация полей:

* Логин – обязательное поле, является email или логином – разрешены латинские буквы и символ подчеркивания `_`. Примеры:
  * Валидные: `some@email.com`, `x_1599157142912182`
  * Невалидные: `user name`, `пользователь`, `x-1599157142912182`
* Сублогин – опциональное поле, является логином (см. выше)
* Пароль – обязательное поле, разрешены все символы за исключением кириллических. Примеры:
  * Валидные: `aezakmi baguvix`, `stronG$99Password`
  * Невалидные: `пароль`, `loremипсум`

Отправить можно только валидные данные. Если данные для входа валидны, но сам вход не удался, появится красный алерт "Вход не вышел" с сообщением от сервера.

### Страница консоли

#### Заголовок консоли

Заголовок показывает логин и сублогин (если пользователь вошел с сублогином).

#### История запросов

В истории отображается последние 20 запросов. История хранится в `localStorage`. История удаляется при клике на кнопку справа от истории или при выходе из аккаунта.

История хранится в обратном хронологическом порядке (последние запросы в начале). Если запрос не уникальный, то он перемещается в начало.

##### Элемент запроса

При клике на запрос сохраненные данные подставляются в поля "Запрос" и "Ответ".

При клике на кнопку опций (3 точки) открывается дропдаун со следующими действиями:

* Выполнить — в поле запроса вставляется сохраненный запрос и выполняется
* Скопировать — запрос копируется в буфер обмена, показывается визуальный отклик
* Удалить — запрос удаляется из истории запросов

#### Поля запроса-ответа

Горизонтальный размер полей можно регулировать. Размеры полей хранятся в `localStorage`.

Если в качестве ответа пришла ошибка, поле "Ответ" выделяется красной рамкой.

#### Панель с действиями

На сервер отправляются только валидные JSON.

* Кнопка "Отправить" форматирует запрос и отправляет его на сервер.
* Кнопка «Форматировать» фоорматирует запрос.

Если форматирование не удалось (невалидные данные), то поле запроса выделяется красной рамкой.

### Доступные команды

Установить зависимости:
```
yarn install
```

Запустить проект:
```
yarn start
```

Собрать билд:
```
yarn build
```
