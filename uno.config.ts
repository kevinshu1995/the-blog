import { defineConfig, presetWebFonts } from 'unocss';

export default defineConfig({
    // ...UnoCSS options
    presets: [
        presetWebFonts({
            provider: 'google',
            fonts: {
                'noto-tc': 'Noto Serif TC:200,500,800',
            },
        }),
    ],
});
