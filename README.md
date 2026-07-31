# AI-квиз «Какой AI-помощник нужен именно Вам?»

Одностраничный квиз для Марии Скоробогатой: 6 вопросов, персональная рекомендация и заявка на консультацию.

## Ссылка на квиз

https://skorobogatay75-dotcom.github.io/Quiz-AI/

После пуша в `main` сайт обновляется автоматически через GitHub Pages.

## Запуск локально

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Что внутри

- React + Vite
- Тексты и вопросы в `src/data/`
- Логика рекомендаций в `src/lib/recommendations.js`
- Отправка заявки на `skorobogatay75@gmail.com` через FormSubmit
- Маска телефона, UTM, User-Agent, IP (если доступен)

## Важно про почту

При первой отправке FormSubmit пришлёт письмо на `skorobogatay75@gmail.com` для подтверждения адреса. После подтверждения заявки начнут приходить автоматически.
