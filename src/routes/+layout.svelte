<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { checkAuth } from '$lib/services/auth';

  onMount(async () => {
    await checkAuth();
  });
</script>

<div class="min-h-screen bg-cyber-darker relative overflow-x-hidden">
  <!-- Cyber Grid Background -->
  <div class="cyber-grid"></div>
  
  <!-- Content -->
  <div class="relative z-10">
    <slot />
  </div>
</div>
