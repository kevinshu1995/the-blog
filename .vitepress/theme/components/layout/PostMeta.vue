<template>
    <div>
        <div v-if="!frontmatter.page">
            <div class="text-3 pt-5 flex gap-2 items-end mb-2">
                <p v-if="!frontmatter.page" class="text-3">
                    {{ frontmatter.date?.substring(0, 10) }}
                </p>
                <p v-if="currentPageReadingTime" class="text-3">/ {{ currentPageReadingTime }}</p>
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
    </div>
</template>

<script setup lang="ts">
import { data as readingTimeData } from './../../utils/reading-time.data.ts';
import { computed } from 'vue';
import { withBase, useRoute, useData } from 'vitepress';

const route = useRoute();
const { frontmatter } = useData();

// 獲取當前頁面的閱讀時間
const currentPageReadingTime = computed(() => {
    return (
        readingTimeData.articles.find((article) => article.path === route.path)?.readingTime
            ?.labelText || ''
    );
});
</script>
