<template>
    <Layout>
        <template #doc-before>
            <div>
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
    </Layout>
    <Copyright v-if="isHomePage === false" />
</template>
<script setup lang="ts">
import { data as readingTimeData } from './../utils/reading-time.data.ts';
import { computed } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Copyright from './Copyright.vue';
import { withBase, useRoute, useData } from 'vitepress';
const { Layout } = DefaultTheme;
const route = useRoute();

const { frontmatter } = useData();

// 獲取當前頁面的閱讀時間
const currentPageReadingTime = computed(() => {
    return (
        readingTimeData.articles.find((article) => article.path === route.path)?.readingTime
            ?.labelText || ''
    );
});

const isHomePage = computed(() => {
    if (/^\/(page_\d+(?:\.html)?)?$/.test(route.path)) return true;
    return route.path === '/';
});
</script>
