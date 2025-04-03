<template>
    <div class="flex flex-col md:flex-row gap-16">
        <!-- Author aside -->
        <BaseSidebar width="250">
            <div class="flex flex-col items-center mt-[10vh]">
                <img
                    src="https://c.tenor.com/wfdSCMP3BVEAAAAC/tenor.gif"
                    alt=""
                    class="size-26 rounded-full"
                />
                <p class="text-center !mb-0">{{ description }}</p>
                <ul class="!p-0 !list-none text-sm flex gap-6">
                    <li class="flex gap-2 !m-0">
                        <span>文章</span><span>{{ posts.length }}</span>
                    </li>
                    <li class="flex gap-2 !m-0">
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
                                <BaseIcon :icon="`simple-icons/${link.icon}`" size="size-4" />
                            </template>
                            <template v-else-if="link.svg">
                                <span v-html="link.svg"></span>
                            </template>
                        </a>
                    </li>
                </ul>
                <!-- tags -->
                <div>
                    <ul
                        class="!p-0 !list-none text-sm flex flex-wrap justify-center gap-2 !mt-4 border-t border-t-neutral-100 dark:border-t-neutral-800 !pt-4 !mb-1"
                    >
                        <li v-for="(_, value) in tags" class="!mt-0 !text-xs">
                            <BaseTag
                                :href="withBase(`/pages/tags.html?tag=${value}`)"
                                :text="value"
                                :key="value"
                                font-size="text-3"
                                margin="mr-1 mb-2"
                            />
                        </li>
                    </ul>
                    <div class="flex justify-center">
                        <a
                            :href="withBase('/pages/tags.html')"
                            class="flex items-center gap-1 text-3 py-1 pl-2 pr-1 rounded-sm"
                        >
                            <span>查看更多</span>
                            <BaseIcon icon="mynaui/chevron-right" />
                        </a>
                    </div>
                </div>
            </div>
        </BaseSidebar>
        <!-- Post List -->
        <div class="grow">
            <div
                v-for="(article, index) in posts"
                :key="index"
                :class="[
                    'py-[14px]',
                    index !== 0 && 'border-t border-t-neutral-100 dark:border-t-neutral-800',
                ]"
            >
                <div class="flex items-center justify-between">
                    <div class="text-base line-clamp-2">
                        <BaseIcon
                            icon="simple-icons/pinboard"
                            v-if="article.frontMatter.pin"
                            size="size-3"
                            class="mr-2 !text-[var(--bt-theme-title)]"
                        />

                        <a
                            class="!text-[var(--bt-theme-title)] !font-bold"
                            :href="withBase(article.regularPath)"
                        >
                            {{ article.frontMatter.title }}
                        </a>
                    </div>
                </div>
                <p
                    class="text-[var(--vp-c-text-2)] !m-0 !text-sm line-clamp-2"
                    v-if="article.frontMatter.description"
                    v-html="article.frontMatter.description"
                ></p>
                <div class="text-3 flex items-center flex-wrap mt-2 -mb-2">
                    <span
                        v-if="article.frontMatter.date"
                        class="inline-flex items-center mr-4 mb-2 w-full sm:w-auto"
                    >
                        <BaseIcon icon="mynaui/calendar" size="size-3" class="mr-1" />
                        {{ article.frontMatter.date }}
                    </span>

                    <BaseTag
                        v-for="item in article.frontMatter.tags"
                        :href="withBase(`/pages/tags.html?tag=${item}`)"
                        :text="item"
                        :key="item"
                        font-size="text-3"
                        margin="mr-2.5 mb-2"
                    />
                </div>
            </div>
            <div class="mt-4 flex justify-center">
                <a
                    :class="[
                        'link inline-block size-6 text-center rounded-full',
                        pageCurrent === i &&
                            '!bg-[var(--vp-c-text-1)] !text-[var(--vp-c-neutral-inverse)]',
                    ]"
                    v-for="i in pagesNum"
                    :key="i"
                    :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)"
                >
                    <span class="relative top-[-2px]">{{ i }}</span>
                </a>
            </div>

            <Copyright class="mt-12" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { withBase, useData } from 'vitepress';
import { PropType, computed } from 'vue';
import { initTags } from '../functions';
import BaseSidebar from './base/BaseSidebar.vue';
import Copyright from './Copyright.vue';

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
