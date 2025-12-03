import { Client, Account, Databases, Storage } from 'appwrite';
import { 
  PUBLIC_APPWRITE_ENDPOINT, 
  PUBLIC_APPWRITE_PROJECT_ID,
  PUBLIC_APPWRITE_DATABASE_ID,
  PUBLIC_APPWRITE_STORAGE_BUCKET_ID
} from '$env/static/public';

const client = new Client()
  .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
  .setProject(PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = PUBLIC_APPWRITE_DATABASE_ID;
export const BUCKET_ID = PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

export default client;
