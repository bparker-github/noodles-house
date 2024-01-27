<script setup lang="ts">
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  console.debug('LogoutPage before mount.');
  window.location.pathname = '/logout';
});
</script>
