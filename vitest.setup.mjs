import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';

import { vi } from 'vitest';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Descomentar si es necesario para eventos de resize de la pantalla
// class ResizeObserver {
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// }

// window.ResizeObserver = ResizeObserver;