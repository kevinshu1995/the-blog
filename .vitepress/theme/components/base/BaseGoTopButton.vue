<template>
    <button
        @click="scrollToTop"
        class="bg-[var(--vp-c-text-1)] text-[var(--vp-c-bg)] transition-transform hover:translate-y-[-4px] hover:underline rounded-full size-8 flex justify-center items-center"
    >
        <BaseIcon icon="mynaui/arrow-up" bg="bg-[var(--vp-c-bg)]" size="size-5" />
    </button>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';

const { y: windowY } = useWindowScroll({ behavior: 'smooth' });

function scrollToTop() {
    windowY.value = 0;
}
</script>
