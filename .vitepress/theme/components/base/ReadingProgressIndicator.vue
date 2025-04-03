<template>
    <div
        :class="[
            'fixed right-0 bottom-0 m-8 flex flex-col items-center justify-center gap-2 transition-opacity',
            percentage > 5 ? 'opacity-100' : 'opacity-0',
        ]"
    >
        <span class="text-3 w-[6ch] text-center">{{ percentage }} %</span>
        <button
            @click="scrollToTop"
            class="bg-[var(--vp-c-text-1)] text-[var(--vp-c-bg)] transition-transform hover:translate-y-[-4px] hover:underline rounded-full size-8 flex justify-center items-center"
        >
            <BaseIcon icon="mynaui/arrow-up" bg="bg-[var(--vp-c-bg)]" size="size-5" />
        </button>
    </div>
</template>

<script setup lang="ts">
import usePagePercentage from './../../composable/usePagePercentage';
import { useWindowScroll } from '@vueuse/core';

const { y: windowY } = useWindowScroll({ behavior: 'smooth' });
const { percentage } = usePagePercentage();

function scrollToTop() {
    windowY.value = 0;
}
</script>
