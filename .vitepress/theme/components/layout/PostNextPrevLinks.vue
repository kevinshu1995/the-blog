<template>
    <div>
        <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
            v-if="currentPostIndex !== -1 || !frontmatter.page"
        >
            <BaseButton
                v-if="currentPostIndex !== theme.posts.length - 1"
                class="flex flex-col items-center justify-center gap-1"
                padding="py-4 px-4"
                :href="prevPost.regularPath"
            >
                <span class="flex items-center gap-2">
                    <BaseIcon icon="mynaui/chevron-left" />
                    <span>上一篇</span>
                </span>
                <span class="line-clamp-1">{{ prevPost.frontMatter.title }}</span>
            </BaseButton>
            <p v-else class="text-center flex items-center justify-center gap-2">
                <BaseIcon icon="mynaui/confetti" size="size-6" />
                <span>你已經閱讀到最後一篇文章了</span>
            </p>
            <BaseButton
                v-if="currentPostIndex !== 0"
                class="flex flex-col items-center justify-center gap-1"
                padding="py-3 px-4"
                :href="nextPost.regularPath"
            >
                <span class="flex items-center gap-2">
                    <span>下一篇</span>
                    <BaseIcon icon="mynaui/chevron-right" />
                </span>
                <span class="line-clamp-1">
                    {{ nextPost.frontMatter.title }}
                </span>
            </BaseButton>
            <p v-else class="text-center flex items-center justify-center gap-2">
                <BaseIcon icon="mynaui/confetti" size="size-6" />
                <span>你已經閱讀到最新的文章了</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useData } from 'vitepress';

const route = useRoute();
const { frontmatter, theme } = useData();

const currentPostIndex = computed(() => {
    return theme.value.posts.findIndex((item) => item.regularPath === route.path);
});

const nextPost = computed(() => theme.value.posts[currentPostIndex.value - 1] ?? null);
const prevPost = computed(() => theme.value.posts[currentPostIndex.value + 1] ?? null);
</script>
