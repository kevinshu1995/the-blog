<template>
    <div v-for="(posts, key) in data">
        <div class="pt-7 pb-2.5 font-bold text-[var(--bt-theme-title)] text-5.5">
            {{ key }}
        </div>
        <a
            :href="withBase(article.regularPath)"
            v-for="(article, index) in posts"
            :key="index"
            class="py-1 pt-1 md:pt-1 pb-1 md:pb-[25px] flex justify-between items-center"
        >
            <div class="text-[var(--vp-c-text-1)] hover:text-[var(--vp-c-brand)] line-clamp-1">
                <div
                    class="inline-block mr-1 md:mr-2.5 mb-1 size-1 rounded-full bg-[var(--li-dot-color)]"
                ></div>
                {{ article.frontMatter.title }}
            </div>
            <div class="text-[var(--date-color)]">{{ article.frontMatter.date }}</div>
        </a>
    </div>
</template>
<script lang="ts" setup>
import { useData, withBase } from 'vitepress';
import { computed } from 'vue';
import { initCategory } from '../functions';

const { theme } = useData();
const data = computed(() => initCategory(theme.value.posts));
</script>
