import { getOrganizationRepositories } from '../services/repositoryService';
import type { Repository } from '../types/repository';

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    return await getOrganizationRepositories('godaddy');
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}; 