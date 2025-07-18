import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from '../../pages/Dashboard'

vi.mock('../../utils/api', () => ({
  fetchRepositories: vi.fn()
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
  };
});

Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn()
  },
  writable: true
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the dashboard title', () => {
    renderWithRouter(<Dashboard />)
    expect(screen.getByTestId('dashboard-title')).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    renderWithRouter(<Dashboard />)
    expect(screen.getByTestId('loading-message')).toBeInTheDocument()
  })

  it('displays skeleton cards during loading', () => {
    renderWithRouter(<Dashboard />)
    const skeletonCards = screen.getAllByTestId('skeleton-card')
    expect(skeletonCards.length).toBeGreaterThan(0)
  })

  it('shows error state when API fails', async () => {
    const { fetchRepositories } = await import('../../utils/api')
    vi.mocked(fetchRepositories).mockRejectedValue(new Error('Network error'))
    
    renderWithRouter(<Dashboard />)
    
    await screen.findByTestId('error-title')
    expect(screen.getByTestId('error-message')).toHaveTextContent('Network error')
  })

  it('displays retry button in error state', async () => {
    const { fetchRepositories } = await import('../../utils/api')
    vi.mocked(fetchRepositories).mockRejectedValue(new Error('Network error'))
    
    renderWithRouter(<Dashboard />)
    
    const retryButton = await screen.findByTestId('retry-button')
    expect(retryButton).toBeInTheDocument()
    expect(retryButton).toHaveClass('retry-button')
  })

  it('handles retry button click', async () => {
    const { fetchRepositories } = await import('../../utils/api')
    vi.mocked(fetchRepositories).mockRejectedValue(new Error('Network error'))
    
    renderWithRouter(<Dashboard />)
    
    const retryButton = await screen.findByTestId('retry-button')
    fireEvent.click(retryButton)
    
    expect(window.location.reload).toHaveBeenCalled()
  })

  it('has proper page structure', () => {
    renderWithRouter(<Dashboard />)
    
    const dashboard = screen.getByTestId('dashboard')
    const grid = screen.getByTestId('repositories-grid')
    
    expect(dashboard).toBeInTheDocument()
    expect(grid).toBeInTheDocument()
  })
}) 