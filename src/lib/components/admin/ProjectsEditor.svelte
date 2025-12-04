<script lang="ts">
  import { onMount } from 'svelte';
  import { getProjects, createProject, updateProject, deleteProject, uploadFile } from '$lib/services/portfolio';
  import type { Project } from '$lib/types';

  let projects: Project[] = [];
  let loading = true;
  let message = '';
  let editingProject: Project | null = null;
  let showForm = false;

  let formData = {
    title: '',
    description: '',
    longDescription: '',
    mediaType: 'image' as 'image' | 'video',
    imageUrl: '',
    videoUrl: '',
    demoUrl: '',
    githubUrl: '',
    technologies: [] as string[],
    techInput: '',
    category: 'fullstack' as 'cybersecurity' | 'devops' | 'fullstack' | 'python' | 'videography' | 'other',
    featured: false,
    order: 0,
    createdAt: new Date().toISOString()
  };

  const categories = ['cybersecurity', 'devops', 'fullstack', 'python', 'videography', 'other'];

  onMount(async () => {
    await loadProjects();
  });

  async function loadProjects() {
    loading = true;
    projects = await getProjects();
    loading = false;
  }

  function resetForm() {
    formData = {
      title: '',
      description: '',
      longDescription: '',
      mediaType: 'image',
      imageUrl: '',
      videoUrl: '',
      demoUrl: '',
      githubUrl: '',
      technologies: [],
      techInput: '',
      category: 'fullstack',
      featured: false,
      order: projects.length,
      createdAt: new Date().toISOString()
    };
    editingProject = null;
    showForm = false;
  }

  function handleEdit(project: Project) {
    editingProject = project;
    formData = {
      ...project,
      techInput: '',
      technologies: Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies as any)
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

  async function handleVideoUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadFile(file);
      formData.videoUrl = url;
    } catch (error: any) {
      message = `Upload error: ${error.message}`;
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    message = '';

    const submitData = {
      ...formData,
      technologies: formData.technologies
    };
    delete (submitData as any).techInput;

    try {
      if (editingProject) {
        await updateProject(editingProject.$id!, submitData);
        message = 'Project updated successfully!';
      } else {
        await createProject(submitData);
        message = 'Project added successfully!';
      }
      await loadProjects();
      resetForm();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }

  async function handleDelete(id: string) {
    if (!id || !confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(id);
      message = 'Project deleted successfully!';
      await loadProjects();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold text-primary-500">Projects Management</h2>
    <button on:click={() => { resetForm(); showForm = true; }} class="btn-primary">
      + Add Project
    </button>
  </div>

  {#if message}
    <div class={`p-4 rounded-xl ${message.includes('Error') ? 'bg-red-500/10 border border-red-500 text-red-400' : 'bg-green-500/10 border border-green-500 text-green-400'}`}>
      {message}
    </div>
  {/if}

  {#if showForm}
    <div class="card">
      <h3 class="text-xl font-bold text-primary-500 mb-4">
        {editingProject ? 'Edit Project' : 'Add New Project'}
      </h3>
      
      <form on:submit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Title *</label>
          <input type="text" bind:value={formData.title} required class="input-field" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Short Description *</label>
          <textarea bind:value={formData.description} required rows="2" class="input-field"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Long Description</label>
          <textarea bind:value={formData.longDescription} rows="4" class="input-field"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Media Type</label>
          <div class="flex gap-4 mb-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={formData.mediaType} value="image" class="w-4 h-4" />
              <span class="text-gray-400">Image</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={formData.mediaType} value="video" class="w-4 h-4" />
              <span class="text-gray-400">Video</span>
            </label>
          </div>

          {#if formData.mediaType === 'image'}
            <label class="block text-sm font-medium text-gray-400 mb-2">Project Image</label>
            <input type="file" accept="image/*" on:change={handleImageUpload} class="input-field" />
            {#if formData.imageUrl}
              <img src={formData.imageUrl} alt="Preview" class="mt-2 w-full h-48 object-cover rounded-xl" />
            {/if}
          {:else}
            <label class="block text-sm font-medium text-gray-400 mb-2">Project Video</label>
            <input type="file" accept="video/*" on:change={handleVideoUpload} class="input-field" />
            {#if formData.videoUrl}
              <video src={formData.videoUrl} controls class="mt-2 w-full h-48 object-cover rounded-xl"></video>
            {/if}
          {/if}
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Demo URL</label>
            <input type="url" bind:value={formData.demoUrl} class="input-field" placeholder="https://demo.example.com" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">GitHub URL</label>
            <input type="url" bind:value={formData.githubUrl} class="input-field" placeholder="https://github.com/..." />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Technologies</label>
          <div class="flex gap-2 mb-2">
            <input
              type="text"
              bind:value={formData.techInput}
              on:keypress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              class="input-field flex-1"
              placeholder="e.g., React, Node.js"
            />
            <button type="button" on:click={addTechnology} class="btn-secondary">Add</button>
          </div>
          <div class="flex flex-wrap gap-2">
            {#each formData.technologies as tech, i}
              <span class="px-3 py-1 bg-primary-500/20 border border-primary-500 rounded-full text-sm flex items-center gap-2">
                {tech}
                <button type="button" on:click={() => removeTechnology(i)} class="text-red-400 hover:text-red-300">×</button>
              </span>
            {/each}
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Category *</label>
            <select bind:value={formData.category} class="input-field" required>
              {#each categories as cat}
                <option value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              {/each}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Display Order</label>
            <input type="number" bind:value={formData.order} class="input-field" />
          </div>
          <div class="flex items-end">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" bind:checked={formData.featured} class="w-5 h-5" />
              <span class="text-sm text-gray-400">Featured Project</span>
            </label>
          </div>
        </div>

        <div class="flex gap-4 justify-end">
          <button type="button" on:click={resetForm} class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">{editingProject ? 'Update' : 'Add'} Project</button>
        </div>
      </form>
    </div>
  {/if}

  {#if loading}
    <div class="text-center py-12">
      <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else if projects.length > 0}
    <div class="grid gap-4">
      {#each projects as project}
        <div class="card">
          <div class="flex gap-4">
            {#if project.mediaType === 'video' && project.videoUrl}
              <video src={project.videoUrl} class="w-32 h-32 object-cover rounded-xl" muted></video>
            {:else if project.imageUrl}
              <img src={project.imageUrl} alt={project.title} class="w-32 h-32 object-cover rounded-xl" />
            {/if}
            <div class="flex-1">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-xl font-bold text-primary-500">{project.title}</h3>
                  {#if project.featured}
                    <span class="text-xs bg-primary-500 px-2 py-1 rounded-full">FEATURED</span>
                  {/if}
                </div>
                <div class="flex gap-2">
                  <button on:click={() => handleEdit(project)} class="text-primary-500 hover:text-primary-500">✏️</button>
                  <button on:click={() => handleDelete(project.$id)} class="text-red-400 hover:text-red-300">🗑️</button>
                </div>
              </div>
              <p class="text-gray-400 mb-2">{project.description}</p>
              <div class="flex flex-wrap gap-2">
                {#each Array.isArray(project.technologies) ? project.technologies : [] as tech}
                  <span class="px-2 py-1 bg-zinc-950 border border-primary-500/30 rounded text-xs">{tech}</span>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="card text-center text-gray-400">
      <p>No projects added yet.</p>
    </div>
  {/if}
</div>
