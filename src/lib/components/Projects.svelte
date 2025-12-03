<script lang="ts">
  import { onMount } from 'svelte';
  import { getProjects } from '$lib/services/portfolio';
  import type { Project } from '$lib/types';

  let projects: Project[] = [];
  let loading = true;
  let selectedCategory = 'all';

  const categories = ['all', 'cybersecurity', 'devops', 'fullstack', 'python', 'other'];

  onMount(async () => {
    projects = await getProjects();
    loading = false;
  });

  $: filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);
</script>

<section id="projects" class="py-20">
  <div class="container mx-auto px-4">
    <h2 class="section-title text-center mb-4">Featured Projects</h2>
    <p class="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
      A showcase of my work in cybersecurity, DevOps automation, and full-stack development
    </p>

    <!-- Category Filter -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {#each categories as category}
        <button
          on:click={() => selectedCategory = category}
          class={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white'
              : 'bg-cyber-dark/50 border border-cyber-blue/30 text-gray-300 hover:border-cyber-blue'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      {/each}
    </div>

    {#if loading}
      <div class="text-center">
        <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    {:else if filteredProjects.length > 0}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredProjects as project}
          <div class="card group hover:shadow-2xl hover:shadow-cyber-blue/20 transition-all duration-300">
            {#if project.imageUrl}
              <div class="relative overflow-hidden rounded-lg mb-4 aspect-video">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {#if project.featured}
                  <div class="absolute top-2 right-2 bg-cyber-purple px-3 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                {/if}
              </div>
            {/if}

            <h3 class="text-2xl font-bold text-cyber-blue mb-2">{project.title}</h3>
            <p class="text-gray-300 mb-4">{project.description}</p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.technologies as tech}
                <span class="px-3 py-1 bg-cyber-dark/50 border border-cyber-blue/30 rounded-full text-xs text-cyber-blue">
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
                  class="flex-1 text-center py-2 bg-cyber-blue text-cyber-dark rounded-lg font-semibold hover:bg-cyber-blue/80 transition-colors"
                >
                  Live Demo
                </a>
              {/if}
              {#if project.githubUrl}
                <a 
                  href={project.githubUrl} 
                  target="_blank"
                  class="flex-1 text-center py-2 border border-cyber-blue text-cyber-blue rounded-lg font-semibold hover:bg-cyber-blue hover:text-cyber-dark transition-all"
                >
                  GitHub
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-400">No projects available for this category.</p>
    {/if}
  </div>
</section>
