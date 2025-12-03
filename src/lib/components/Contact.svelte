<script lang="ts">
  import { onMount } from 'svelte';
  import { getContact } from '$lib/services/portfolio';
  import type { Contact as ContactType } from '$lib/types';

  let contact: ContactType | null = null;
  let loading = true;

  onMount(async () => {
    contact = await getContact();
    loading = false;
  });
</script>

<section id="contact" class="py-20 bg-cyber-dark/30">
  <div class="container mx-auto px-4">
    <h2 class="section-title text-center mb-4">Get In Touch</h2>
    <p class="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
      Interested in working together or have a question? Feel free to reach out!
    </p>

    {#if loading}
      <div class="text-center">
        <div class="inline-block w-12 h-12 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    {:else if contact}
      <div class="max-w-2xl mx-auto">
        <div class="card">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Contact Info -->
            <div class="space-y-6">
              <h3 class="text-2xl font-bold text-cyber-blue mb-4">Contact Information</h3>

              {#if contact.email}
                <div class="flex items-start space-x-4">
                  <svg class="w-6 h-6 text-cyber-blue mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <p class="text-gray-400 text-sm">Email</p>
                    <a href="mailto:{contact.email}" class="text-gray-200 hover:text-cyber-blue transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </div>
              {/if}

              {#if contact.phone}
                <div class="flex items-start space-x-4">
                  <svg class="w-6 h-6 text-cyber-blue mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <p class="text-gray-400 text-sm">Phone</p>
                    <a href="tel:{contact.phone}" class="text-gray-200 hover:text-cyber-blue transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              {/if}

              {#if contact.location}
                <div class="flex items-start space-x-4">
                  <svg class="w-6 h-6 text-cyber-blue mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <p class="text-gray-400 text-sm">Location</p>
                    <p class="text-gray-200">{contact.location}</p>
                  </div>
                </div>
              {/if}

              {#if contact.availability}
                <div class="flex items-start space-x-4">
                  <svg class="w-6 h-6 text-cyber-blue mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <p class="text-gray-400 text-sm">Availability</p>
                    <p class="text-gray-200">{contact.availability}</p>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Contact Form Placeholder -->
            <div>
              <h3 class="text-2xl font-bold text-cyber-blue mb-4">Send a Message</h3>
              <form class="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  class="input-field"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  class="input-field"
                  required
                />
                <textarea 
                  placeholder="Your Message" 
                  rows="4" 
                  class="input-field"
                  required
                ></textarea>
                <button 
                  type="submit" 
                  class="w-full btn-primary"
                >
                  Send Message
                </button>
              </form>
              <p class="text-xs text-gray-500 mt-2 text-center">
                Note: Configure email service in admin panel
              </p>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <p class="text-center text-gray-400">Contact information not available. Please configure in admin panel.</p>
    {/if}
  </div>
</section>
