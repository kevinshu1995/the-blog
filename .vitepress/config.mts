import { defineConfig } from 'vitepress';
import { getPosts } from './theme/serverUtils';
import GLOBAL_CONFIG from './global-config';
import UnoCSS from 'unocss/vite';

const pageSize = 10;

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Wen-Hsiu's Blog",
    titleTemplate: 'Hsiu Blog',
    description: '程式碼之外，還有生活的藝術',
    lang: 'zh-TW',
    cleanUrls: true,
    base: '/',
    cacheDir: './node_modules/vitepress_cache',
    srcDir: `./${GLOBAL_CONFIG.srcDirName}`,
    lastUpdated: true,
    sitemap: {
        hostname: 'https://blog.hsiu.soy',
    },
    themeConfig: {
        lastUpdated: {
            text: '最後更新時間',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'short',
            },
        },
        posts: await getPosts(pageSize),
        website: 'https://blog.hsiu.soy', //copyright link
        // logo: ''
        comment: {
            repo: 'kevinshu1995/the-blog',
            issueTerm: 'pathname',
        },
        nav: [{ text: '關於我', link: '/pages/about' }],
        search: {
            provider: 'local',
        },
        outline: {
            label: '文章摘要',
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/kevinshu1995' }],
        darkModeSwitchLabel: '切換模式',

        suggestPostLength: 5,

        // customize text
        author: {
            intro: '程式碼之外，還有生活的藝術 \n 前端工程師 / 生活分享 / 筆記',
        },
        text: {
            suggestPost: '更多文章',
            archive: '文章',
            tags: '標籤',
            readMore: '查看更多',
            uncategorized: '未分類',
            category: '分類',
        },
        copyrightFrom: '2025',
    } as any,
    srcExclude: ['README.md'],
    vite: {
        plugins: [UnoCSS()],
    },
});
