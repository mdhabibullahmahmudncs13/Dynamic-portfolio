<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Experience from '$lib/components/Experience.svelte';
  import Certifications from '$lib/components/Certifications.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  
  let scrollY = 0;

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:head>
  <title>Portfolio - Cybersecurity & DevOps Expert</title>
  <meta name="description" content="Portfolio of a Python Developer, Full Stack Developer, Cybersecurity Expert, and DevOps Engineer" />
</svelte:head>

<div class="min-h-screen">
  <Navigation {scrollY} />
  
  <main>
    <Hero />
    <Skills />
    <Projects />
    <Experience />
    <Certifications />
    <Contact />
  </main>

  <!-- Footer -->
  <footer class="border-t border-zinc-900 py-8 bg-black">
    <div class="container mx-auto px-4 text-center">
      <p class="text-gray-600 text-sm">
        © {new Date().getFullYear()} All rights reserved. Built with SvelteKit & Appwrite.
      </p>
    </div>
  </footer>
</div>
