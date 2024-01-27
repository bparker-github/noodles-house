<script setup lang="ts">
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  console.debug('LoginPage before mount.');
  window.location.pathname = '/login';
});
</script>
