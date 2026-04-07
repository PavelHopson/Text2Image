import { GeneratedImage } from '../types';

const KEY = 'text2image-history';
const MAX = 100;

export function getHistory(): GeneratedImage[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function addToHistory(img: GeneratedImage) {
  const h = [img, ...getHistory()].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(h));
}

export function toggleLike(id: string) {
  const h = getHistory().map(i => i.id === id ? { ...i, liked: !i.liked } : i);
  localStorage.setItem(KEY, JSON.stringify(h));
}

export function deleteFromHistory(id: string) {
  const h = getHistory().filter(i => i.id !== id);
  localStorage.setItem(KEY, JSON.stringify(h));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
