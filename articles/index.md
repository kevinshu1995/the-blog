---
page: true
title: 首頁
aside: false
lastUpdated: false
home: true
publish: false
---
<script setup>
import Page from "./../.vitepress/theme/components/page/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(0,10)
</script>
<Page :posts="posts" :pageCurrent="1" :pagesNum="2" />