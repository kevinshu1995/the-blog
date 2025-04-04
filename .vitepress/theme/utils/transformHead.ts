import { HeadConfig, TransformContext } from 'vitepress';
import { formatISO } from 'date-fns';

export default async function transformHead(context: TransformContext) {
    const { pageData, siteConfig, siteData } = context;
    const head: HeadConfig[] = [];
    const themeConfig = siteConfig.userConfig.themeConfig;

    const title = pageData.frontmatter.title ?? '';
    const description = pageData.frontmatter.description ?? siteData.description ?? '';
    const publishedTime = formatISO(new Date(pageData.frontmatter.date ?? Date.now())) ?? '';
    const lastUpdated = String(pageData.lastUpdated) ?? '';
    const relativePath = pageData.relativePath;
    const siteUrl = `${themeConfig.website}/${relativePath}`;
    const authorName = themeConfig.author.name ?? '';

    const category = pageData.frontmatter.category ?? '';
    const tags: string[] | undefined = pageData.frontmatter.tags;

    const isPost = !pageData.frontmatter.page;

    // Open Graph
    head.push(['meta', { property: 'og:title', content: title }]);
    head.push(['meta', { property: 'og:description', content: description }]);
    head.push(['meta', { property: 'og:url', content: siteUrl }]);
    // head.push(['meta', { property: 'og:image', content: 'https://' }]);

    // 判斷是不是 post
    if (isPost) {
        head.push(['meta', { property: 'og:type', content: 'article' }]);
        authorName && head.push(['meta', { property: 'article:author', content: authorName }]);
        publishedTime &&
            head.push(['meta', { property: 'article:published_time', content: publishedTime }]);
        lastUpdated &&
            head.push(['meta', { property: 'article:modified_time', content: lastUpdated }]);
        category && head.push(['meta', { property: 'article:section', content: category }]);

        if (tags && (tags ?? [])?.length > 0) {
            tags.forEach((tag) => {
                head.push(['meta', { property: 'article:tag', content: tag }]);
            });
        }
    } else {
        head.push(['meta', { property: 'og:type', content: 'website' }]);
    }

    return head;
}
