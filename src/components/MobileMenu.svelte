<script lang="ts">
  import type { Section } from '../lib/site';
  import { sections, cateringUrl } from '../lib/site';
  import NavItem from './NavItem.svelte';
  import LocationsContent from './LocationsContent.svelte';

  export let open = false;
  export let onclose: () => void;
  export let isAbout = false;
  export let onNavigate: (event: MouseEvent, path: string) => void;
  export let onShop: () => void;

  let menuEl: HTMLDialogElement;
  let mobileSection: Section | null = null;

  $: if (menuEl) {
    if (open) { mobileSection = null; menuEl.showModal(); }
    else { menuEl.close(); }
  }
</script>

<dialog id="mobile-menu" bind:this={menuEl} aria-label="Navigation" onclose={onclose}>
  <div class="mobile-top"><a href="/" onclick={(event) => onNavigate(event, '/')} aria-label="Brick Street Bagels home"><img src="/images/logo.png" alt="" /></a><button class="mobile-done" onclick={() => menuEl.close()}>Done</button></div>
  {#if mobileSection}
    <div class="mobile-breadcrumb"><span>{mobileSection}</span><button type="button" onclick={() => mobileSection = null}>Back</button></div>
    <section class="mobile-content" aria-label={mobileSection}>
      <LocationsContent />
    </section>
  {:else}
    <nav class="mobile-nav" aria-label="Mobile navigation">
      {#each sections as section}
        <NavItem {section} {cateringUrl} {isAbout} {onNavigate} {onShop} onSelect={(s) => mobileSection = s} />
      {/each}
    </nav>
  {/if}
  <p class="mobile-footer">Brick Street Bagels · Boston</p>
</dialog>
