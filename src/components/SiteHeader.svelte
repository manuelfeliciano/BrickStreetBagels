<script lang="ts">
  import type { Section } from '../lib/site';
  import { sections, cateringUrl } from '../lib/site';
  import NavItem from './NavItem.svelte';

  export let isAbout: boolean;
  export let active: Section | null;
  export let onNavigate: (event: MouseEvent, path: string) => void;
  export let onShop: () => void;
  export let onSelect: (section: Section, event: MouseEvent) => void;
  export let onOpenMobileMenu: () => void;
</script>

<header>
  <a class="header-logo" href="/" onclick={(event) => onNavigate(event, '/')} aria-label="Brick Street Bagels home"><img src="/images/logo.png" alt="" /></a>
  <nav class="desktop-nav" aria-label="Main navigation">
    {#each sections as section}
      <NavItem {section} {cateringUrl} {isAbout} expanded={active === section} ariaControls="nav-panel" {onNavigate} {onShop} {onSelect} />
    {/each}
  </nav>
  <button class="mobile-toggle" type="button" aria-haspopup="dialog" aria-controls="mobile-menu" aria-label="Open menu" onclick={onOpenMobileMenu}><span aria-hidden="true">☰</span></button>
</header>
