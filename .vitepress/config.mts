import { defineConfig } from 'vitepress';
import { getPosts } from './theme/serverUtils';
import UnoCSS from 'unocss/vite';

const pageSize = 10;

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Wen-Hsiu's Blog",
    description: '程式碼之外，還有生活的藝術。',
    base: '/',
    cacheDir: './node_modules/vitepress_cache',
    ignoreDeadLinks: true,
    themeConfig: {
        posts: await getPosts(pageSize),
        website: 'https://blog.hsiu.soy', //copyright link
        copyrightFrom: '2025',
        comment: {
            repo: 'kevinshu1995/the-blog',
            issueTerm: 'pathname',
        },
        nav: [
            // { text: 'Home', link: '/' },
            { text: '分類', link: '/pages/category' },
            { text: '列表', link: '/pages/archives' },
            { text: '標籤', link: '/pages/tags' },
            { text: '關於', link: '/pages/about' },
            // { text: 'Airene', link: 'http://airene.net' }  -- External link test
        ],
        search: {
            provider: 'local',
        },
        outline: {
            label: '文章摘要',
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/kevinshu1995' }],
    } as any,
    srcExclude: ['README.md'],
    vite: {
        plugins: [UnoCSS()],
    },
});
