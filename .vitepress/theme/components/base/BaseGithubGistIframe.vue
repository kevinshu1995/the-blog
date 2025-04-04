<template>
    <iframe
        :src="src"
        style="width: 100%; height: 300px"
        class="border border-neutral-200 dark:border-neutral-700"
    >
    </iframe>
</template>

<script setup lang="ts">
defineProps({
    src: {
        type: String,
        required: true,
    },
});
</script>
