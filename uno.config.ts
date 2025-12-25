// uno.config.ts
import {defineConfig, presetWind3} from 'unocss'

export default defineConfig({
  shortcuts: {
    'bg-primary': 'bg-[var(--color-primary)]',
    'bg-second': 'bg-[var(--color-second)]',
    'bg-third': 'bg-[var(--color-third)]',
    'bg-fourth': 'bg-[var(--color-fourth)]',
    'bg-card-active': 'bg-[var(--color-card-active)]',
    'bg-item': 'bg-[var(--color-item-bg)]',
    'bg-reverse-white': 'bg-[var(--color-reverse-white)]',
    'bg-reverse-black': 'bg-[var(--color-reverse-black)]',
    'color-main': 'color-[var(--color-main-text)]',
    'color-link': 'color-[var(--color-link)]',
    'gap-space': 'gap-[var(--space)]',
    'p-space': 'p-[var(--space)]',
    'px-space': 'px-[var(--space)]',
    'py-space': 'py-[var(--space)]',
    'border-item': 'border-[var(--color-item-border)]',
  },
  presets: [
    presetWind3(),
  ],
  // 自定义断点
  theme: {
    breakpoints: {
      'xs': '480px',      // 自定义小断点
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4k': '2560px',
    }
  },
})
