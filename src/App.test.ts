import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import App from './App.svelte';

describe('App', () => {
  it('renders the bagel photo and the Brick Street home rail links', () => {
    const { body } = render(App);
    expect(body).toContain('alt="Fresh Brick Street bagels stacked on the bakery counter"');
    expect(body).toContain('aria-label="Brick Street links"');
    expect(body).toContain('https://www.instagram.com/brick.street.bagels');
    expect(body).not.toContain('<header>');
    expect(body).not.toContain('<footer');
  });
});
