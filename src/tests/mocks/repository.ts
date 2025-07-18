import type { Repository } from '../../types/repository'

export const mockRepository: Repository = {
  id: 1,
  name: 'test-repo',
  full_name: 'test-repo',
  description: 'A test repository for testing purposes',
  html_url: 'https://github.com/mehulkchaudhari/test-repo',
  clone_url: 'https://github.com/mehulkchaudhari/test-repo.git',
  stargazers_count: 150,
  forks_count: 25,
  watchers_count: 10,
  language: 'TypeScript',
  updated_at: '2024-01-15T10:30:00Z',
  created_at: '2024-01-01T00:00:00Z',
  topics: ['test', 'example'],
  visibility: 'public',
  default_branch: 'main',
  open_issues_count: 5,
  archived: false,
  disabled: false,
  license: {
    key: 'mit',
    name: 'MIT License',
    url: 'https://api.github.com/licenses/mit'
  },
  owner: {
    login: 'mehulkchaudhari',
    avatar_url: 'https://github.com/mehulkchaudhari.png',
    type: 'Organization'
  }
}

export const mockRepositories: Repository[] = [
  mockRepository,
  {
    ...mockRepository,
    id: 2,
    name: 'another-repo',
    full_name: 'another-repo',
    description: 'Another test repository',
    stargazers_count: 75,
    forks_count: 12,
    watchers_count: 5,
    language: 'JavaScript',
    visibility: 'private'
  }
] 