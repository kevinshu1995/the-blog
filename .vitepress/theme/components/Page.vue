<template>
    <div class="flex flex-col md:flex-row gap-16">
        <div class="md:min-w-[250px] flex flex-col items-center mt-[10vh]">
            <img
                src="https://c.tenor.com/wfdSCMP3BVEAAAAC/tenor.gif"
                alt=""
                class="size-26 rounded-full"
            />
            <p class="text-center !mb-0">{{ description }}</p>
            <ul class="!p-0 !list-none text-sm">
                <li class="flex gap-2">
                    <span>文章</span><span>{{ posts.length }}</span>
                </li>
                <li class="flex gap-2">
                    <span>標籤</span><span>{{ tagsLength }}</span>
                </li>
            </ul>
            <ul class="!p-0 !list-none text-sm flex flex-wrap gap-2 !mt-2 !mb-0">
                <li v-for="link in theme.socialLinks">
                    <a
                        :href="link.link"
                        class="block p-1"
                        target="_blank"
                        :aria-label="link.ariaLabel"
                    >
                        <template v-if="link.icon">
                            <Icon :icon="`simple-icons/${link.icon}`" size="size-4" />
                        </template>
                        <template v-else-if="link.svg">
                            <span v-html="link.svg"></span>
                        </template>
                    </a>
                </li>
            </ul>
            <ul
                class="!p-0 !list-none text-sm flex flex-wrap gap-2 !mt-4 border-t border-t-neutral-100 dark:border-t-neutral-800 !pt-4"
            >
                <li v-for="(content, value) in tags" class="!mt-0 !text-xs">
                    <a
                        :href="`/pages/tags.html?tag=${value}`"
                        class="bg-[var(--vp-c-bg-alt)] text-[var(--vp-c-text-1)] px-2"
                    >
                        {{ value }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="grow">
            <div
                v-for="(article, index) in posts"
                :key="index"
                :class="[
                    'post-list',
                    index !== 0 && 'border-t border-t-neutral-100 dark:border-t-neutral-800',
                ]"
            >
                <div class="post-header">
                    <div class="post-title line-clamp-2">
                        <Icon
                            icon="simple-icons/pinboard"
                            v-if="article.frontMatter.pin"
                            size="size-3"
                            class="mr-2"
                        />

                        <a class="!font-bold" :href="withBase(article.regularPath)">
                            {{ article.frontMatter.title }}
                        </a>
                    </div>
                </div>
                <p
                    class="describe line-clamp-2"
                    v-if="article.frontMatter.description"
                    v-html="article.frontMatter.description"
                ></p>
                <div class="post-info flex items-center flex-wrap mt-2 -mb-2">
                    <span
                        v-if="article.frontMatter.date"
                        class="inline-flex items-center mr-4 mb-2 w-full sm:w-auto"
                    >
                        <Icon icon="mynaui/calendar" size="size-3" class="mr-1" />
                        {{ article.frontMatter.date }}
                    </span>
                    <span v-for="item in article.frontMatter.tags" class="post-info-tag mb-2">
                        <a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span
                    >
                </div>
            </div>
            <div class="pagination">
                <a
                    class="link"
                    :class="{ active: pageCurrent === i }"
                    v-for="i in pagesNum"
                    :key="i"
                    :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)"
                    >{{ i }}</a
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { withBase, useData } from 'vitepress';
import { PropType, computed } from 'vue';
import Icon from './Icon.vue';
import { initTags } from '../functions';

interface Article {
    regularPath: string;
    frontMatter: {
        title: string;
        description: string;
        date: string;
        tags: string[];
        pin?: number;
    };
}
defineProps({
    posts: {
        type: Array as PropType<Article[]>,
        required: true,
    },
    pageCurrent: {
        type: Number as PropType<number>,
        required: true,
    },
    pagesNum: {
        type: Number as PropType<number>,
        required: true,
    },
});

const { theme, description } = useData();
const tags = computed(() => initTags(theme.value.posts));
const tagsLength = computed(() => Object.keys(tags.value).length);
</script>

<style scoped>
.post-list {
    border-bottom: 1px dashed var(--vp-c-divider-light);
    padding: 14px 0 14px 0;
}
.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post-title {
    font-size: 1.0625rem;
    font-weight: 500;
    color: var(--bt-theme-title) !important;
    margin: 0.1rem 0;
}
.post-title a {
    color: var(--bt-theme-title) !important;
}

.describe {
    font-size: 0.9375rem;
    color: var(--vp-c-text-2);
    margin: 0;
    line-height: 1.5rem;
}
.pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
}
.link {
    display: inline-block;
    width: 26px;
    text-align: center;
    border: 1px var(--vp-c-divider-light) solid;
    border-right: none;
    font-weight: 400;
    border-radius: 20px;
}
.link.active {
    background: var(--vp-c-text-1);
    color: var(--vp-c-neutral-inverse);
    border: 1px solid var(--vp-c-text-1) !important;
}

@media screen and (max-width: 768px) {
    .post-list {
        padding: 14px 0 14px 0;
    }
    .post-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .post-title {
        font-size: 1.0625rem;
        font-weight: 400;
    }
    .describe {
        font-size: 0.9375rem;
        margin: 0;
    }
}
</style>
