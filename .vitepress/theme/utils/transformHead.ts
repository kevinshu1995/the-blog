import { HeadConfig, TransformContext } from 'vitepress';
import { formatISO } from 'date-fns';

export default async function transformHead(context: TransformContext) {
    const { pageData, siteConfig } = context;
    const head: HeadConfig[] = [];
    const themeConfig = siteConfig.userConfig.themeConfig;
    const publishedTime = formatISO(new Date(pageData.frontmatter.date));
    const lastUpdated = pageData.lastUpdated;
    const relativePath = pageData.relativePath;
    const siteUrl = `${themeConfig.website}/${relativePath}`;
    const authorName = themeConfig.author.name;

    const category = pageData.frontmatter.category;
    const tags: string[] | undefined = pageData.frontmatter.tags;

    head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }]);
    head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }]);
    head.push(['meta', { property: 'og:type', content: 'article' }]);
    head.push(['meta', { property: 'article:author', content: authorName }]);
    head.push(['meta', { property: 'og:url', content: siteUrl }]);
    // head.push(['meta', { property: 'og:image', content: 'https://' }]);

    head.push(['meta', { property: 'article:published_time', content: publishedTime }]);
    head.push(['meta', { property: 'article:modified_time', content: String(lastUpdated) }]);
    category && head.push(['meta', { property: 'article:section', content: category }]);

    if (tags && (tags ?? [])?.length > 0) {
        tags.forEach((tag) => {
            head.push(['meta', { property: 'article:tag', content: tag }]);
        });
    }

    return head;
}
