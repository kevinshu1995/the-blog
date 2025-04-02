<template>
    <span
        :class="['inline-block icon', props.size ?? 'size-4', props.bg ?? 'dark:bg-white bg-black']"
        :style="`--svg: url('https://api.iconify.design/simple-icons/${props.icon}.svg')`"
    />
</template>

<script setup lang="ts">
const props = defineProps<{
    icon: string;
    size?: string;
    bg?: string;
}>();
</script>

<style scoped>
.icon {
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
}
</style>
