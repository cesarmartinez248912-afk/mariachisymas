import { Client, Databases } from 'node-appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.APPWRITE_DATABASE_ID;
const collectionId = process.env.APPWRITE_COLLECTION_ID;

export function hasAppwriteConfig() {
  return Boolean(endpoint && projectId && apiKey && databaseId && collectionId);
}

export function getAppwriteDatabasesClient() {
  if (!endpoint || !projectId || !apiKey) return null;

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return new Databases(client);
}

export const APPWRITE_DATABASE_ID = databaseId || '';
export const APPWRITE_COLLECTION_ID = collectionId || '';
