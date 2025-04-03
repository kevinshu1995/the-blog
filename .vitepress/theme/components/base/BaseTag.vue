<template>
    <component
        :is="href ? 'a' : 'button'"
        :class="[
            'inline-block duration-400 rounded-0.5 cursor-pointer',
            'bg-[var(--vp-c-bg-alt)] text-[var(--vp-c-text-1)] hover:text-[var(--vp-c-brand)]',
            fontSize || 'text-4',
            padding || 'px-3',
            margin || 'my-1.5 mx-2',
        ]"
    >
        {{ text }}
        <sup v-if="sup" class="text-[var(--vp-c-brand)] font-bold">{{ sup }}</sup>
    </component>
</template>

<script setup lang="ts">
defineProps<{
    text: string;
    sup?: string;
    fontSize?: string;
    href?: string;
    padding?: string;
    margin?: string;
}>();
</script>
