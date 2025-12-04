<script lang="ts">
  import { onMount } from 'svelte';
  import { getProjects } from '$lib/services/portfolio';
  import type { Project } from '$lib/types';

  let projects: Project[] = [];
  let loading = true;
  let selectedCategory = 'featured';

  const categories = ['featured', 'fullstack', 'python', 'devops', 'cybersecurity', 'videography', 'other'];

  onMount(async () => {
    projects = await getProjects();
    console.log('Projects data:', projects);
    projects.forEach(p => {
      console.log(`Project: ${p.title}, videoUrl:`, p.videoUrl, 'imageUrl:', p.imageUrl);
    });
    loading = false;
  });

  $: filteredProjects = selectedCategory === 'featured' 
    ? projects.filter(p => p.featured) 
    : projects.filter(p => p.category === selectedCategory);
  
  $: displayedProjects = filteredProjects.slice(0, 3);
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
      <div class="text-center">
        <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    {:else if filteredProjects.length > 0}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each displayedProjects as project}
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
      
      {#if filteredProjects.length > 3}
        <div class="text-center mt-12">
          <a 
            href="/projects" 
            class="inline-block px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-500/80 transition-colors"
          >
            View All Projects
          </a>
        </div>
      {/if}
    {:else}
      <p class="text-center text-gray-400">No projects available for this category.</p>
    {/if}
  </div>
</section>
