import { databases, storage, DATABASE_ID, BUCKET_ID } from '$lib/appwrite';
import { 
  PUBLIC_APPWRITE_HERO_COLLECTION_ID,
  PUBLIC_APPWRITE_SKILLS_COLLECTION_ID,
  PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID,
  PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID,
  PUBLIC_APPWRITE_CERTIFICATIONS_COLLECTION_ID,
  PUBLIC_APPWRITE_CONTACT_COLLECTION_ID,
  PUBLIC_APPWRITE_BLOG_COLLECTION_ID
} from '$env/static/public';
import type { Hero, Skill, Project, Experience, Certification, Contact, BlogPost } from '$lib/types';
import { ID, Query } from 'appwrite';

// Hero Section
export async function getHero(): Promise<Hero | null> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, PUBLIC_APPWRITE_HERO_COLLECTION_ID);
    return response.documents[0] as Hero || null;
  } catch (error) {
    console.error('Error fetching hero:', error);
    return null;
  }
}

export async function updateHero(data: Partial<Hero>, heroId?: string): Promise<Hero> {
  try {
    if (heroId) {
      return await databases.updateDocument(DATABASE_ID, PUBLIC_APPWRITE_HERO_COLLECTION_ID, heroId, data) as Hero;
    } else {
      return await databases.createDocument(DATABASE_ID, PUBLIC_APPWRITE_HERO_COLLECTION_ID, ID.unique(), data) as Hero;
    }
  } catch (error) {
    console.error('Error updating hero:', error);
    throw error;
  }
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID, 
      PUBLIC_APPWRITE_SKILLS_COLLECTION_ID,
      [Query.orderAsc('order')]
    );
    return response.documents as Skill[];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function createSkill(data: Omit<Skill, '$id'>): Promise<Skill> {
  return await databases.createDocument(DATABASE_ID, PUBLIC_APPWRITE_SKILLS_COLLECTION_ID, ID.unique(), data) as Skill;
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<Skill> {
  return await databases.updateDocument(DATABASE_ID, PUBLIC_APPWRITE_SKILLS_COLLECTION_ID, id, data) as Skill;
}

export async function deleteSkill(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, PUBLIC_APPWRITE_SKILLS_COLLECTION_ID, id);
}

// Projects
export async function getProjects(featured?: boolean): Promise<Project[]> {
  try {
    const queries = [Query.orderDesc('order')];
    if (featured !== undefined) {
      queries.push(Query.equal('featured', featured));
    }
    const response = await databases.listDocuments(DATABASE_ID, PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID, queries);
    return response.documents as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    return await databases.getDocument(DATABASE_ID, PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID, id) as Project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function createProject(data: Omit<Project, '$id'>): Promise<Project> {
  return await databases.createDocument(DATABASE_ID, PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID, ID.unique(), data) as Project;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  return await databases.updateDocument(DATABASE_ID, PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID, id, data) as Project;
}

export async function deleteProject(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID, id);
}

// Experience
export async function getExperience(): Promise<Experience[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID, 
      PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID,
      [Query.orderDesc('order')]
    );
    return response.documents as Experience[];
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

export async function createExperience(data: Omit<Experience, '$id'>): Promise<Experience> {
  return await databases.createDocument(DATABASE_ID, PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID, ID.unique(), data) as Experience;
}

export async function updateExperience(id: string, data: Partial<Experience>): Promise<Experience> {
  return await databases.updateDocument(DATABASE_ID, PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID, id, data) as Experience;
}

export async function deleteExperience(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID, id);
}

// Certifications
export async function getCertifications(): Promise<Certification[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID, 
      PUBLIC_APPWRITE_CERTIFICATIONS_COLLECTION_ID,
      [Query.orderDesc('order')]
    );
    return response.documents as Certification[];
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
}

export async function createCertification(data: Omit<Certification, '$id'>): Promise<Certification> {
  return await databases.createDocument(DATABASE_ID, PUBLIC_APPWRITE_CERTIFICATIONS_COLLECTION_ID, ID.unique(), data) as Certification;
}

export async function updateCertification(id: string, data: Partial<Certification>): Promise<Certification> {
  return await databases.updateDocument(DATABASE_ID, PUBLIC_APPWRITE_CERTIFICATIONS_COLLECTION_ID, id, data) as Certification;
}

export async function deleteCertification(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, PUBLIC_APPWRITE_CERTIFICATIONS_COLLECTION_ID, id);
}

// Contact
export async function getContact(): Promise<Contact | null> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, PUBLIC_APPWRITE_CONTACT_COLLECTION_ID);
    return response.documents[0] as Contact || null;
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}

export async function updateContact(data: Partial<Contact>, contactId?: string): Promise<Contact> {
  try {
    if (contactId) {
      return await databases.updateDocument(DATABASE_ID, PUBLIC_APPWRITE_CONTACT_COLLECTION_ID, contactId, data) as Contact;
    } else {
      return await databases.createDocument(DATABASE_ID, PUBLIC_APPWRITE_CONTACT_COLLECTION_ID, ID.unique(), data) as Contact;
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
}

// Blog Posts
export async function getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  try {
    const queries = [Query.orderDesc('createdAt')];
    if (publishedOnly) {
      queries.push(Query.equal('published', true));
    }
    const response = await databases.listDocuments(DATABASE_ID, PUBLIC_APPWRITE_BLOG_COLLECTION_ID, queries);
    return response.documents as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    return await databases.getDocument(DATABASE_ID, PUBLIC_APPWRITE_BLOG_COLLECTION_ID, id) as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function createBlogPost(data: Omit<BlogPost, '$id'>): Promise<BlogPost> {
  return await databases.createDocument(DATABASE_ID, PUBLIC_APPWRITE_BLOG_COLLECTION_ID, ID.unique(), data) as BlogPost;
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
  return await databases.updateDocument(DATABASE_ID, PUBLIC_APPWRITE_BLOG_COLLECTION_ID, id, data) as BlogPost;
}

export async function deleteBlogPost(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, PUBLIC_APPWRITE_BLOG_COLLECTION_ID, id);
}

// File Upload
export async function uploadFile(file: File): Promise<string> {
  try {
    const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
    return storage.getFileView(BUCKET_ID, response.$id).toString();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(fileId: string): Promise<void> {
  await storage.deleteFile(BUCKET_ID, fileId);
}
