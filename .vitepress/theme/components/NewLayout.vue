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
    <Copyright />
</template>
<script setup>
import DefaultTheme from 'vitepress/theme';
import Copyright from './Copyright.vue';
import { withBase } from 'vitepress';
const { Layout } = DefaultTheme;
</script>
