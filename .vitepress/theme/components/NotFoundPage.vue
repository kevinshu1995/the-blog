<template>
    <div class="flex flex-col justify-center items-center min-h-[80vh]">
        <div class="max-w-[500px] px-2 flex flex-col justify-center items-center gap-8 text-center">
            <div class="space-y-0">
                <p class="!text-16 font-bold">404</p>
                <h1 class="!text-8 font-bold">頁面神秘失蹤中</h1>
            </div>
            <img :src="randomImageSrc" alt="error image" class="max-w-[300px]" />
            <div>
                <p>啊哈！看來你找到了這個部落格的秘密入口！</p>
                <p>
                    不幸的是，這個入口通往的頁面正在宇宙的某處度假。可能是去了馬爾地夫曬太陽，也可能只是躲在伺服器的某個角落偷懶。
                </p>
            </div>
            <a
                href="/"
                class="border border-[var(--vp-c-text-1)] py-2 px-4 rounded hover:bg-[var(--vp-c-text-1)] hover:text-[var(--vp-c-bg)]"
            >
                回到首頁
            </a>
            <div class="space-y-2">
                <p>也可以使用<span class="font-bold">搜尋功能</span></p>
                <p>或許能找到那個躲貓貓的頁面</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const errorImgs = [
    'https://i.giphy.com/1BXa2alBjrCXC.webp',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWh4YW1pbzZkejVqMHp5NHNwNDJtenIyc3Y2ZTRkZm5nOWNnbzEyMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0GtVKtagi2GvWuY3vm/giphy.gif',
    'https://i.giphy.com/1RkDDoIVs3ntm.webp',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmI0eGFwZHBlb3JhNjI1dmNuNTNqMHA2N2NzOWd0Mm9uM3g0ZTJ1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/q69ME0ooMhyl5jdbGW/giphy.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW1wcTZpOGkxbzc5M2l1MGFhOHg3ZmNob2RuM2hqYmZyb3E5bGZyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/brz2oywQHuUh3sXyWd/giphy.gif',
    'https://i.giphy.com/TIejJSkHLZh4s.webp',
    'https://i.giphy.com/VwoJkTfZAUBSU.webp',
    'https://c.tenor.com/PPOe9MawAvsAAAAd/tenor.gif',
];

const randomImageSrc = computed(() => {
    const randomIndex = Math.floor(Math.random() * errorImgs.length);
    return errorImgs[randomIndex];
});
</script>
