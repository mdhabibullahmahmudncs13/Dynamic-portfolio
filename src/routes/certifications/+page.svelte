<script lang="ts">
  import { onMount } from 'svelte';
  import { getCertifications } from '$lib/services/portfolio';
  import type { Certification } from '$lib/types';

  let certifications: Certification[] = [];
  let loading = true;
  let selectedType = 'certificate';

  const types = ['certificate', 'achievements', 'participation'];

  onMount(async () => {
    certifications = await getCertifications();
    loading = false;
  });

  $: filteredCertifications = certifications.filter(c => c.type === selectedType || !c.type);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
</script>

<svelte:head>
  <title>All Certifications - Portfolio</title>
</svelte:head>

<div class="min-h-screen bg-black py-20">
  <div class="container mx-auto px-4">
    <div class="mb-12">
      <a href="/" class="text-primary-500 hover:text-primary-500/80 transition-colors flex items-center gap-2 mb-6">
        ← Back to Home
      </a>
      <h1 class="text-4xl md:text-5xl font-bold text-primary-500 mb-4">All Certifications & Credentials</h1>
      <p class="text-gray-400 max-w-2xl">
        View all my professional certifications, achievements, and credentials
      </p>
    </div>

    <!-- Type Filter -->
    <div class="flex flex-wrap justify-center gap-2 mb-12">
      {#each types as type}
        <button
          on:click={() => selectedType = type}
          class={`px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
            selectedType === type
              ? 'text-primary-500 border-b-2 border-primary-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      {/each}
    </div>

    {#if loading}
      <div class="text-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    {:else if filteredCertifications.length > 0}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredCertifications as cert}
          <div class="card group hover:scale-105 transition-transform duration-300">
            {#if cert.imageUrl}
              <div class="mb-4 overflow-hidden rounded-xl">
                <img 
                  src={cert.imageUrl} 
                  alt={cert.name}
                  class="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            {/if}

            <h3 class="text-xl font-bold text-primary-500 mb-2">{cert.name}</h3>
            <p class="text-gray-400 mb-2">{cert.issuer}</p>
            <p class="text-sm text-gray-400 mb-4">
              Issued: {formatDate(cert.issueDate)}
              {#if cert.expiryDate}
                <br />Expires: {formatDate(cert.expiryDate)}
              {/if}
            </p>

            {#if cert.credentialUrl}
              <a 
                href={cert.credentialUrl} 
                target="_blank"
                class="inline-block px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-500/80 transition-colors text-sm font-semibold"
              >
                View Credential
              </a>
            {/if}

            {#if cert.credentialId}
              <p class="text-xs text-gray-500 mt-2">ID: {cert.credentialId}</p>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-400 py-20">No certifications available.</p>
    {/if}
  </div>
</div>
