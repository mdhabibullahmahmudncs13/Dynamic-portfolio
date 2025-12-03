import { account } from '$lib/appwrite';
import { user, isAdmin } from '$lib/stores/auth';
import { goto } from '$app/navigation';

export async function login(email: string, password: string) {
  try {
    await account.createEmailPasswordSession(email, password);
    const currentUser = await account.get();
    user.set({
      $id: currentUser.$id,
      email: currentUser.email,
      name: currentUser.name
    });
    isAdmin.set(true);
    return { success: true };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    user.set(null);
    isAdmin.set(false);
    goto('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export async function checkAuth() {
  try {
    const currentUser = await account.get();
    user.set({
      $id: currentUser.$id,
      email: currentUser.email,
      name: currentUser.name
    });
    isAdmin.set(true);
    return true;
  } catch (error) {
    user.set(null);
    isAdmin.set(false);
    return false;
  }
}

export async function register(email: string, password: string, name: string) {
  try {
    await account.create('unique()', email, password, name);
    return await login(email, password);
  } catch (error: any) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
}
