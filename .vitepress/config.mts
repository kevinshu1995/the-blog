import { defineConfig } from 'vitepress';
import { getPosts } from './theme/serverUtils';
import GLOBAL_CONFIG from './global-config';
import UnoCSS from 'unocss/vite';
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss';

const pageSize = 10; // 每頁顯示的文章數量

const hostname = 'https://blog.hsiu.soy';
const title = "Wen-Hsiu's Blog";
const description = '程式碼之外，還有生活的藝術';
const lang = 'zh-TW';
const rssFileName = 'feed.rss';

const rssOptions: RSSOptions = {
    title,
    baseUrl: hostname,
    copyright: 'Copyright (c) 2025-present, Wen-Hsiu Hsu',
    description,
    language: lang,
    author: {
        name: 'Wen-Hsiu Hsu',
        email: 'kevin.hsu.hws@gmail.com',
        link: 'https://hsiu.soy',
    },
    icon: false,
    filename: rssFileName,
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title,
    titleTemplate: '修鍊之路',
    description,
    lang,
    cleanUrls: true,
    base: '/',
    cacheDir: './node_modules/vitepress_cache',
    srcDir: `./${GLOBAL_CONFIG.srcDirName}`,
    lastUpdated: true,
    sitemap: {
        hostname,
    },
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/favicon.jpg',
            },
        ],
        [
            'script',
            {
                src: 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js',
                'data-name': 'bmc-button',
                'data-slug': 'hsiu',
                'data-color': '#FFDD00',
                'data-emoji': '☕',
                'data-font': 'Cookie',
                'data-text': 'Buy me a coffee',
                'data-outline-color': '#000000',
                'data-font-color': '#000000',
                'data-coffee-color': '#ffffff',
            },
        ],
    ],
    themeConfig: {
        siteTitle: '持續！修鍊之路',
        lastUpdated: {
            text: '最後更新時間',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'short',
            },
        },
        posts: await getPosts(pageSize),
        website: 'https://blog.hsiu.soy', //copyright link
        logo: '/avatar-pixel-2.jpg',
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
        socialLinks: [
            { icon: 'github', link: 'https://github.com/kevinshu1995' },
            { icon: 'rss', link: `/${rssFileName}` },
        ],
        darkModeSwitchLabel: '切換模式',

        // 文章頁的推薦文章數量上限
        suggestPostLength: 5,

        // 閱讀時間
        readingTime: {
            charsPerMinute: 250,
            minuteFormat: 'mm 分鐘閱讀',
        },

        // customize text
        author: {
            name: 'Wen-Hsiu Hsu',
            intro: '程式碼之外\n還有生活的藝術\n前端工程師 / 攝影 / 生活紀錄',
            avatar: '/avatar-pixel-2.jpg',
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
        plugins: [UnoCSS(), RssPlugin(rssOptions)],
    },
});
