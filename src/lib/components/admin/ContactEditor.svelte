<script lang="ts">
  import { onMount } from 'svelte';
  import { getContact, updateContact } from '$lib/services/portfolio';
  import type { Contact } from '$lib/types';

  let contact: Contact | null = null;
  let loading = true;
  let saving = false;
  let message = '';

  let formData = {
    email: '',
    phone: '',
    location: '',
    availability: ''
  };

  onMount(async () => {
    contact = await getContact();
    if (contact) {
      formData = { ...formData, ...contact };
    }
    loading = false;
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    saving = true;
    message = '';

    try {
      await updateContact(formData, contact?.$id);
      message = 'Contact information updated successfully!';
      setTimeout(() => message = '', 3000);
    } catch (error: any) {
      message = `Error: ${error.message}`;
    }

    saving = false;
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold text-primary-500">Contact Information</h2>
  </div>

  {#if message}
    <div class={`p-4 rounded-xl ${message.includes('Error') ? 'bg-red-500/10 border border-red-500 text-red-400' : 'bg-green-500/10 border border-green-500 text-green-400'}`}>
      {message}
    </div>
  {/if}

  {#if loading}
    <div class="text-center py-12">
      <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else}
    <form on:submit={handleSubmit} class="card space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            bind:value={formData.email}
            required
            class="input-field"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            bind:value={formData.phone}
            class="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">
          Location
        </label>
        <input
          type="text"
          bind:value={formData.location}
          class="input-field"
          placeholder="City, Country"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">
          Availability Status *
        </label>
        <select bind:value={formData.availability} required class="input-field">
          <option value="">Select availability...</option>
          <option value="Available for hire">Available for hire</option>
          <option value="Open to opportunities">Open to opportunities</option>
          <option value="Open to freelance">Open to freelance</option>
          <option value="Not available">Not available</option>
        </select>
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

    <div class="card bg-primary-500/5 border-primary-500/30">
      <h3 class="text-lg font-bold text-primary-500 mb-3">📧 Contact Form Integration</h3>
      <p class="text-gray-400 text-sm mb-3">
        To enable the contact form, you'll need to set up a serverless function or email service integration.
        Recommended options:
      </p>
      <ul class="list-disc list-inside text-gray-400 text-sm space-y-1">
        <li>Appwrite Functions with email service (Mailgun, SendGrid)</li>
        <li>Form services like Formspree or Getform</li>
        <li>Custom API endpoint with nodemailer</li>
      </ul>
    </div>
  {/if}
</div>
