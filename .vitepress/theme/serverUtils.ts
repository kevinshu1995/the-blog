import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs-extra';
import { resolve } from 'path';

import GLOBAL_CONFIG from './../global-config';

async function getPosts(pageSize: number) {
    let paths = await globby([GLOBAL_CONFIG.srcDirName + '/posts/**.md']);

    //生成分页页面markdown
    await generatePaginationPages(paths.length, pageSize);

    let posts = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8');
            const { data } = matter(content);
            data.date = _convertDate(data.date);
            return {
                frontMatter: data,
                regularPath: `/${item
                    .replace('.md', '') // 如果 config.cleanUrls 為 true 則要去掉 .md，若為 false 則要改成 .html
                    .replace(`${GLOBAL_CONFIG.srcDirName}/`, '')}`,
            };
        }),
    );
    posts.sort(_compareDate as any);
    posts.sort(_comparePin as any);
    return posts;
}

async function generatePaginationPages(total: number, pageSize: number) {
    const homePageName = GLOBAL_CONFIG.homePageName;
    const homePageListName = GLOBAL_CONFIG.homePageListName;
    //  pagesNum
    let pagesNum = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1;
    const paths = resolve('./articles');
    if (total > 0) {
        for (let i = 1; i < pagesNum + 1; i++) {
            const page = `
---
page: true
title: ${i === 1 ? homePageName : `${homePageListName} - ${i}`}
aside: false
lastUpdated: false
home: true
publish: false
---
<script setup>
import Page from "./../.vitepress/theme/components/page/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(${pageSize * (i - 1)},${pageSize * i})
</script>
<Page :posts="posts" :pageCurrent="${i}" :pagesNum="${pagesNum}" />
`.trim();
            const file = paths + `/page_${i}.md`;
            await fs.writeFile(file, page);
        }
    }
    // rename page_1 to index for homepage
    await fs.move(paths + '/page_1.md', paths + '/index.md', { overwrite: true });
}

function _convertDate(date = new Date().toString()) {
    const json_date = new Date(date).toJSON();
    return json_date.split('T')[0];
}

function _compareDate(
    obj1: { frontMatter: { date: number } },
    obj2: { frontMatter: { date: number } },
) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

function _comparePin(
    obj1: { frontMatter: { pin: number } },
    obj2: { frontMatter: { pin: number } },
) {
    const pin1 = obj1.frontMatter?.pin ?? 0;
    const pin2 = obj2.frontMatter?.pin ?? 0;
    if (pin1 === pin2) return 0;
    return pin1 < pin2 ? 1 : -1;
}

export { getPosts };
