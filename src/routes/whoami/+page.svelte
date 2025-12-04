<script lang="ts">
  import { goto } from '$app/navigation';
  import { login } from '$lib/services/auth';
  import { isAdmin } from '$lib/stores/auth';

  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleLogin(e: Event) {
    e.preventDefault();
    loading = true;
    error = '';

    const result = await login(email, password);
    
    if (result.success) {
      goto('/xenon');
    } else {
      error = result.error || 'Login failed. Please check your credentials.';
    }
    
    loading = false;
  }
</script>

<svelte:head>
  <title>Admin Login - Portfolio</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4">
  <div class="max-w-md w-full">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2 bg-primary-500  ">
        Admin Login
      </h1>
      <p class="text-gray-400">Access your portfolio admin panel</p>
    </div>

    <div class="card">
      {#if error}
        <div class="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-xl text-red-400">
          {error}
        </div>
      {/if}

      <form on:submit={handleLogin} class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            class="input-field"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-400 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            bind:value={password}
            required
            class="input-field"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div class="mt-6 text-center">
        <a href="/" class="text-primary-500 hover:text-primary-500 transition-colors text-sm">
          ← Back to Portfolio
        </a>
      </div>
    </div>
  </div>
</div>
