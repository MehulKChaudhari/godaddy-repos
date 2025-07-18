import { describe, it, expect } from 'vitest'
import { formatNumber } from '../../utils/api'

describe('formatNumber', () => {
  it('formats numbers less than 1000 correctly', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(1)).toBe('1')
    expect(formatNumber(999)).toBe('999')
  })

  it('formats numbers 1000 and above with k suffix', () => {
    expect(formatNumber(1000)).toBe('1.0k')
    expect(formatNumber(1500)).toBe('1.5k')
    expect(formatNumber(10000)).toBe('10.0k')
    expect(formatNumber(12345)).toBe('12.3k')
  })

  it('handles large numbers correctly', () => {
    expect(formatNumber(100000)).toBe('100.0k')
    expect(formatNumber(999999)).toBe('1000.0k')
  })
}) 