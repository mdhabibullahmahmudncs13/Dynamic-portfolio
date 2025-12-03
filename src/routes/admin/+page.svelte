<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isAdmin } from '$lib/stores/auth';
  import { logout } from '$lib/services/auth';
  
  let currentSection = 'hero';
  let adminAuthenticated = false;

  isAdmin.subscribe(value => {
    adminAuthenticated = value;
  });

  onMount(() => {
    if (!adminAuthenticated) {
      goto('/login');
    }
  });

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: '🎯' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'certifications', name: 'Certifications', icon: '🎓' },
    { id: 'contact', name: 'Contact', icon: '📧' },
    { id: 'blog', name: 'Blog Posts', icon: '📝' }
  ];

  async function handleLogout() {
    await logout();
  }
</script>

<svelte:head>
  <title>Admin Panel - Portfolio</title>
</svelte:head>

{#if adminAuthenticated}
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <div class="w-64 bg-cyber-dark/50 border-r border-cyber-blue/20 p-6">
      <div class="mb-8">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <p class="text-gray-400 text-sm mt-1">Portfolio Management</p>
      </div>

      <nav class="space-y-2">
        {#each sections as section}
          <button
            on:click={() => currentSection = section.id}
            class={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
              currentSection === section.id
                ? 'bg-cyber-blue text-cyber-dark font-semibold'
                : 'text-gray-300 hover:bg-cyber-dark/50 hover:text-cyber-blue'
            }`}
          >
            <span class="text-xl">{section.icon}</span>
            <span>{section.name}</span>
          </button>
        {/each}
      </nav>

      <div class="mt-8 pt-8 border-t border-cyber-blue/20 space-y-2">
        <a href="/" class="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-cyber-dark/50 hover:text-cyber-blue transition-all duration-200">
          🏠 View Portfolio
        </a>
        <button
          on:click={handleLogout}
          class="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
        >
          🚪 Logout
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <div class="max-w-6xl mx-auto">
        {#if currentSection === 'hero'}
          {#await import('$lib/components/admin/HeroEditor.svelte')}
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          {:then module}
            <svelte:component this={module.default} />
          {/await}
        {:else if currentSection === 'skills'}
          {#await import('$lib/components/admin/SkillsEditor.svelte')}
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          {:then module}
            <svelte:component this={module.default} />
          {/await}
        {:else if currentSection === 'projects'}
          {#await import('$lib/components/admin/ProjectsEditor.svelte')}
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          {:then module}
            <svelte:component this={module.default} />
          {/await}
        {:else if currentSection === 'experience'}
          {#await import('$lib/components/admin/ExperienceEditor.svelte')}
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          {:then module}
            <svelte:component this={module.default} />
          {/await}
        {:else if currentSection === 'certifications'}
          {#await import('$lib/components/admin/CertificationsEditor.svelte')}
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          {:then module}
            <svelte:component this={module.default} />
          {/await}
        {:else if currentSection === 'contact'}
          {#await import('$lib/components/admin/ContactEditor.svelte')}
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          {:then module}
            <svelte:component this={module.default} />
          {/await}
        {:else if currentSection === 'blog'}
          {#await import('$lib/components/admin/BlogEditor.svelte')}
            <div class="text-center">
              <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          {:then module}
            <svelte:component this={module.default} />
          {/await}
        {/if}
      </div>
    </div>
  </div>
{/if}
