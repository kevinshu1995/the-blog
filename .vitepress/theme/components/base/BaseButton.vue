<template>
    <component
        :is="href ? 'a' : 'button'"
        :href="href"
        :class="[border, padding, textColor, bg, 'rounded']"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
defineProps({
    href: {
        type: String,
        default: '',
    },
    border: {
        type: String,
        default: 'border border-solid border-[var(--vp-c-text-1)]',
    },
    padding: {
        type: String,
        default: 'py-2 px-4',
    },
    textColor: {
        type: String,
        default: 'text-[var(--vp-c-text-1)] hover:text-[var(--vp-c-bg)]',
    },
    bg: {
        type: String,
        default: 'bg-[var(--vp-c-bg)] hover:bg-[var(--vp-c-text-1)]',
    },
});
</script>
