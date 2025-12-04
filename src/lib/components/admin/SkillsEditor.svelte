<script lang="ts">
  import { onMount } from 'svelte';
  import { getSkills, createSkill, updateSkill, deleteSkill } from '$lib/services/portfolio';
  import type { Skill } from '$lib/types';

  let skills: Skill[] = [];
  let loading = true;
  let message = '';
  let editingSkill: Skill | null = null;
  let showForm = false;

  let formData = {
    name: '',
    category: 'language' as 'language' | 'framework' | 'tool' | 'platform' | 'other',
    proficiency: 50,
    icon: '',
    order: 0
  };

  const categories = ['language', 'framework', 'tool', 'platform', 'other'];

  onMount(async () => {
    await loadSkills();
  });

  async function loadSkills() {
    loading = true;
    skills = await getSkills();
    loading = false;
  }

  function resetForm() {
    formData = {
      name: '',
      category: 'language',
      proficiency: 50,
      icon: '',
      order: skills.length
    };
    editingSkill = null;
    showForm = false;
  }

  function handleEdit(skill: Skill) {
    editingSkill = skill;
    formData = {
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || '',
      order: skill.order
    };
    showForm = true;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    message = '';

    try {
      if (editingSkill) {
        await updateSkill(editingSkill.$id!, formData);
        message = 'Skill updated successfully!';
      } else {
        await createSkill(formData);
        message = 'Skill added successfully!';
      }
      await loadSkills();
      resetForm();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }

  async function handleDelete(id: string) {
    if (!id || !confirm('Are you sure you want to delete this skill?')) return;

    try {
      await deleteSkill(id);
      message = 'Skill deleted successfully!';
      await loadSkills();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold text-primary-500">Skills Management</h2>
    <button
      on:click={() => { resetForm(); showForm = true; }}
      class="btn-primary"
    >
      + Add Skill
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
        {editingSkill ? 'Edit Skill' : 'Add New Skill'}
      </h3>
      
      <form on:submit={handleSubmit} class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">
              Skill Name *
            </label>
            <input
              type="text"
              bind:value={formData.name}
              required
              class="input-field"
              placeholder="e.g., Python"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">
              Category *
            </label>
            <select bind:value={formData.category} class="input-field" required>
              {#each categories as cat}
                <option value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">
              Proficiency: {formData.proficiency}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              bind:value={formData.proficiency}
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">
              Icon (Emoji)
            </label>
            <input
              type="text"
              bind:value={formData.icon}
              class="input-field"
              placeholder="🐍"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">
            Display Order
          </label>
          <input
            type="number"
            bind:value={formData.order}
            class="input-field"
            placeholder="0"
          />
        </div>

        <div class="flex gap-4 justify-end">
          <button type="button" on:click={resetForm} class="btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn-primary">
            {editingSkill ? 'Update' : 'Add'} Skill
          </button>
        </div>
      </form>
    </div>
  {/if}

  {#if loading}
    <div class="text-center py-12">
      <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else if skills.length > 0}
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each skills as skill}
        <div class="card hover:border-primary-500/40">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center space-x-2">
              {#if skill.icon}
                <span class="text-2xl">{skill.icon}</span>
              {/if}
              <h3 class="text-lg font-bold text-primary-500">{skill.name}</h3>
            </div>
            <div class="flex gap-2">
              <button
                on:click={() => handleEdit(skill)}
                class="text-primary-500 hover:text-primary-500 transition-colors"
              >
                ✏️
              </button>
              <button
                on:click={() => handleDelete(skill.$id)}
                class="text-red-400 hover:text-red-300 transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-400 mb-2">{skill.category}</p>
          <div class="w-full bg-zinc-950 rounded-full h-2 mb-2">
            <div 
              class="h-2 rounded-full bg-primary-500"
              style="width: {skill.proficiency}%"
            ></div>
          </div>
          <p class="text-xs text-gray-400">{skill.proficiency}% Proficiency</p>
        </div>
      {/each}
    </div>
  {:else}
    <div class="card text-center text-gray-400">
      <p>No skills added yet. Click "Add Skill" to get started.</p>
    </div>
  {/if}
</div>
