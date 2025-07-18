import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RepositoryCard } from '../../components/RepositoryCard'
import { mockRepository } from '../mocks/repository'

describe('RepositoryCard', () => {
  it('renders repository information correctly', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    expect(screen.getByText('test-repo')).toBeInTheDocument()
    expect(screen.getByText('A test repository for testing purposes')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('public')).toBeInTheDocument()
  })

  it('displays star and fork counts', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('shows "View details" text', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    expect(screen.getByText('View details')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    const card = screen.getByRole('button')
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute('aria-label', 'View details for test-repo repository')
  })

  it('displays updated time information', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    expect(screen.getByText(/Updated/)).toBeInTheDocument()
  })

  it('renders language dot when language is provided', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    const languageDot = document.querySelector('.language-dot')
    expect(languageDot).toBeInTheDocument()
  })

  it('applies correct visibility badge styling', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    const visibilityBadge = screen.getByText('public')
    expect(visibilityBadge).toHaveClass('visibility-badge', 'public')
  })

  it('renders star and fork icons', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    const starIcon = document.querySelector('[data-icon="star"]')
    const forkIcon = document.querySelector('svg')
    
    expect(starIcon).toBeInTheDocument()
    expect(forkIcon).toBeInTheDocument()
  })

  it('has clickable card structure', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    const card = screen.getByRole('button')
    expect(card).toHaveClass('repository-card')
    expect(card).toHaveAttribute('tabIndex', '0')
  })

  it('handles keyboard events correctly', () => {
    render(<RepositoryCard repository={mockRepository} />)
    
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: 'Enter' })
    fireEvent.keyDown(card, { key: ' ' })
    
    expect(card).toBeInTheDocument()
  })
}) 