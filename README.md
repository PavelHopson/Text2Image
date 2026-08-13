# Text2Image Studio

[![Demo](https://img.shields.io/badge/Demo-text2image--studio.pages.dev-6d28d9?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://text2image-studio.pages.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Gemini](https://img.shields.io/badge/Gemini-Image_Generation-4285F4?style=flat-square&logo=google-gemini)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Text2Image Studio — AI-студия для генерации изображений по тексту с prompt enhancement, каталогом шаблонов, локальной историей и переключением провайдеров.

## Что умеет

- Генерация изображения по текстовому описанию
- Улучшение промпта перед генерацией
- 10 визуальных стилей: photo, anime, watercolor, cyberpunk, pixel-art и другие
- 5 соотношений сторон
- Каталог готовых prompt templates
- История генераций с локальным сохранением в браузере
- Настройка AI-провайдера и модели без отдельного backend
- Export metadata-only `eclipse.media-asset.v1` passport for local validation in Eclipse Media

## Product radar

Источник: [Eclipse Library · July 2026 project integration](https://library.eclipse-forge.ru/#guide/july-2026-project-integration).

| Reference | Как использовать |
|-----------|------------------|
| **Google image/video low-cost tier** | Проверить как дешёвый provider для генерации изображений, карточек проектов, UI mockups и коротких visual loops. Перед внедрением: price/quality/watermark тест на фиксированном наборе промптов |
| **Photo restoration prompt pack** | Добавить prompt-template для восстановления старых фото: царапины, шум, пятна, мягкий upscale и естественная колоризация |
| **prompts.chat / Claude Prompt Library** | Источник prompt templates, но только после ручной фильтрации; не импортировать тысячи промптов без качества и категорий |
| **Seed-Audio 1.0** | Не core-фича Text2Image, но reference для будущих animated stories / narrated image packs. Только consent-safe voice usage |
| **Torlink** | Не интегрировать. Максимум reference для очередей загрузки открытых assets, без публичного "скачать любые файлы" сценария |

## Провайдеры

- Google Gemini
- OpenAI DALL-E / GPT Image
- OpenRouter
- Ollama

Для Ollama предусмотрен локальный режим с настраиваемым `baseUrl`.

## Структура приложения

```text
src/
  components/        UI-пикеры и навигация
  pages/
    Generator.tsx    основной экран генерации
    History.tsx      локальная история
    PromptCatalog.tsx каталог шаблонов
    Settings.tsx     провайдеры, модели, API ключи
  services/
    aiService.ts     enhancement + image generation
    mediaAssetContract.ts versioned sidecar without binary data or URLs
    historyService.ts локальное хранение истории
  types.ts           модели данных и провайдеры
```

## Быстрый старт

```bash
git clone https://github.com/PavelHopson/Text2Image.git
cd Text2Image
npm install
npm run dev
```

## Переменные окружения

По умолчанию приложение можно использовать через экран `Settings`, сохраняя ключ локально в браузере.

Если нужен дефолтный ключ для локального запуска, создайте `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

```env
GEMINI_API_KEY=your_api_key_here
```

## Проверка качества

```bash
npm run typecheck
npm run build
```

## Demo

[text2image-studio.pages.dev](https://text2image-studio.pages.dev)
## Eclipse Forge visual contract

Text2Image uses the local `eclipse-forge.visual-system.v1` snapshot in the `product` profile: self-hosted Outfit/Inter typography, signal-blue actions, warm-gold accents, grid/grain depth and reduced-motion-safe transitions. The token/font snapshot is served by this application and does not depend on the Landing at runtime.

Visual pilot verified on 2026-08-12 with TypeScript and production build. Compatible lockfile remediation clears the production dependency audit.
