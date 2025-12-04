export interface Hero {
  $id?: string;
  name: string;
  tagline: string;
  description: string;
  mediaType?: 'image' | 'video';
  imageUrl?: string;
  videoUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export interface Skill {
  $id?: string;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform' | 'other';
  proficiency: number; // 0-100
  icon?: string;
  order: number;
}

export interface Project {
  $id?: string;
  title: string;
  description: string;
  longDescription?: string;
  mediaType?: 'image' | 'video';
  imageUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[]; // JSON array of tech names
  category: 'cybersecurity' | 'devops' | 'fullstack' | 'python' | 'videography' | 'other';
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface Experience {
  $id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string; // null if current
  description: string;
  technologies: string[];
  order: number;
}

export interface Certification {
  $id?: string;
  name: string;
  issuer: string;
  type: 'certificate' | 'achievements' | 'participation';
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  order: number;
}

export interface Contact {
  $id?: string;
  email: string;
  phone?: string;
  location?: string;
  availability: string;
}

export interface BlogPost {
  $id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  imageUrl?: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  $id: string;
  email: string;
  name: string;
}
