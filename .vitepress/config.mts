import { defineConfig } from 'vitepress';
import { getPosts } from './theme/serverUtils';

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
        comment: {
            repo: 'kevinshu1995/the-blog',
            issueTerm: 'pathname',
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Category', link: '/pages/category' },
            { text: 'Archives', link: '/pages/archives' },
            { text: 'Tags', link: '/pages/tags' },
            { text: 'About', link: '/pages/about' },
            // { text: 'Airene', link: 'http://airene.net' }  -- External link test
        ],
        search: {
            provider: 'local',
        },
        //outline:[2,3],
        outline: {
            label: '文章摘要',
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/kevinshu1995' }],
    } as any,
    srcExclude: ['README.md'],
});
