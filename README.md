# VetFlow — веб-версия (MVP)

React + TypeScript + Rspack (через Rsbuild), стили на styled-components. Данные пока идут через
мок-API (MSW) — реальный бэкенд подключается за счёт замены `src/api/client.ts`,
без переписывания компонентов (см. «Контракт данных» ниже).

## Запуск

```bash
npm install
npm run dev
```

Откроется http://localhost:5173. Демо-вход: `admin@vetflow.uz` / `demo`
(см. `src/mocks/data.ts`).

## Структура

```
src/
  theme.ts              — цвета, шрифты, отступы (дизайн-токены)
  types/index.ts         — контракт данных: Animal, Doctor, Appointment...
  mocks/                 — MSW: seed-данные + обработчики /api/*
  api/                   — fetch-обёртка + React Query хуки
  auth/AuthContext.tsx    — простая сессия на localStorage + токен
  components/
    ui/                  — Button, Card, Input, Stamp (бейдж-«штамп»), IconCircle
    layout/              — Sidebar, Topbar, AppShell
    patient/             — NewVisitModal
  pages/
    LoginPage
    SchedulePage         — расписание врачей по дням
    PatientsListPage      — список животных с поиском
    PatientDetailPage     — карта животного (аллергии, показатели, история)
```

## Контракт данных

`src/types/index.ts` — единственный источник правды о форме данных. Мок-хендлеры
в `src/mocks/handlers.ts` возвращают данные именно этой формы. Когда бэкенд
будет готов, он должен отдавать те же поля — тогда неделя 3 (подключение
реального API) сведётся к отключению MSW и правке `PUBLIC_API_URL`, без правок
в компонентах.

Чтобы отключить моки и переключиться на реальный бэкенд:

1. Добавить `PUBLIC_API_URL=http://localhost:PORT/api` в `.env` (переменные
   клиенту видны только с префиксом `PUBLIC_` — так настроено в Rsbuild)
2. В `src/main.tsx` убрать вызов `enableMocking()` (или обернуть в
   `if (import.meta.env.DEV && import.meta.env.PUBLIC_USE_MOCKS)`)

## Что уже есть в MVP

Модули ЭМК и Расписание полностью кликабельны на моках. Остальные пункты
sidebar (Онлайн-запись, Склад, Напоминания, Аналитика) показаны, но
задизейблены с пометкой «скоро» — это следующая фаза после недели 4.

## Дизайн

Палитра и типографика — из `VetFlow_Screens.pptx` (папка Vetbook): тёмно-зелёный
скраб + янтарь + глиняно-красный, шрифты Bitter/Inter/IBM Plex Mono. Статусы
везде оформлены как повёрнутый «штамп»-бейдж (`components/ui/Stamp.tsx`) —
единый визуальный язык для «В наличии», «Подтверждён», «Активен» и т.д.

## Сборка

Конфиг — `rsbuild.config.ts`. Входная точка `src/main.tsx`, HTML-шаблон —
`index.html` в корне (без `<script>` — Rsbuild подставляет бандл сам). Порт
дев-сервера — 5173.

`vite.config.ts` в корне — мёртвый файл от исходного шаблона, ссылается на
удалённые пакеты `vite`/`@vitejs/plugin-react`. Можно удалить вручную вместе
с остальным мусором из прошлой уборки (`src/App.css`, `src/assets/`,
`public/icons.svg`, `dist/`).
