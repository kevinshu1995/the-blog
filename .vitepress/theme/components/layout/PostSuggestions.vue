<template>
    <div>
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
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useData } from 'vitepress';
import { initCategory } from './../../functions';

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
</script>
