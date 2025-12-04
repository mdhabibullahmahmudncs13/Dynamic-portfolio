<script lang="ts">
  import { onMount } from 'svelte';
  import { getMessages, updateMessage, deleteMessage } from '$lib/services/portfolio';
  import type { Message } from '$lib/types';

  let messages: Message[] = [];
  let loading = true;
  let selectedMessage: Message | null = null;

  onMount(async () => {
    await loadMessages();
  });

  async function loadMessages() {
    loading = true;
    messages = await getMessages();
    loading = false;
  }

  async function markAsRead(message: Message) {
    try {
      if (message.$id) {
        await updateMessage(message.$id, { read: true });
        await loadMessages();
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      alert('Failed to update message');
    }
  }

  async function handleDelete(message: Message) {
    if (!confirm(`Delete message from ${message.name}?`)) return;
    
    try {
      if (message.$id) {
        await deleteMessage(message.$id);
        await loadMessages();
        selectedMessage = null;
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getUnreadCount(): number {
    return messages.filter(m => !m.read).length;
  }
</script>

<div>
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-3xl font-bold text-primary-500">Messages</h2>
      <p class="text-gray-400 mt-1">
        {messages.length} total messages
        {#if getUnreadCount() > 0}
          <span class="ml-2 px-2 py-1 bg-primary-500 text-zinc-900 rounded-full text-xs font-bold">
            {getUnreadCount()} new
          </span>
        {/if}
      </p>
    </div>
  </div>

  {#if loading}
    <div class="text-center py-12">
      <div class="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else if messages.length === 0}
    <div class="card text-center py-12">
      <p class="text-gray-400">No messages yet</p>
    </div>
  {:else}
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Messages List -->
      <div class="space-y-3">
        {#each messages as message}
          <div 
            class={`card cursor-pointer transition-all ${
              selectedMessage?.$id === message.$id 
                ? 'border-primary-500 bg-primary-500/10' 
                : 'hover:border-primary-500/50'
            } ${!message.read ? 'border-l-4 border-l-primary-500' : ''}`}
            on:click={() => {
              selectedMessage = message;
              if (!message.read) markAsRead(message);
            }}
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                selectedMessage = message;
                if (!message.read) markAsRead(message);
              }
            }}
            role="button"
            tabindex="0"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <h3 class="font-bold text-gray-200">{message.name}</h3>
                  {#if !message.read}
                    <span class="w-2 h-2 bg-primary-500 rounded-full"></span>
                  {/if}
                </div>
                <p class="text-sm text-primary-500">{message.email}</p>
                <p class="text-sm text-gray-400 mt-2 line-clamp-2">{message.message}</p>
                <p class="text-xs text-gray-500 mt-2">{formatDate(message.createdAt)}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Message Details -->
      <div class="lg:sticky lg:top-6 lg:self-start">
        {#if selectedMessage}
          <div class="card">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-bold text-primary-500">{selectedMessage.name}</h3>
                <a 
                  href="mailto:{selectedMessage.email}" 
                  class="text-sm text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {selectedMessage.email}
                </a>
              </div>
              <button
                on:click={() => handleDelete(selectedMessage)}
                class="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
              >
                Delete
              </button>
            </div>

            <div class="mb-4">
              <p class="text-xs text-gray-500">Received: {formatDate(selectedMessage.createdAt)}</p>
              {#if selectedMessage.read}
                <p class="text-xs text-green-500 mt-1">✓ Read</p>
              {/if}
            </div>

            <div class="border-t border-zinc-800 pt-4">
              <h4 class="text-sm font-semibold text-gray-400 mb-2">Message:</h4>
              <p class="text-gray-200 whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>

            <div class="border-t border-zinc-800 pt-4 mt-4">
              <a 
                href="mailto:{selectedMessage.email}?subject=Re: Your message&body=Hi {selectedMessage.name},%0D%0A%0D%0A"
                class="w-full btn-primary block text-center"
              >
                Reply via Email
              </a>
            </div>
          </div>
        {:else}
          <div class="card text-center py-12">
            <p class="text-gray-400">Select a message to view details</p>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
