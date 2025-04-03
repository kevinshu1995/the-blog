import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useWindowSize, useWindowScroll } from '@vueuse/core';

export default function usePagePercentage() {
    const { height: windowHeight } = useWindowSize();
    const { y: windowScrollY } = useWindowScroll();

    const scrollHeight = ref(0);

    const updateScrollInfo = () => {
        scrollHeight.value = document.documentElement.scrollHeight;
    };

    onMounted(() => {
        updateScrollInfo();
        window.addEventListener('scroll', updateScrollInfo);
        window.addEventListener('resize', updateScrollInfo);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', updateScrollInfo);
        window.removeEventListener('resize', updateScrollInfo);
    });

    const percentage = computed(() => {
        if (windowHeight.value) {
            return Math.round(
                (windowScrollY.value / (scrollHeight.value - windowHeight.value)) * 100,
            );
        }
        return 0;
    });

    return { percentage };
}
