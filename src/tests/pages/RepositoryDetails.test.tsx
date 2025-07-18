import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { RepositoryDetails } from '../../pages/RepositoryDetails';
import { fetchRepositories } from '../../utils/api';

vi.mock('../../utils/api');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

const mockRepository = {
  id: 123,
  name: 'test-repo',
  full_name: 'godaddy/test-repo',
  description: 'A test repository',
  owner: { login: 'godaddy' },
  visibility: 'public',
  archived: false,
  forks_count: 10,
  open_issues_count: 5,
  watchers_count: 20,
  stargazers_count: 100,
  language: 'JavaScript',
  default_branch: 'main',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-12-01T00:00:00Z',
  html_url: 'https://github.com/godaddy/test-repo',
  clone_url: 'https://github.com/godaddy/test-repo.git',
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT'
  }
};

describe('RepositoryDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchRepositories as vi.Mock).mockResolvedValue([mockRepository]);
  });

  it('renders repository details', async () => {
    render(
      <BrowserRouter>
        <RepositoryDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('repo-title')).toBeInTheDocument();
      expect(screen.getByText('A test repository')).toBeInTheDocument();
    });
  });

  it('displays repository statistics', async () => {
    render(
      <BrowserRouter>
        <RepositoryDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  it('shows clone and view buttons', async () => {
    render(
      <BrowserRouter>
        <RepositoryDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('clone-button')).toBeInTheDocument();
      expect(screen.getByTestId('github-link')).toBeInTheDocument();
    });
  });

  it('displays repository information', async () => {
    render(
      <BrowserRouter>
        <RepositoryDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('main')).toBeInTheDocument();
      expect(screen.getByText('MIT')).toBeInTheDocument();
    });
  });

  it('handles clone button click', async () => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    render(
      <BrowserRouter>
        <RepositoryDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      const cloneButton = screen.getByTestId('clone-button');
      fireEvent.click(cloneButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Copied to clipboard!')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    (fetchRepositories as vi.Mock).mockImplementation(() => new Promise(() => {}));

    render(
      <BrowserRouter>
        <RepositoryDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading repository details...')).toBeInTheDocument();
  });

  it('shows error state when repository not found', async () => {
    (fetchRepositories as vi.Mock).mockResolvedValue([]);

    render(
      <BrowserRouter>
        <RepositoryDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error loading repository')).toBeInTheDocument();
    });
  });
}); 