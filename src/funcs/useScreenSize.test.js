import { renderHook } from '@testing-library/react';
import useScreenSize from './useScreenSize';

describe('useScreenSize', () => {
  function setWidth(width) {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  }

  it('returns phone for small widths', () => {
    setWidth(500);
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toBe('phone');
  });

  it('returns tablet for medium widths', () => {
    setWidth(800);
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toBe('tablet');
  });

  it('returns laptop for large widths', () => {
    setWidth(1200);
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toBe('laptop');
  });

  it('returns desktop for extra large widths', () => {
    setWidth(1600);
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toBe('desktop');
  });
});
