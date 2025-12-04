<script lang="ts">
  import { onMount } from 'svelte';
  import { getExperience } from '$lib/services/portfolio';
  import type { Experience as ExperienceType } from '$lib/types';

  let experience: ExperienceType[] = [];
  let loading = true;

  onMount(async () => {
    experience = await getExperience();
    loading = false;
  });

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
</script>

<section id="experience" class="py-20 bg-zinc-950/30">
  <div class="container mx-auto px-4">
    <h2 class="section-title text-center mb-12">Professional Experience</h2>

    {#if loading}
      <div class="text-center">
        <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    {:else if experience.length > 0}
      <div class="max-w-4xl mx-auto">
        {#each experience as exp, index}
          <div class="relative pl-8 pb-12 border-l-2 border-primary-500/30 last:pb-0">
            <!-- Timeline Dot -->
            <div class="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-zinc-900er"></div>

            <div class="card ml-4">
              <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-primary-500 mb-1">{exp.position}</h3>
                  <p class="text-xl text-gray-400">{exp.company}</p>
                </div>
                <p class="text-gray-400 mt-2 md:mt-0">
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </p>
              </div>

              <p class="text-gray-400 mb-4 leading-relaxed">{exp.description}</p>

              {#if exp.technologies && exp.technologies.length > 0}
                <div class="flex flex-wrap gap-2">
                  {#each exp.technologies as tech}
                    <span class="px-3 py-1 bg-zinc-950 border border-primary-500/30 rounded-full text-xs text-primary-500">
                      {tech}
                    </span>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-400">No experience data available.</p>
    {/if}
  </div>
</section>
