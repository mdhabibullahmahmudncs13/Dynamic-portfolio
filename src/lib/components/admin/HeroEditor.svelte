<script lang="ts">
  import { onMount } from 'svelte';
  import { getHero, updateHero, uploadFile } from '$lib/services/portfolio';
  import type { Hero } from '$lib/types';

  let hero: Hero | null = null;
  let loading = true;
  let saving = false;
  let message = '';

  let formData = {
    name: '',
    tagline: '',
    description: '',
    imageUrl: '',
    resumeUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: ''
  };

  onMount(async () => {
    hero = await getHero();
    if (hero) {
      formData = { ...formData, ...hero };
    }
    loading = false;
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    saving = true;
    message = '';

    try {
      await updateHero(formData, hero?.$id);
      message = 'Hero section updated successfully!';
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }

    saving = false;
  }

  async function handleImageUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadFile(file);
      formData.imageUrl = url;
    } catch (error: any) {
      message = `Upload error: ${error.message}`;
    }
  }

  async function handleResumeUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadFile(file);
      formData.resumeUrl = url;
    } catch (error: any) {
      message = `Upload error: ${error.message}`;
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold text-cyber-blue">Hero Section</h2>
  </div>

  {#if message}
    <div class={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-500/10 border border-red-500 text-red-400' : 'bg-green-500/10 border border-green-500 text-green-400'}`}>
      {message}
    </div>
  {/if}

  {#if loading}
    <div class="text-center py-12">
      <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else}
    <form on:submit={handleSubmit} class="card space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            bind:value={formData.name}
            required
            class="input-field"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Tagline *
          </label>
          <input
            type="text"
            bind:value={formData.tagline}
            required
            class="input-field"
            placeholder="Cybersecurity Expert & DevOps Engineer"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          bind:value={formData.description}
          required
          rows="4"
          class="input-field"
          placeholder="Describe yourself and your expertise..."
        ></textarea>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            on:change={handleImageUpload}
            class="input-field"
          />
          {#if formData.imageUrl}
            <img src={formData.imageUrl} alt="Preview" class="mt-2 w-32 h-32 object-cover rounded-lg" />
          {/if}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            on:change={handleResumeUpload}
            class="input-field"
          />
          {#if formData.resumeUrl}
            <p class="text-xs text-green-400 mt-2">✓ Resume uploaded</p>
          {/if}
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            bind:value={formData.githubUrl}
            class="input-field"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            bind:value={formData.linkedinUrl}
            class="input-field"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Twitter/X URL
        </label>
        <input
          type="url"
          bind:value={formData.twitterUrl}
          class="input-field"
          placeholder="https://twitter.com/username"
        />
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          class="btn-primary disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  {/if}
</div>
