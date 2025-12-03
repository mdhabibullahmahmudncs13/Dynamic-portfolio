<script lang="ts">
  import { onMount } from 'svelte';
  import { getExperience, createExperience, updateExperience, deleteExperience } from '$lib/services/portfolio';
  import type { Experience } from '$lib/types';

  let experiences: Experience[] = [];
  let loading = true;
  let message = '';
  let editingExp: Experience | null = null;
  let showForm = false;

  let formData = {
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: [] as string[],
    techInput: '',
    order: 0
  };

  onMount(async () => {
    await loadExperiences();
  });

  async function loadExperiences() {
    loading = true;
    experiences = await getExperience();
    loading = false;
  }

  function resetForm() {
    formData = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      technologies: [],
      techInput: '',
      order: experiences.length
    };
    editingExp = null;
    showForm = false;
  }

  function handleEdit(exp: Experience) {
    editingExp = exp;
    formData = {
      ...exp,
      techInput: '',
      technologies: Array.isArray(exp.technologies) ? exp.technologies : JSON.parse(exp.technologies as any),
      startDate: exp.startDate.split('T')[0],
      endDate: exp.endDate ? exp.endDate.split('T')[0] : ''
    };
    showForm = true;
  }

  function addTechnology() {
    if (formData.techInput.trim()) {
      formData.technologies = [...formData.technologies, formData.techInput.trim()];
      formData.techInput = '';
    }
  }

  function removeTechnology(index: number) {
    formData.technologies = formData.technologies.filter((_, i) => i !== index);
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    message = '';

    const submitData = {
      ...formData,
      technologies: formData.technologies,
      endDate: formData.endDate || undefined
    };
    delete (submitData as any).techInput;

    try {
      if (editingExp) {
        await updateExperience(editingExp.$id!, submitData);
        message = 'Experience updated successfully!';
      } else {
        await createExperience(submitData);
        message = 'Experience added successfully!';
      }
      await loadExperiences();
      resetForm();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }

  async function handleDelete(id: string) {
    if (!id || !confirm('Are you sure you want to delete this experience entry?')) return;

    try {
      await deleteExperience(id);
      message = 'Experience deleted successfully!';
      await loadExperiences();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold text-cyber-blue">Experience Management</h2>
    <button on:click={() => { resetForm(); showForm = true; }} class="btn-primary">
      + Add Experience
    </button>
  </div>

  {#if message}
    <div class={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-500/10 border border-red-500 text-red-400' : 'bg-green-500/10 border border-green-500 text-green-400'}`}>
      {message}
    </div>
  {/if}

  {#if showForm}
    <div class="card">
      <h3 class="text-xl font-bold text-cyber-purple mb-4">
        {editingExp ? 'Edit Experience' : 'Add New Experience'}
      </h3>
      
      <form on:submit={handleSubmit} class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Company *</label>
            <input type="text" bind:value={formData.company} required class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Position *</label>
            <input type="text" bind:value={formData.position} required class="input-field" />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Start Date *</label>
            <input type="date" bind:value={formData.startDate} required class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">End Date (Leave blank if current)</label>
            <input type="date" bind:value={formData.endDate} class="input-field" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Description *</label>
          <textarea bind:value={formData.description} required rows="4" class="input-field"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
          <div class="flex gap-2 mb-2">
            <input
              type="text"
              bind:value={formData.techInput}
              on:keypress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              class="input-field flex-1"
              placeholder="e.g., Docker, Kubernetes"
            />
            <button type="button" on:click={addTechnology} class="btn-secondary">Add</button>
          </div>
          <div class="flex flex-wrap gap-2">
            {#each formData.technologies as tech, i}
              <span class="px-3 py-1 bg-cyber-purple/20 border border-cyber-purple rounded-full text-sm flex items-center gap-2">
                {tech}
                <button type="button" on:click={() => removeTechnology(i)} class="text-red-400 hover:text-red-300">×</button>
              </span>
            {/each}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
          <input type="number" bind:value={formData.order} class="input-field" />
        </div>

        <div class="flex gap-4 justify-end">
          <button type="button" on:click={resetForm} class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">{editingExp ? 'Update' : 'Add'} Experience</button>
        </div>
      </form>
    </div>
  {/if}

  {#if loading}
    <div class="text-center py-12">
      <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else if experiences.length > 0}
    <div class="space-y-4">
      {#each experiences as exp}
        <div class="card">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-xl font-bold text-cyber-blue">{exp.position}</h3>
              <p class="text-gray-300">{exp.company}</p>
              <p class="text-sm text-gray-400">{new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
            </div>
            <div class="flex gap-2">
              <button on:click={() => handleEdit(exp)} class="text-cyber-purple hover:text-cyber-blue">✏️</button>
              <button on:click={() => handleDelete(exp.$id)} class="text-red-400 hover:text-red-300">🗑️</button>
            </div>
          </div>
          <p class="text-gray-400 mb-3">{exp.description}</p>
          <div class="flex flex-wrap gap-2">
            {#each Array.isArray(exp.technologies) ? exp.technologies : [] as tech}
              <span class="px-2 py-1 bg-cyber-dark border border-cyber-purple/30 rounded text-xs">{tech}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="card text-center text-gray-400">
      <p>No experience entries added yet.</p>
    </div>
  {/if}
</div>
