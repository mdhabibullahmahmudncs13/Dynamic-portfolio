<script lang="ts">
  import { onMount } from 'svelte';
  import { getSkills } from '$lib/services/portfolio';
  import type { Skill } from '$lib/types';

  let skills: Skill[] = [];
  let loading = true;
  let selectedCategory = 'all';

  const categories = ['all', 'language', 'framework', 'tool', 'platform', 'other'];

  onMount(async () => {
    skills = await getSkills();
    loading = false;
  });

  $: filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);
</script>

<section id="skills" class="py-20 bg-cyber-dark/30">
  <div class="container mx-auto px-4">
    <h2 class="section-title text-center mb-12">Technical Arsenal</h2>

    <!-- Category Filter -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {#each categories as category}
        <button
          on:click={() => selectedCategory = category}
          class={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-cyber-blue text-cyber-dark'
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
    {:else if filteredSkills.length > 0}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each filteredSkills as skill}
          <div class="card group hover:scale-105 transition-transform duration-300">
            <div class="text-center">
              {#if skill.icon}
                <div class="text-4xl mb-3">{skill.icon}</div>
              {/if}
              <h3 class="text-lg font-semibold text-cyber-blue mb-2">{skill.name}</h3>
              
              <!-- Proficiency Bar -->
              <div class="w-full bg-cyber-dark rounded-full h-2 mb-2">
                <div 
                  class="h-2 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple transition-all duration-500"
                  style="width: {skill.proficiency}%"
                ></div>
              </div>
              <p class="text-xs text-gray-400">{skill.proficiency}% Proficiency</p>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-400">No skills available for this category.</p>
    {/if}
  </div>
</section>
