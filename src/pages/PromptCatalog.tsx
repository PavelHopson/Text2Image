import React, { useState } from 'react';
import { BookOpen, Copy, Check, Search, Sparkles } from 'lucide-react';

interface PromptTemplate {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
}

const CATEGORIES = [
  { id: 'all', label: 'Все', icon: '🎯' },
  { id: 'photo', label: 'Фото', icon: '📸' },
  { id: 'art', label: 'Арт-стили', icon: '🎨' },
  { id: 'product', label: 'Продукт', icon: '📦' },
  { id: '3d', label: '3D / Изометрия', icon: '🧊' },
  { id: 'character', label: 'Персонажи', icon: '🧑‍🎤' },
  { id: 'scene', label: 'Сцены', icon: '🏞️' },
  { id: 'transform', label: 'Трансформация', icon: '🔄' },
];

const PROMPTS: PromptTemplate[] = [
  // Photo
  {
    id: 'portrait-golden',
    title: 'Портрет Golden Hour',
    prompt: 'Professional portrait photography, golden hour lighting, shallow depth of field, 85mm lens, bokeh background, warm tones, natural skin texture, 8K resolution, photorealistic',
    category: 'photo',
    tags: ['портрет', 'фото', 'golden hour'],
  },
  {
    id: 'fashion-editorial',
    title: 'Fashion Editorial',
    prompt: 'High fashion editorial photograph, dramatic studio lighting, sharp contrast, haute couture clothing, Vogue magazine style, clean background, professional model pose, cinematic color grading',
    category: 'photo',
    tags: ['мода', 'фото', 'студия'],
  },
  {
    id: 'street-photo',
    title: 'Уличная фотография',
    prompt: 'Candid street photography, rain-soaked city at night, neon reflections on wet pavement, silhouette of a person with umbrella, Leica 35mm aesthetic, moody atmosphere, film grain',
    category: 'photo',
    tags: ['улица', 'фото', 'ночь'],
  },

  // Art styles
  {
    id: 'manga-style',
    title: 'Манга / Аниме',
    prompt: 'Japanese manga illustration, cel shading, dynamic action pose, expressive large eyes, speed lines, vibrant color palette, detailed background, professional manga artist quality',
    category: 'art',
    tags: ['манга', 'аниме', 'японский'],
  },
  {
    id: 'ukiyo-e',
    title: 'Укиё-э 浮世絵',
    prompt: 'Ukiyo-e Japanese woodblock print style, flat colors, bold outlines, wave patterns inspired by Hokusai, traditional indigo and red palette, handmade paper texture, edo period atmosphere',
    category: 'art',
    tags: ['укиё-э', 'японский', 'гравюра'],
  },
  {
    id: 'pixel-art',
    title: 'Пиксель-арт',
    prompt: '16-bit pixel art, retro video game aesthetic, limited color palette, crisp individual pixels visible, nostalgic SNES/Genesis era style, dithering shading technique',
    category: 'art',
    tags: ['пиксель', 'ретро', 'игры'],
  },
  {
    id: 'watercolor',
    title: 'Акварель',
    prompt: 'Delicate watercolor painting, soft bleeding edges on textured paper, pastel palette with splashes of vibrant color, loose brushwork, visible paper grain, gallery-quality fine art',
    category: 'art',
    tags: ['акварель', 'живопись'],
  },
  {
    id: 'comic-book',
    title: 'Комикс',
    prompt: 'American comic book art style, bold black outlines, Ben-Day halftone dots, dynamic composition, speech bubble ready, vivid primary colors, Marvel/DC quality illustration',
    category: 'art',
    tags: ['комикс', 'американский'],
  },
  {
    id: 'oil-painting',
    title: 'Масляная живопись',
    prompt: 'Classical oil painting, thick impasto brushstrokes, rich color depth, chiaroscuro lighting, museum-quality canvas texture, Renaissance master technique',
    category: 'art',
    tags: ['масло', 'живопись', 'классика'],
  },

  // Product
  {
    id: 'product-clean',
    title: 'Товар на белом фоне',
    prompt: 'Professional product photography on pure white background, soft studio lighting, commercial catalog quality, sharp focus on every detail, subtle shadow beneath product, 4K resolution',
    category: 'product',
    tags: ['продукт', 'каталог', 'белый фон'],
  },
  {
    id: 'product-lifestyle',
    title: 'Lifestyle продуктовое фото',
    prompt: 'Lifestyle product photography, naturally styled scene, warm ambient lighting, product in real-world context, shallow depth of field, Instagram-worthy composition, premium feel',
    category: 'product',
    tags: ['продукт', 'lifestyle'],
  },
  {
    id: 'packaging-mockup',
    title: 'Дизайн упаковки',
    prompt: 'Premium packaging design mockup, 3D rendered box on marble surface, elegant minimalist branding, gold foil accents, dramatic lighting with soft shadows, luxury feel',
    category: 'product',
    tags: ['упаковка', 'дизайн', 'мокап'],
  },

  // 3D / Isometric
  {
    id: 'isometric-room',
    title: 'Изометрическая комната',
    prompt: 'Isometric 3D render of a cozy room interior, miniature diorama effect, tilt-shift photography feel, warm interior lighting, detailed tiny furniture, pastel color scheme, Blender quality render',
    category: '3d',
    tags: ['изометрия', '3D', 'комната'],
  },
  {
    id: 'lego-scene',
    title: 'LEGO сцена',
    prompt: 'LEGO brick minifigure in a detailed miniature diorama, macro photography lens, shallow depth of field, toy photography style, realistic LEGO plastic material, studio lighting',
    category: '3d',
    tags: ['LEGO', 'миниатюра', 'игрушка'],
  },
  {
    id: 'minecraft-world',
    title: 'Minecraft мир',
    prompt: 'Minecraft-style voxel world, blocky terrain with lush green hills, pixelated trees and water, dramatic sunset sky, volumetric god rays through clouds, cinematic wide-angle view',
    category: '3d',
    tags: ['minecraft', 'воксели', 'игры'],
  },
  {
    id: 'miniature-city',
    title: 'Миниатюрный город',
    prompt: 'Tilt-shift miniature city scene, buildings look like tiny models, extremely shallow depth of field, vibrant saturated colors, bird-eye view, toy-like cars and people, diorama effect',
    category: '3d',
    tags: ['миниатюра', 'город', 'tilt-shift'],
  },

  // Characters
  {
    id: 'character-clone',
    title: 'Персонаж в разных ракурсах',
    prompt: 'Character turnaround sheet, same character from front/side/back/3-4 view, consistent design and proportions, neutral pose, clean white background, concept art quality, detailed outfit design',
    category: 'character',
    tags: ['персонаж', 'concept art', 'turnaround'],
  },
  {
    id: 'character-crossover',
    title: 'Кроссовер персонажей',
    prompt: 'Epic crossover scene with characters from different universes meeting, dramatic lighting, each character in their iconic pose and costume, cinematic wide shot, detailed background, movie poster composition',
    category: 'character',
    tags: ['кроссовер', 'персонаж', 'фэнтези'],
  },

  // Scenes
  {
    id: 'fantasy-map',
    title: 'Карта фэнтези мира',
    prompt: 'Detailed fantasy world map in the style of Lord of the Rings, parchment paper texture, hand-drawn mountains and forests, elegant calligraphy labels, compass rose, vintage cartography style, sepia and forest green tones',
    category: 'scene',
    tags: ['карта', 'фэнтези', 'средиземье'],
  },
  {
    id: 'cyberpunk-city',
    title: 'Киберпанк город',
    prompt: 'Cyberpunk cityscape at night, towering neon-lit skyscrapers, holographic advertisements, flying vehicles, rain and mist, reflective wet streets, Blade Runner atmosphere, ultra-detailed 8K',
    category: 'scene',
    tags: ['киберпанк', 'город', 'ночь'],
  },
  {
    id: 'interior-design',
    title: 'Дизайн интерьера',
    prompt: 'Modern interior design visualization, scandinavian minimalist living room, large floor-to-ceiling windows with city view, natural light, warm wood and white palette, designer furniture, architectural photography style',
    category: 'scene',
    tags: ['интерьер', 'дизайн', 'архитектура'],
  },

  // Transform
  {
    id: 'colorize-old',
    title: 'Колоризация старого фото',
    prompt: 'Take this black and white vintage photograph and colorize it with historically accurate and natural colors, maintain the original composition and lighting, add subtle warm film tones, preserve the grain and texture',
    category: 'transform',
    tags: ['колоризация', 'реставрация'],
  },
  {
    id: 'remove-bg',
    title: 'Удаление фона',
    prompt: 'Isolate the main subject on a transparent background, clean precise edges, maintain fine details like hair strands, professional cutout quality ready for compositing',
    category: 'transform',
    tags: ['удаление фона', 'вырез'],
  },
  {
    id: 'style-transfer',
    title: 'Перенос стиля',
    prompt: 'Transform this photograph into the painting style of [artist], maintaining the original composition and subject but applying characteristic brushwork, color palette, and artistic techniques of the reference style',
    category: 'transform',
    tags: ['стиль-трансфер', 'трансформация'],
  },

  // Cinema & Animation
  {
    id: 'interstellar-style',
    title: 'Interstellar кинематография',
    prompt: 'IMAX 70mm film look, vast landscapes, anamorphic lens flares, deep blacks, muted earth tones, Hoyte van Hoytema cinematography style, cinematic aspect ratio, grain texture, epic scale',
    category: 'scene',
    tags: ['кино', 'interstellar', 'IMAX'],
  },
  {
    id: 'blade-runner-style',
    title: 'Blade Runner нуар',
    prompt: 'Neon-soaked dystopian cityscape, rain and fog, volumetric light beams, teal-orange color grade, Roger Deakins lighting, 35mm anamorphic bokeh, reflective wet surfaces, noir atmosphere',
    category: 'scene',
    tags: ['кино', 'blade runner', 'нуар'],
  },
  {
    id: 'ghibli-style',
    title: 'Studio Ghibli стиль',
    prompt: 'Studio Ghibli anime style, soft watercolor backgrounds, hand-drawn feel, lush green nature, warm pastel palette, Miyazaki-style whimsical atmosphere, gentle clouds, cozy village',
    category: 'art',
    tags: ['ghibli', 'аниме', 'miyazaki'],
  },
  {
    id: 'pixar-style',
    title: 'Pixar / Disney 3D',
    prompt: 'Pixar-quality 3D render, stylized character design, expressive large eyes, subsurface scattering skin, vibrant saturated colors, global illumination, cinematic Pixar lighting, heartwarming scene',
    category: 'art',
    tags: ['pixar', 'disney', '3D', 'мультфильм'],
  },

  // Hyper-realism
  {
    id: 'hyper-real-selfie',
    title: 'Гиперреалистичное селфи',
    prompt: 'Ultra-realistic smartphone mirror selfie, close-up framing collarbone to top of head. Natural skin with visible pores, micro-texture, organic imperfections, uneven pigmentation, natural oil sheen on high points. Real daylight with slight warmth, accurate white balance. Phone-camera realism, subtle sensor grain, slight edge softness. No retouching, no smoothing, no beauty filters, no AI glow, no plastic skin',
    category: 'photo',
    tags: ['гиперреализм', 'селфи', 'кожа'],
  },
  {
    id: 'macro-skin-editorial',
    title: 'Макро-кожа (editorial)',
    prompt: 'Photorealistic close-up of skin texture, visible pores, natural imperfections and redness. Bare skin, no makeup, soft side lighting emphasizing texture. Editorial realism, cinematic color grading, ultra-high resolution, unretouched beauty photography',
    category: 'photo',
    tags: ['макро', 'кожа', 'editorial'],
  },
  {
    id: 'macro-eye',
    title: 'Макро-глаз',
    prompt: 'Extreme close-up of a human eye and surrounding skin, ultra-realistic macro photography. Visible fine lines, pores, natural skin sheen, subtle under-eye texture. Soft diffused lighting, realistic shadows, high dynamic range. Editorial beauty photography, no airbrushing, hyper-detailed skin realism',
    category: 'photo',
    tags: ['макро', 'глаз', 'гиперреализм'],
  },
  {
    id: 'realistic-hands',
    title: 'Реалистичные руки',
    prompt: 'Ultra-realistic close-up of hands holding a smartphone. Natural skin texture, visible veins and fine wrinkles. Detailed nail art. Soft natural light, realistic proportions, shallow depth of field. Photorealistic hand anatomy, high detail macro shot',
    category: 'photo',
    tags: ['руки', 'макро', 'гиперреализм'],
  },
];

