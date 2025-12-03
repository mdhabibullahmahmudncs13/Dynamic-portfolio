<script lang="ts">
  import { onMount } from 'svelte';
  import { getCertifications } from '$lib/services/portfolio';
  import type { Certification } from '$lib/types';

  let certifications: Certification[] = [];
  let loading = true;

  onMount(async () => {
    certifications = await getCertifications();
    loading = false;
  });

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
</script>

<section id="certifications" class="py-20">
  <div class="container mx-auto px-4">
    <h2 class="section-title text-center mb-12">Certifications & Credentials</h2>

    {#if loading}
      <div class="text-center">
        <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    {:else if certifications.length > 0}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each certifications as cert}
          <div class="card group hover:scale-105 transition-transform duration-300">
            {#if cert.imageUrl}
              <div class="mb-4 overflow-hidden rounded-lg">
                <img 
                  src={cert.imageUrl} 
                  alt={cert.name}
                  class="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            {/if}

            <h3 class="text-xl font-bold text-cyber-blue mb-2">{cert.name}</h3>
            <p class="text-gray-300 mb-2">{cert.issuer}</p>
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
                class="inline-block px-4 py-2 bg-cyber-purple text-white rounded-lg hover:bg-cyber-purple/80 transition-colors text-sm font-semibold"
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
      <p class="text-center text-gray-400">No certifications available.</p>
    {/if}
  </div>
</section>
