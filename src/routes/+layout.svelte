<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { checkAuth } from '$lib/services/auth';

  onMount(async () => {
    await checkAuth();
  });
</script>

<div class="min-h-screen bg-black relative overflow-x-hidden">
  <!-- Content -->
  <div class="relative z-10">
    <slot />
  </div>
</div>
