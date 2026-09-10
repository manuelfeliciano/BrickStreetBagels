<script lang="ts">
  import { fade } from 'svelte/transition';
  import { floatLogo } from '../lib/floatLogo';
  import { email, cateringUrl, locations, directionsUrl } from '../lib/site';
  import RailLinks from './RailLinks.svelte';

  export let shopOpen: boolean;
  export let aboutOpen: boolean;
  export let isIdle: boolean;
  export let reducedMotion: boolean;
  export let onCloseHomePanels: () => void;
  export let onToggleAbout: () => void;
  export let onToggleShop: () => void;
  export let onCloseShop: () => void;
  export let onResetIdle: () => void;
</script>

<main class="home-page" class:shop-is-open={shopOpen} aria-label="Brick Street Bagels">
  <section class="home-rail" aria-label="Brick Street Bagels today">
    {#if aboutOpen || shopOpen}<button class="rail-dismiss" type="button" aria-label={shopOpen ? 'Close shop' : 'Close About'} onclick={onCloseHomePanels}></button>{/if}
    <a class="home-logo" href="/" aria-label="Brick Street Bagels home"><img src="/images/logo.png" alt="Brick Street Bagels" /></a>
    <div class="home-copy" inert={shopOpen}>
      <p>Brick Street is Jordan’s neighborhood bagel shop, started in a South End apartment in late 2022. What began as early-morning bike deliveries and park pop-ups has grown into two Boston shops, where fresh bagels, coffee, and community are waiting every day.</p>
      <nav class="home-links" aria-label="Brick Street links">
        <RailLinks {cateringUrl} {aboutOpen} {shopOpen} shopId="home-shop-trigger" onToggleAbout={onToggleAbout} onShopClick={onToggleShop} onLinkClick={onCloseHomePanels} />
      </nav>
    </div>
    {#if shopOpen}<nav class="shop-rail-links" aria-label="Brick Street links" transition:fade={{duration: reducedMotion ? 0 : 220}}>
      <RailLinks {cateringUrl} shopOpen={true} onToggleAbout={onToggleAbout} onShopClick={onCloseShop} onLinkClick={onCloseHomePanels} />
    </nav>{/if}
    <div class="home-details" inert={shopOpen}>
      <p>Every day<br/>7:30am–2pm<br/><a class="rail-address" href={directionsUrl(locations[0].address)} target="_blank" rel="noreferrer">{locations[0].name} · {locations[0].address}</a><br/><a class="rail-address" href={directionsUrl(locations[1].address)} target="_blank" rel="noreferrer">{locations[1].name} · {locations[1].address}</a></p>
      <a href={'mailto:' + email}>{email}</a>
    </div>
  </section>
  <section class="home-gallery" aria-label="Brick Street Bagels scenes">
    <figure class="gallery-card gallery-r1a"><img src="/images/story-duo.jpg" alt="Jordan and Andrew, the Brick Street Bagels team" fetchpriority="high" /><figcaption>Jordan &amp; Andrew.</figcaption></figure>
    <figure class="gallery-card gallery-r1b"><img src="/images/story-kitchen.jpg" alt="Rows of hand-rolled bagels in the Brick Street kitchen" /><figcaption>Rolled by hand.</figcaption></figure>
    <figure class="gallery-card gallery-r2"><img src="/images/bagels.jpg" alt="Fresh Brick Street bagels stacked on the bakery counter" /><figcaption>Bagels, every morning.</figcaption></figure>
    <figure class="gallery-card gallery-r3a"><img src="/images/story-counter.jpg" alt="Brick Street Bagels shop counter with bagels and cream cheese" /><figcaption>Ready at the counter.</figcaption></figure>
    <figure class="gallery-card gallery-r3b"><img src="/images/story-bag.jpg" alt="Stacked bagels beside a Brick Street Bagels bag" /><figcaption>Bagged up fresh.</figcaption></figure>
  </section>
</main>
<button class="idle-screen" class:idle-active={isIdle} type="button" aria-label="Return to Brick Street Bagels" aria-hidden={!isIdle} tabindex={isIdle ? 0 : -1} onclick={onResetIdle}>
  <span class="idle-logo" use:floatLogo={{ active: isIdle, reducedMotion }}><img src="/images/logo.png" alt="Brick Street Bagels" draggable="false" /></span>
</button>
