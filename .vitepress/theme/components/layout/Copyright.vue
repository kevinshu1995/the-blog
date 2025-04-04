<template>
    <div class="text-center text-3 py-4">
        MIT Licensed | Copyright © {{ copyrightFrom }}-present
        <a class="font-bold text-[var(--vp-c-text-1)]" :href="website">{{ webTitle }}</a>
    </div>
</template>
<script lang="ts" setup>
import { useData } from 'vitepress';

const { site, theme } = useData();
const website = theme.value.website;
const webTitle = site.value.title;
const copyrightFrom = theme.value.copyrightFrom;
</script>
