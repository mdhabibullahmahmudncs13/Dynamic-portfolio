<script lang="ts">
  import { onMount } from 'svelte';
  import { getCertifications, createCertification, updateCertification, deleteCertification, uploadFile } from '$lib/services/portfolio';
  import type { Certification } from '$lib/types';

  let certifications: Certification[] = [];
  let loading = true;
  let message = '';
  let editingCert: Certification | null = null;
  let showForm = false;

  let formData = {
    name: '',
    issuer: '',
    type: 'certificate' as 'certificate' | 'achievements' | 'participation',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    imageUrl: '',
    order: 0
  };

  onMount(async () => {
    await loadCertifications();
  });

  async function loadCertifications() {
    loading = true;
    certifications = await getCertifications();
    loading = false;
  }

  function resetForm() {
    formData = {
      name: '',
      issuer: '',
      type: 'certificate',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      imageUrl: '',
      order: certifications.length
    };
    editingCert = null;
    showForm = false;
  }

  function handleEdit(cert: Certification) {
    editingCert = cert;
    formData = {
      ...cert,
      issueDate: cert.issueDate.split('T')[0],
      expiryDate: cert.expiryDate ? cert.expiryDate.split('T')[0] : ''
    };
    showForm = true;
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
      expiryDate: formData.expiryDate || undefined
    };

    try {
      if (editingCert) {
        await updateCertification(editingCert.$id!, submitData);
        message = 'Certification updated successfully!';
      } else {
        await createCertification(submitData);
        message = 'Certification added successfully!';
      }
      await loadCertifications();
      resetForm();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }

  async function handleDelete(id: string) {
    if (!id || !confirm('Are you sure you want to delete this certification?')) return;

    try {
      await deleteCertification(id);
      message = 'Certification deleted successfully!';
      await loadCertifications();
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold text-primary-500">Certifications Management</h2>
    <button on:click={() => { resetForm(); showForm = true; }} class="btn-primary">
      + Add Certification
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
        {editingCert ? 'Edit Certification' : 'Add New Certification'}
      </h3>
      
      <form on:submit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Certification Name *</label>
          <input type="text" bind:value={formData.name} required class="input-field" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Issuing Organization *</label>
          <input type="text" bind:value={formData.issuer} required class="input-field" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Type *</label>
          <select bind:value={formData.type} required class="input-field">
            <option value="certificate">Certificate</option>
            <option value="achievements">Achievements</option>
            <option value="participation">Participation</option>
          </select>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Issue Date *</label>
            <input type="date" bind:value={formData.issueDate} required class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Expiry Date (Optional)</label>
            <input type="date" bind:value={formData.expiryDate} class="input-field" />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Credential ID</label>
            <input type="text" bind:value={formData.credentialId} class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Credential URL</label>
            <input type="url" bind:value={formData.credentialUrl} class="input-field" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Badge/Certificate Image</label>
          <input type="file" accept="image/*" on:change={handleImageUpload} class="input-field" />
          {#if formData.imageUrl}
            <img src={formData.imageUrl} alt="Preview" class="mt-2 w-48 h-auto rounded-xl" />
          {/if}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Display Order</label>
          <input type="number" bind:value={formData.order} class="input-field" />
        </div>

        <div class="flex gap-4 justify-end">
          <button type="button" on:click={resetForm} class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">{editingCert ? 'Update' : 'Add'} Certification</button>
        </div>
      </form>
    </div>
  {/if}

  {#if loading}
    <div class="text-center py-12">
      <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else if certifications.length > 0}
    <div class="grid md:grid-cols-2 gap-4">
      {#each certifications as cert}
        <div class="card">
          <div class="flex gap-4">
            {#if cert.imageUrl}
              <img src={cert.imageUrl} alt={cert.name} class="w-24 h-24 object-cover rounded-xl" />
            {/if}
            <div class="flex-1">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-bold text-primary-500">{cert.name}</h3>
                  <p class="text-sm text-gray-400">{cert.issuer}</p>
                </div>
                <div class="flex gap-2">
                  <button on:click={() => handleEdit(cert)} class="text-primary-500 hover:text-primary-500">✏️</button>
                <button on:click={() => handleDelete(cert.$id)} class="text-red-400 hover:text-red-300">🗑️</button>
                </div>
              </div>
              <p class="text-xs text-gray-500">
                Issued: {new Date(cert.issueDate).toLocaleDateString()}
                {#if cert.expiryDate}
                  <br />Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                {/if}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="card text-center text-gray-400">
      <p>No certifications added yet.</p>
    </div>
  {/if}
</div>
