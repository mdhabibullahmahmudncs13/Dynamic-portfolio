<script lang="ts">
  import { isAdmin } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  export let scrollY = 0;

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  function smoothScroll(e: MouseEvent, href: string) {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<nav class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrollY > 50 ? 'bg-cyber-dark/95 backdrop-blur-md shadow-lg shadow-cyber-blue/10' : 'bg-transparent'
}`}>
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <a href="/" class="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
        PORTFOLIO
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-8">
        {#each navItems as item}
          <a 
            href={item.href}
            on:click={(e) => smoothScroll(e, item.href)}
            class="text-gray-300 hover:text-cyber-blue transition-colors duration-200 relative group"
          >
            {item.name}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-blue transition-all duration-200 group-hover:w-full"></span>
          </a>
        {/each}
      </div>

      <!-- Admin Button -->
      <div>
        {#if $isAdmin}
          <button
            on:click={() => goto('/admin')}
            class="px-4 py-2 bg-cyber-purple text-white rounded-lg hover:bg-cyber-purple/80 transition-colors"
          >
            Admin Panel
          </button>
        {:else}
          <button
            on:click={() => goto('/login')}
            class="px-4 py-2 border border-cyber-blue text-cyber-blue rounded-lg hover:bg-cyber-blue hover:text-cyber-dark transition-all"
          >
            Admin
          </button>
        {/if}
      </div>
    </div>
  </div>
</nav>
