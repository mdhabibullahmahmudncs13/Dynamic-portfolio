<script lang="ts">
  import { onMount } from 'svelte';
  import { getSkills } from '$lib/services/portfolio';
  import type { Skill } from '$lib/types';

  let skills: Skill[] = [];
  let loading = true;
  let selectedCategory = 'language';

  const categories = ['language', 'framework', 'tool', 'platform', 'other'];

  onMount(async () => {
    skills = await getSkills();
    loading = false;
  });

  $: filteredSkills = skills.filter(s => s.category === selectedCategory);
</script>

<section id="skills" class="py-20 bg-zinc-950/30">
  <div class="container mx-auto px-4">
    <h2 class="section-title text-center mb-12">Technical Arsenal</h2>

    <!-- Category Filter -->
    <div class="flex flex-wrap justify-center gap-2 mb-10">
      {#each categories as category}
        <button
          on:click={() => selectedCategory = category}
          class={`px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
            selectedCategory === category
              ? 'text-primary-500 border-b-2 border-primary-500'
              : 'text-gray-400 hover:text-gray-300'
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
    {:else if filteredSkills.length > 0}
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {#each filteredSkills as skill}
            <div class="group">
              <div class="flex items-center justify-between mb-1.5">
                <div class="flex items-center gap-2">
                  {#if skill.icon}
                    <span class="text-lg">{skill.icon}</span>
                  {/if}
                  <h3 class="text-sm font-medium text-white">{skill.name}</h3>
                </div>
                <span class="text-xs font-medium text-primary-500">{skill.proficiency}%</span>
              </div>
              
              <!-- Proficiency Bar -->
              <div class="w-full bg-zinc-900 rounded-full h-1 overflow-hidden">
                <div 
                  class="h-full bg-primary-500 rounded-full transition-all duration-700"
                  style="width: {skill.proficiency}%"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <p class="text-center text-gray-400">No skills available for this category.</p>
    {/if}
  </div>
</section>
