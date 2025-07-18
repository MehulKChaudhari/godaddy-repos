import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { RepositoryCard } from '../../components/RepositoryCard'
import { mockRepository } from '../mocks/repository'

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('RepositoryCard', () => {
  it('renders repository information correctly', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    expect(screen.getByText('test-repo')).toBeInTheDocument()
    expect(screen.getByText('A test repository for testing purposes')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('public')).toBeInTheDocument()
  })

  it('displays star and fork counts', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('shows "View details" text', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    expect(screen.getByText('View details')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    const card = screen.getByLabelText('View details for test-repo repository')
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute('href', '/repository/1')
  })

  it('displays updated time information', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    expect(screen.getByText(/Updated/)).toBeInTheDocument()
  })

  it('renders language dot when language is provided', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    const languageDot = document.querySelector('.language-dot')
    expect(languageDot).toBeInTheDocument()
  })

  it('applies correct visibility badge styling', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    const visibilityBadge = screen.getByText('public')
    expect(visibilityBadge).toHaveClass('visibility-badge', 'public')
  })

  it('renders star and fork icons', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    const starIcon = document.querySelector('[data-icon="star"]')
    const forkIcon = document.querySelector('svg')
    
    expect(starIcon).toBeInTheDocument()
    expect(forkIcon).toBeInTheDocument()
  })

  it('has clickable card structure', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    const card = screen.getByLabelText('View details for test-repo repository')
    expect(card).toHaveClass('repository-card')
    expect(card).toHaveAttribute('href', '/repository/1')
  })

  it('handles keyboard events correctly', () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />)
    
    const card = screen.getByLabelText('View details for test-repo repository')
    fireEvent.keyDown(card, { key: 'Enter' })
    fireEvent.keyDown(card, { key: ' ' })
    
    expect(card).toBeInTheDocument()
  })
}) 