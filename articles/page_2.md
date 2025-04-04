---
page: true
title: 文章列表 - 2
aside: false
lastUpdated: false
home: true
---
<script setup>
import Page from "./../.vitepress/theme/components/page/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(10,20)
</script>
<Page :posts="posts" :pageCurrent="2" :pagesNum="2" />