export const PromptCatalog: React.FC<{ onUsePrompt?: (prompt: string) => void }> = ({ onUsePrompt }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = PROMPTS.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      p.prompt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCopy = (p: PromptTemplate) => {
    navigator.clipboard.writeText(p.prompt);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-accent-light" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Каталог промптов</h2>
            <p className="text-xs text-gray-500">
              {PROMPTS.length} готовых шаблонов · Вдохновлено{' '}
              <a
                href="https://github.com/PicoTrex/Awesome-Nano-Banana-images"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-light hover:underline"
              >
                Awesome Nano Banana
              </a>
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по промптам..."
            className="input-field pl-10 text-sm"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-accent/15 text-accent-light ring-1 ring-accent/30'
                : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Prompt grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="glass-card p-4 space-y-3 group hover:ring-1 hover:ring-accent/20 transition-all">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-semibold text-white">{p.title}</h3>
              <div className="flex gap-1.5 shrink-0 ml-2">
                {onUsePrompt && (
                  <button
                    onClick={() => onUsePrompt(p.prompt)}
                    className="p-1.5 rounded-lg bg-accent/10 text-accent-light hover:bg-accent/20 transition-colors"
                    title="Использовать в генераторе"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => handleCopy(p)}
                  className="p-1.5 rounded-lg bg-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.12] transition-colors"
                  title="Копировать промпт"
                >
                  {copiedId === p.id ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-mono line-clamp-3">{p.prompt}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-gray-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-sm">
          Ничего не найдено по запросу «{search}»
        </div>
      )}
    </div>
  );
};
