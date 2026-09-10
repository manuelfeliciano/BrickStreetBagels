<script lang="ts">
  import type { Section } from '../lib/site';
  export let section: Section;
  export let cateringUrl: string;
  export let isAbout = false;
  export let expanded: boolean | undefined = undefined;
  export let ariaControls: string | undefined = undefined;
  export let onNavigate: (event: MouseEvent, path: string) => void;
  export let onShop: () => void;
  export let onSelect: (section: Section, event: MouseEvent) => void;
</script>

{#if section === 'About'}
  <a href="/about" aria-current={isAbout ? 'page' : undefined} onclick={(event) => onNavigate(event, '/about')}>{section}</a>
{:else if section === 'Shop'}
  <button type="button" onclick={onShop}>{section}</button>
{:else if section === 'Catering'}
  <a href={cateringUrl} target="_blank" rel="noreferrer">{section}</a>
{:else}
  <button type="button" aria-expanded={expanded} aria-controls={ariaControls} onclick={(event) => onSelect(section, event)}>{section}</button>
{/if}
