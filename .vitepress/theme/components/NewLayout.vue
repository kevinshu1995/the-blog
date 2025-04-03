<template>
    <Layout>
        <template #doc-before>
            <div class="text-3 pt-5" v-if="!$frontmatter.page">
                {{ $frontmatter.date?.substring(0, 10) }} &nbsp;&nbsp;
                <BaseTag
                    v-for="item in $frontmatter.tags"
                    :href="withBase(`/pages/tags.html?tag=${item}`)"
                    :text="item"
                    :key="item"
                    font-size="text-3"
                />
            </div>
        </template>
    </Layout>
    <Copyright v-if="isHomePage === false" />
</template>
<script setup>
import { computed } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Copyright from './Copyright.vue';
import { withBase, useRoute } from 'vitepress';
const { Layout } = DefaultTheme;
const route = useRoute();

const isHomePage = computed(() => {
    if (/^\/(page_\d+(?:\.html)?)?$/.test(route.path)) return true;
    return route.path === '/';
});
</script>
