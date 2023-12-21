<template>
  <pre
    class="p-2 bg-nh-off-yellow-50 rounded-md shadow-inner-lg overflow-x-auto border border-nh-bourbon-950/25"
    style="clip-path: view-box"
  ><code class="font-mono text-nh-bourbon-950">{{ content }}</code></pre>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';

interface PreCodeBlockProps {
  data: T;
}
const props = defineProps<PreCodeBlockProps>();

const content = computed(() => (!props.data ? 'No Data' : JSON.stringify(props.data, null, 2)));
</script>
