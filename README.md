# 📝 Loan Application - Многошаговая форма заявки на займ

[![Netlify Status](https://img.shields.io/badge/netlify-deployed-success)](https://loan-application-test.netlify.app/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌐 Демо

**[Открыть приложение на Netlify](https://loan-application-test.netlify.app/)**

## 📋 Описание проекта

SPA приложение для подачи заявки на займ, состоящее из трех последовательных форм с валидацией данных и финальным модальным окном подтверждения.

**Особенности:**
- ✅ Последовательное заполнение данных
- ✅ Валидация всех полей с подсказками
- ✅ Сохранение данных в localStorage (после перезагрузки данные не теряются)
- ✅ Навигация между формами с сохранением состояния
- ✅ Интеграция с тестовым API (dummyjson.com)
- ✅ Кэширование API запросов для оптимизации

## 🚀 Технологии и библиотеки

| Библиотека | Версия | Назначение | Почему выбрали |
|------------|--------|------------|----------------|
| **React** | 19.2.5 | UI библиотека | Современный, компонентный подход, новый компилятор |
| **TypeScript** | 6.0.2 | Типизация кода | Безопасность типов, автодополнение |
| **React Router DOM** | 7.14.2 | Маршрутизация | Навигация между формами, работа кнопки "Назад" |
| **Zustand** | 5.0.12 | Управление состоянием | Простой API, persist для localStorage |
| **TanStack Query** | 5.99.2 | Серверное состояние | Кэширование, автоматическая загрузка |
| **Axios** | 1.15.2 | HTTP клиент | Интерсепторы, удобная обработка ошибок |
| **Styled Components** | 6.4.1 | Стилизация | CSS-in-JS, динамические стили |
| **Vite** | 8.0.9 | Сборка | Быстрая разработка, HMR |
