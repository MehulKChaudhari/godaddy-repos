import { describe, it, expect } from 'vitest'
import { formatDate } from '../../utils/api'

describe('formatDate', () => {
  it('formats date string correctly', () => {
    const testDate = '2024-01-15T10:30:00Z'
    const formatted = formatDate(testDate)
    
    expect(formatted).toMatch(/Jan 15, 2024/)
  })

  it('handles different date formats', () => {
    const date1 = '2023-12-25T00:00:00Z'
    const date2 = '2024-06-01T12:00:00Z'
    
    expect(formatDate(date1)).toMatch(/Dec 25, 2023/)
    expect(formatDate(date2)).toMatch(/Jun 1, 2024/)
  })

  it('handles invalid date gracefully', () => {
    const invalidDate = 'invalid-date'
    const formatted = formatDate(invalidDate)
    
    expect(formatted).toBe('Invalid Date')
  })
}) 