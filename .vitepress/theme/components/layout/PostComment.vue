<script lang="ts" setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import { useData } from 'vitepress';
const utterancesRef = ref();
const { theme, isDark, frontmatter } = useData();
onMounted(() => {
    nextTick(() => {
        let { repo, issueTerm = 'pathname' } = theme.value.comment;
        if (repo) {
            let utterances = document.createElement('script');
            utterances.async = true;
            utterances.setAttribute('src', 'https://utteranc.es/client.js');
            utterances.setAttribute('repo', repo);
            utterances.setAttribute('issue-term', issueTerm);
            utterances.setAttribute('label', 'CommentInBlog');
            utterances.setAttribute('theme', isDark.value ? 'photon-dark' : 'github-light');
            utterances.setAttribute('crossorigin', 'anonymous');
            utterancesRef.value.appendChild(utterances);
        }
        //hack method to change utterances theme when change site theme
        watch(isDark, (newVal, oldVal) => {
            if (newVal !== oldVal) location.replace(location.href);
        });
    });
});
</script>

<template>
    <div>
        <div ref="utterancesRef" v-if="!frontmatter.page"></div>
    </div>
</template>

<style>
/*global  style*/
.utterances {
    max-width: inherit !important;
}
</style>
