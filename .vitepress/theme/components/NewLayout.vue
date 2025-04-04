<template>
    <Layout>
        <template #doc-before>
            <div v-if="!frontmatter.page">
                <div class="text-3 pt-5 flex gap-2 items-end mb-2">
                    <p v-if="!frontmatter.page" class="text-3">
                        {{ frontmatter.date?.substring(0, 10) }}
                    </p>
                    <p v-if="currentPageReadingTime" class="text-3">
                        / {{ currentPageReadingTime }}
                    </p>
                </div>

                <div v-if="!frontmatter.page" class="-mx-2">
                    <BaseTag
                        v-for="item in frontmatter.tags"
                        :href="withBase(`/pages/tags.html?tag=${item}`)"
                        :text="item"
                        :key="item"
                        font-size="text-3"
                    />
                </div>
            </div>
        </template>

        <template #doc-after>
            <div class="pt-10">
                <div class="flex gap-8">
                    <img :src="theme.author.avatar" class="size-15 rounded-full" />
                    <a href="https://www.buymeacoffee.com/hsiu" target="_blank">
                        <img
                            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                            alt="Buy Me A Coffee"
                            style="height: 60px !important; width: 217px !important"
                        />
                    </a>
                </div>
            </div>
            <div
                class="py-20 my-20 border-t border-t-neutral-200 dark:border-t-neutral-800"
                v-if="!frontmatter.page"
            >
                <h2 class="!mb-4 !font-bold !mt-0">{{ theme.text.suggestPost }}</h2>
                <ul class="">
                    <li
                        v-for="(post, postIndex) in suggestPosts"
                        :class="[
                            postIndex !== 0 &&
                                'mt-2 pt-2 border-t border-t-neutral-200 dark:border-t-neutral-800',
                        ]"
                    >
                        <a
                            :href="post.regularPath"
                            class="flex flex-col md:flex-row justify-between w-full hover:text-[var(--vp-c-brand)] hover:underline"
                        >
                            <span class="line-clamp-2 md:line-clamp-1">
                                {{ post.frontMatter.title }}
                            </span>

                            <span class="text-nowrap opacity-70">{{ post.frontMatter.date }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </template>
        <template #not-found>
            <NotFoundPage />
        </template>
    </Layout>
    <ReadingProgressIndicator v-if="!frontmatter.page" />
    <Copyright v-if="!frontmatter.page" />
</template>
<script setup lang="ts">
import { data as readingTimeData } from './../utils/reading-time.data.ts';
import { computed } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Copyright from './Copyright.vue';
import ReadingProgressIndicator from './base/ReadingProgressIndicator.vue';
import NotFoundPage from './NotFoundPage.vue';
import { withBase, useRoute, useData } from 'vitepress';
import { initCategory } from '../functions';

const { Layout } = DefaultTheme;
const route = useRoute();
const { frontmatter, theme } = useData();

const currentCategory = computed(
    () => frontmatter.value.category || theme.value.text.uncategorized,
);

const suggestPosts = computed(() => {
    const allPosts = theme.value.posts.filter((item) => item.regularPath !== route.path);

    const posts = initCategory(allPosts, theme.value.text.uncategorized);

    const currentCategoryPosts = posts[currentCategory.value] ?? [];

    const _suggestPosts = currentCategoryPosts.filter((item) => item.regularPath !== route.path);

    const suggestPostsLength = theme.value.suggestPostLength ?? 5;
    if (_suggestPosts.length > suggestPostsLength) {
        return _suggestPosts.slice(0, suggestPostsLength);
    }

    const remainingCount = suggestPostsLength - _suggestPosts.length;

    // 從其他類別文章中找出補充的建議文章
    const otherCategoryPosts = allPosts.filter((post) => !currentCategoryPosts.includes(post));
    const extraPosts = otherCategoryPosts.slice(0, remainingCount);

    return [..._suggestPosts, ...extraPosts];
});

// 獲取當前頁面的閱讀時間
const currentPageReadingTime = computed(() => {
    return (
        readingTimeData.articles.find((article) => article.path === route.path)?.readingTime
            ?.labelText || ''
    );
});
</script>
