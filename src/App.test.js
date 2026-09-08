import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import App from './App.svelte';

describe('App', () => {
  it('renders Hello', () => {
    const { body } = render(App);
    expect(body).toContain('Hello');
  });
});
