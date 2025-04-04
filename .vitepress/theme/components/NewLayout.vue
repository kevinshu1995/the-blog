<template>
    <Layout>
        <template #doc-before>
            <PostMeta />
        </template>

        <template #doc-after>
            <div v-if="!frontmatter.page" class="space-y-20 pt-10">
                <PostSupports />
                <div class="space-y-10">
                    <PostComment />
                    <PostNextPrevLinks />
                </div>
                <PostSuggestions />
            </div>
        </template>
        <template #not-found>
            <NotFoundPage />
        </template>
    </Layout>

    <PostReadingProgressIndicator v-if="!frontmatter.page" />
    <Copyright v-if="!frontmatter.page" />
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import Copyright from './layout/Copyright.vue';
import PostReadingProgressIndicator from './layout/PostReadingProgressIndicator.vue';
import PostNextPrevLinks from './layout/PostNextPrevLinks.vue';
import PostComment from './layout/PostComment.vue';
import PostSuggestions from './layout/PostSuggestions.vue';
import PostMeta from './layout/PostMeta.vue';
import PostSupports from './layout/PostSupports.vue';
import NotFoundPage from './page/NotFoundPage.vue';
import { useRoute, useData } from 'vitepress';

const { Layout } = DefaultTheme;
const route = useRoute();
const { frontmatter, theme } = useData();
</script>
