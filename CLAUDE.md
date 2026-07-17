# VetFlow — CLAUDE.md

## Что это за проект

VetFlow — веб-приложение для управления ветеринарной клиникой. Интерфейс на русском языке, ориентирован на рынок Узбекистана. Визуальный мотив: "медицинская карта животного" — папка-манилла, дырки-перфорации на боковой панели, резиновые штампы для статусов.

## Стек

- **React 19** + **TypeScript** (strict)
- **Vite 4** — сборка и dev-сервер (`npm run dev` → `http://localhost:5173`)
- **styled-components v6** — вся стилизация через него, тема подключена через `ThemeProvider`
- **React Router v6** — клиентская маршрутизация
- **TanStack Query v5** — кэширование и запросы к API
- **MSW v2** — мок-сервер для разработки (работает как Service Worker в браузере)
- **react-icons** — иконки (набор `MdXxx` из Material Design)

## Запуск

```bash
npm run dev      # dev-сервер на :5173
npm run build    # TypeScript-проверка + Vite-сборка
```

Тестов нет — проверка через браузер и `tsc`.

## Структура

```
src/
  types/index.ts          # единственный источник типов данных (Animal, Appointment, Doctor, ...)
  theme.ts                # design tokens (цвета, шрифты, скругления, отступы)
  GlobalStyle.ts          # глобальные CSS-сбросы
  App.tsx                 # маршруты
  main.tsx                # точка входа, ThemeProvider, QueryClient, MSW init

  api/                    # fetch-обёртки (сейчас бьют в /api/... → перехватывает MSW)
    client.ts             # базовый fetch с Authorization header
    animals.ts
    schedule.ts

  auth/
    AuthContext.tsx        # JWT в localStorage, login/logout, текущий User

  mocks/
    data.ts               # фиксированные данные (врачи, животные, визиты, приёмы)
    handlers.ts           # MSW-обработчики, in-memory мутации
    browser.ts            # setupWorker

  components/
    auth/ProtectedRoute.tsx
    layout/
      AppShell.tsx         # Sidebar + Topbar + <Outlet>
      Sidebar.tsx          # навигация, дырки-перфорации (Hole)
      Topbar.tsx           # поиск, аватар пользователя
    patient/
      NewVisitModal.tsx    # модалка добавления визита
    ui/
      Button.tsx
      Card.tsx
      IconCircle.tsx
      Input.tsx
      Stamp.tsx            # цветной штамп-бейдж (АЛЛЕРГИЯ и т.д.)

  pages/
    LoginPage.tsx
    PatientsListPage.tsx   # /patients — список ЭМК
    PatientDetailPage.tsx  # /patients/:id — карточка животного
    SchedulePage.tsx       # /schedule — сетка приёмов по врачам
```

## Страницы (реализованы)

| Маршрут | Название | Описание |
|---|---|---|
| `/schedule` | Расписание врачей | Колоночная сетка по врачам × временным слотам. Приёмы отображаются цветными блоками. |
| `/patients` | ЭМК (Электронная карта животного) | Список животных с поиском по имени и владельцу. |
| `/patients/:id` | Карточка животного | Данные животного, аллергии, витальные показатели, история визитов, кнопка добавить визит. |
| `/login` | Логин | Email + пароль, демо-аккаунты в `mocks/data.ts`. |

## Страницы (запланированы, `скоро` в сайдбаре)

| Маршрут | Название |
|---|---|
| `/booking` | Онлайн-запись |
| `/stock` | Склад |
| `/reminders` | Напоминания |
| `/analytics` | Аналитика |

## Дизайн-система

Все токены — в `src/theme.ts`. Доступны внутри styled-components через `p.theme.*`.

### Цвета

| Токен | Hex | Применение |
|---|---|---|
| `ink` | `#17241F` | Тёмные поверхности, сайдбар, основной текст |
| `scrub` | `#2F6F52` | Бренд, активные элементы, кнопка primary |
| `scrubDark` | `#1D4A37` | Тёмные панели |
| `sage` | `#E7F0E9` | Фон карточек |
| `kraft` | `#C98A2B` | Янтарь — ожидание, статус "Операция" |
| `clay` | `#B94A3E` | Красный — критично, аллергия, "Требует внимания" |
| `border` | `#DCE6DF` | Разделители |
| `claySoft` | `#FBEDEA` | Мягкий фон под clay-элементы |

### Статусы приёма (`AppointmentStatus`)

| Значение | Цвет | Лейбл |
|---|---|---|
| `confirmed` | scrub (зелёный) | Подтверждён |
| `surgery` | kraft (жёлтый) | Операция |
| `attention` | clay (красный) | Требует внимания |
| `done` | серый | Завершён |

### Шрифты

- Display: `Bitter` (serif) — логотип, заголовки
- Body: `Inter` (sans-serif) — весь UI
- Mono: `IBM Plex Mono` — коды, chartId

### Прочее

- `theme.space(n)` → `${n * 4}px` — базовый шаг отступов 4px
- Скругления: `sm=6px`, `md=10px`, `lg=16px`

## Правила разработки

- **Типы** — только из `src/types/index.ts`. Не дублируй, не создавай локальные интерфейсы для сущностей API.
- **Стили** — только styled-components. Инлайн-стили и CSS-модули не использовать.
- **Цвета** — только через `p.theme.color.*`. Хардкодить hex запрещено.
- **Иконки** — из `react-icons/md` (Material Design).
- **Запросы** — через `useQuery`/`useMutation` из TanStack Query, fetch-функции в `src/api/`.
- **MSW** — при добавлении нового эндпоинта сначала добавь handler в `mocks/handlers.ts` и данные в `mocks/data.ts`.
- **i18n** — интерфейс строго на русском языке.

## Демо-аккаунты

| Email | Пароль | Роль |
|---|---|---|
| `admin@vetflow.uz` | `demo` | admin (Гулноза) |
| `vet@vetflow.uz` | `demo` | vet (Др. Иванов) |
