import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Dashboard } from '../../pages/Dashboard'

vi.mock('../../utils/api', () => ({
  fetchRepositories: vi.fn()
}))

Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn()
  },
  writable: true
})

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the dashboard title', () => {
    render(<Dashboard />)
    expect(screen.getByText('GoDaddy Repositories')).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    render(<Dashboard />)
    expect(screen.getByText('Loading repositories...')).toBeInTheDocument()
  })

  it('displays skeleton cards during loading', () => {
    render(<Dashboard />)
    const skeletonCards = document.querySelectorAll('.skeleton')
    expect(skeletonCards.length).toBeGreaterThan(0)
  })

  it('shows error state when API fails', async () => {
    const { fetchRepositories } = await import('../../utils/api')
    vi.mocked(fetchRepositories).mockRejectedValue(new Error('Network error'))
    
    render(<Dashboard />)
    
    await screen.findByText('Error loading repositories')
    expect(screen.getByText('Network error')).toBeInTheDocument()
  })

  it('displays retry button in error state', async () => {
    const { fetchRepositories } = await import('../../utils/api')
    vi.mocked(fetchRepositories).mockRejectedValue(new Error('Network error'))
    
    render(<Dashboard />)
    
    const retryButton = await screen.findByText('Try Again')
    expect(retryButton).toBeInTheDocument()
    expect(retryButton).toHaveClass('retry-button')
  })

  it('handles retry button click', async () => {
    const { fetchRepositories } = await import('../../utils/api')
    vi.mocked(fetchRepositories).mockRejectedValue(new Error('Network error'))
    
    render(<Dashboard />)
    
    const retryButton = await screen.findByText('Try Again')
    fireEvent.click(retryButton)
    
    expect(window.location.reload).toHaveBeenCalled()
  })

  it('has proper page structure', () => {
    render(<Dashboard />)
    
    const dashboard = document.querySelector('.dashboard')
    const header = document.querySelector('.dashboard-header')
    const grid = document.querySelector('.repositories-grid')
    
    expect(dashboard).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(grid).toBeInTheDocument()
  })
}) 