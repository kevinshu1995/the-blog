import { HeadConfig, TransformContext } from 'vitepress';
import { format, formatISO } from 'date-fns';

export default async function transformHead(context: TransformContext) {
    const { pageData, siteConfig, siteData } = context;
    const head: HeadConfig[] = [];
    const themeConfig = siteConfig.userConfig.themeConfig;

    const isPost = !pageData.frontmatter.page;

    const title = pageData.frontmatter.title ?? '';
    const description = pageData.frontmatter.description ?? siteData.description ?? '';

    const datePublishedTime = new Date(pageData.frontmatter.date ?? Date.now());
    const dateLastUpdated = new Date(pageData.lastUpdated ?? Date.now());

    const publishedTime = formatISO(datePublishedTime);
    const lastUpdated = formatISO(dateLastUpdated);

    const relativePath = pageData.relativePath.replace('/index.md', '').replace('.md', '');
    const siteUrl = `${themeConfig.website}/${relativePath}`;
    const authorName = themeConfig.author.name ?? '';
    const category = pageData.frontmatter.category ?? '';
    const tags: string[] = pageData.frontmatter.tags ?? [];

    // Open Graph =================
    head.push(['meta', { property: 'og:title', content: title }]);
    head.push(['meta', { property: 'og:description', content: description }]);
    head.push(['meta', { property: 'og:url', content: siteUrl }]);
    head.push(['meta', { property: 'og:locale', content: 'zh_TW' }]);

    if (isPost) {
        head.push(['meta', { property: 'og:type', content: 'article' }]);
        authorName && head.push(['meta', { property: 'article:author', content: authorName }]);
        publishedTime &&
            head.push(['meta', { property: 'article:published_time', content: publishedTime }]);
        lastUpdated &&
            head.push(['meta', { property: 'article:modified_time', content: lastUpdated }]);
        category && head.push(['meta', { property: 'article:section', content: category }]);

        if (tags.length > 0) {
            tags.forEach((tag) => {
                head.push(['meta', { property: 'article:tag', content: tag }]);
            });
        }
    } else {
        head.push(['meta', { property: 'og:type', content: 'website' }]);
    }
    // Open Graph end =================

    // Structured Data =================
    if (isPost) {
        head.push([
            'script',
            { type: 'application/ld+json' },
            JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': siteUrl,
                },
                author: {
                    '@type': 'Person',
                    name: authorName,
                },
                headline: title,
                // image: 'https://',
                datePublished: format(datePublishedTime, 'yyyy-MM-dd'),
                dateModified: format(dateLastUpdated, 'yyyy-MM-dd'),
            }),
        ]);
    } else {
        head.push([
            'script',
            { type: 'application/ld+json' },
            JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                url: siteUrl,
            }),
        ]);
    }
    // TODO person
    // {
    //     "@context": "http://schema.org/",
    //     "@type": "Person",
    //     "name": "name",
    //     "image": "photo url",
    //     "url": "website url",
    //     "jobTitle": "job title"
    // }
    // Structured Data end =================

    return head;
}
