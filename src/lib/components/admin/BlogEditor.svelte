<script lang="ts">
  import { onMount } from 'svelte';
  import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, uploadFile } from '$lib/services/portfolio';
  import type { BlogPost } from '$lib/types';

  let posts: BlogPost[] = [];
  let loading = true;
  let message = '';
  let editingPost: BlogPost | null = null;
  let showForm = false;

  let formData = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    tags: [] as string[],
    tagInput: '',
    published: false,
    publishedAt: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  onMount(async () => {
    await loadPosts();
  });

  async function loadPosts() {
    loading = true;
    posts = await getBlogPosts(false);
    loading = false;
  }

  function resetForm() {
    formData = {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      tags: [],
      tagInput: '',
      published: false,
      publishedAt: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    editingPost = null;
    showForm = false;
  }

  function handleEdit(post: BlogPost) {
    editingPost = post;
    formData = {
      ...post,
      tagInput: '',
      tags: Array.isArray(post.tags) ? post.tags : JSON.parse(post.tags as any),
      publishedAt: post.publishedAt ? post.publishedAt.split('T')[0] : ''
    };
    showForm = true;
  }

  function generateSlug() {
    formData.slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function addTag() {
    if (formData.tagInput.trim()) {
      formData.tags = [...formData.tags, formData.tagInput.trim()];
      formData.tagInput = '';
    }
  }

  function removeTag(index: number) {
    formData.tags = formData.tags.filter((_, i) => i !== index);
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

  async function handleSubmit(e: Event) {
    e.preventDefault();
    message = '';

    const submitData = {
      ...formData,
      tags: formData.tags,
      updatedAt: new Date().toISOString(),
      publishedAt: formData.published ? (formData.publishedAt || new Date().toISOString()) : undefined
    };
    delete (submitData as any).tagInput;

    try {
      if (editingPost) {
        await updateBlogPost(editingPost.$id!, submitData);
        message = 'Blog post updated successfully!';
      } else {
        await createBlogPost(submitData);
        message = 'Blog post created successfully!';
      }
      await loadPosts();
      resetForm();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }

  async function handleDelete(id: string) {
    if (!id || !confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await deleteBlogPost(id);
      message = 'Blog post deleted successfully!';
      await loadPosts();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold text-cyber-blue">Blog Posts</h2>
    <button on:click={() => { resetForm(); showForm = true; }} class="btn-primary">
      + New Post
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
        {editingPost ? 'Edit Post' : 'New Blog Post'}
      </h3>
      
      <form on:submit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Title *</label>
          <input
            type="text"
            bind:value={formData.title}
            on:blur={generateSlug}
            required
            class="input-field"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Slug (URL-friendly) *
          </label>
          <input type="text" bind:value={formData.slug} required class="input-field" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Excerpt *</label>
          <textarea bind:value={formData.excerpt} required rows="2" class="input-field"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Content (Markdown) *</label>
          <textarea bind:value={formData.content} required rows="12" class="input-field font-mono text-sm"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Featured Image</label>
          <input type="file" accept="image/*" on:change={handleImageUpload} class="input-field" />
          {#if formData.imageUrl}
            <img src={formData.imageUrl} alt="Preview" class="mt-2 w-full h-48 object-cover rounded-lg" />
          {/if}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Tags</label>
          <div class="flex gap-2 mb-2">
            <input
              type="text"
              bind:value={formData.tagInput}
              on:keypress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              class="input-field flex-1"
              placeholder="e.g., cybersecurity, tutorial"
            />
            <button type="button" on:click={addTag} class="btn-secondary">Add</button>
          </div>
          <div class="flex flex-wrap gap-2">
            {#each formData.tags as tag, i}
              <span class="px-3 py-1 bg-cyber-green/20 border border-cyber-green rounded-full text-sm flex items-center gap-2">
                {tag}
                <button type="button" on:click={() => removeTag(i)} class="text-red-400 hover:text-red-300">×</button>
              </span>
            {/each}
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" bind:checked={formData.published} class="w-5 h-5" />
            <span class="text-sm text-gray-300">Publish immediately</span>
          </label>
        </div>

        <div class="flex gap-4 justify-end">
          <button type="button" on:click={resetForm} class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">{editingPost ? 'Update' : 'Create'} Post</button>
        </div>
      </form>
    </div>
  {/if}

  {#if loading}
    <div class="text-center py-12">
      <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else if posts.length > 0}
    <div class="space-y-4">
      {#each posts as post}
        <div class="card">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-xl font-bold text-cyber-blue">{post.title}</h3>
                {#if post.published}
                  <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Published</span>
                {:else}
                  <span class="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">Draft</span>
                {/if}
              </div>
              <p class="text-gray-400 text-sm mb-2">{post.excerpt}</p>
              <div class="flex flex-wrap gap-2 mb-2">
                 {#each Array.isArray(post.tags) ? post.tags : [] as tag}
                  <span class="px-2 py-1 bg-cyber-dark border border-cyber-green/30 rounded text-xs">{tag}</span>
                {/each}
              </div>
              <p class="text-xs text-gray-500">
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div class="flex gap-2 ml-4">
              <button on:click={() => handleEdit(post)} class="text-cyber-purple hover:text-cyber-blue">✏️</button>
              <button on:click={() => handleDelete(post.$id)} class="text-red-400 hover:text-red-300">🗑️</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="card text-center text-gray-400">
      <p>No blog posts yet. Create your first post!</p>
    </div>
  {/if}
</div>
