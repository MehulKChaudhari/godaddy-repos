import { getRepositories } from './api';
import type { Repository } from '../types/repository';

export async function getOrganizationRepositories(organization: string): Promise<Repository[]> {
  try {
    return await getRepositories(organization);
  } catch (error) {
    console.error('Failed to fetch organization repositories:', error);
    throw error;
  }
} 