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
  scrollY > 50 ? 'bg-black/90 backdrop-blur-lg border-b border-zinc-900' : 'bg-transparent'
}`}>
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <a href="/" class="text-xl font-bold text-white flex items-center gap-2">
        <span class="text-primary-500">⚡</span>
        PORTFOLIO
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-8">
        {#each navItems as item}
          <a 
            href={item.href}
            on:click={(e) => smoothScroll(e, item.href)}
            class="text-sm text-gray-400 hover:text-white transition-colors duration-200"
          >
            {item.name}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</nav>
