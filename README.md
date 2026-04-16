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
