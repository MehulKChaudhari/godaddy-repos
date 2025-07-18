import type { Repository } from '../types/repository';

const API_BASE_URL = 'https://api.github.com';

export async function getRepositories(org: string): Promise<Repository[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/orgs/${org}/repos`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}