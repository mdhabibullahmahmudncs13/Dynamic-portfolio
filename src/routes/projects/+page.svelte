<script lang="ts">
  import { onMount } from 'svelte';
  import { getProjects } from '$lib/services/portfolio';
  import type { Project } from '$lib/types';

  let projects: Project[] = [];
  let loading = true;
  let selectedCategory = 'featured';

  const categories = ['featured', 'cybersecurity', 'devops', 'fullstack', 'python', 'videography','other'];

  onMount(async () => {
    projects = await getProjects();
    loading = false;
  });

  $: filteredProjects = selectedCategory === 'featured' 
    ? projects.filter(p => p.featured) 
    : projects.filter(p => p.category === selectedCategory);
</script>

<svelte:head>
  <title>All Projects - Portfolio</title>
</svelte:head>

<div class="min-h-screen bg-black py-20">
  <div class="container mx-auto px-4">
    <div class="mb-12">
      <a href="/" class="text-primary-500 hover:text-primary-500/80 transition-colors flex items-center gap-2 mb-6">
        ← Back to Home
      </a>
      <h1 class="text-4xl md:text-5xl font-bold text-primary-500 mb-4">All Projects</h1>
      <p class="text-gray-400 max-w-2xl">
        Browse through all my projects in cybersecurity, DevOps automation, and full-stack development
      </p>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {#each categories as category}
        <button
          on:click={() => selectedCategory = category}
          class={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-primary-500 text-white'
              : 'bg-zinc-950 border border-primary-500/30 text-gray-400 hover:border-primary-500'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      {/each}
    </div>

    {#if loading}
      <div class="text-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    {:else if filteredProjects.length > 0}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredProjects as project}
          <div class="card group hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300">
            {#if project.videoUrl}
              <div class="relative overflow-hidden rounded-xl mb-4 aspect-video">
                <video 
                  src={project.videoUrl}
                  class="w-full h-full object-cover"
                  autoplay
                  loop
                  muted
                  playsinline
                ></video>
                {#if project.featured}
                  <div class="absolute top-2 right-2 bg-primary-500 px-3 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                {/if}
              </div>
            {:else if project.imageUrl}
              <div class="relative overflow-hidden rounded-xl mb-4 aspect-video">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {#if project.featured}
                  <div class="absolute top-2 right-2 bg-primary-500 px-3 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                {/if}
              </div>
            {/if}

            <h3 class="text-2xl font-bold text-primary-500 mb-2">{project.title}</h3>
            <p class="text-gray-400 mb-4">{project.description}</p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.technologies as tech}
                <span class="px-3 py-1 bg-zinc-950 border border-primary-500/30 rounded-full text-xs text-primary-500">
                  {tech}
                </span>
              {/each}
            </div>

            <!-- Links -->
            <div class="flex gap-4">
              {#if project.demoUrl}
                <a 
                  href={project.demoUrl} 
                  target="_blank"
                  class="flex-1 text-center py-3 bg-primary-500 text-zinc-900 rounded-xl font-semibold hover:bg-primary-500/80 transition-colors"
                >
                  Live Demo
                </a>
              {/if}
              {#if project.githubUrl}
                <a 
                  href={project.githubUrl} 
                  target="_blank"
                  class="flex-1 text-center py-3 border border-primary-500 text-primary-500 rounded-xl font-semibold hover:bg-primary-500 hover:text-zinc-900 transition-all"
                >
                  GitHub
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-400 py-20">No projects available for this category.</p>
    {/if}
  </div>
</div>
