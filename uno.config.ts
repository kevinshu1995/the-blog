import presetWind4 from '@unocss/preset-wind4';
import { defineConfig, presetWebFonts } from 'unocss';

export default defineConfig({
    content: { filesystem: ['.vitepress/theme/**/*.{js,ts,vue}', '**/*.md'] },
    // ...UnoCSS options
    presets: [
        presetWind4,
        presetWebFonts({
            provider: 'google',
            fonts: {
                'noto-tc': 'Noto Serif TC:200,500,800',
            },
        }),
    ],
});
