<script lang="ts">
  import { tick, onDestroy, onMount } from 'svelte';
  import type { Section } from './lib/site';
  import ShopPanel from './components/ShopPanel.svelte';
  import SiteHeader from './components/SiteHeader.svelte';
  import LocationsPanel from './components/LocationsPanel.svelte';
  import LandingPage from './components/LandingPage.svelte';
  import AboutPage from './components/AboutPage.svelte';
  import AboutDrawer from './components/AboutDrawer.svelte';
  import MobileMenu from './components/MobileMenu.svelte';

  let isIdle = false;
  let idleTimer: ReturnType<typeof setTimeout> | undefined;
  const idleDelay = 20_000;
  const idleEvents = ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll', 'focus'] as const;
  let reducedMotion = false;

  function resetIdle() {
    clearTimeout(idleTimer);
    isIdle = false;
    if (!document.hidden && !isAbout && !shopOpen && !aboutOpen) {
      idleTimer = setTimeout(() => { isIdle = true; }, idleDelay);
    }
  }

  onDestroy(() => {
    clearTimeout(idleTimer);
  });
  let isAbout = typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/about';
  let shopOpen = typeof window !== 'undefined' && ['/shop', '/menu'].includes(window.location.pathname.replace(/\/$/, ''));
  let aboutOpen = false;
  let mobileMenuOpen = false;
  onMount(() => {
    // Older /menu links now normalize to the canonical /shop endpoint.
    if (shopOpen && window.location.pathname.replace(/\/$/, '') === '/menu') history.replaceState({}, '', '/shop');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => { reducedMotion = motionPreference.matches; };
    syncMotionPreference();
    motionPreference.addEventListener('change', syncMotionPreference);
    const syncRoute = () => { shopOpen = ['/shop', '/menu'].includes(window.location.pathname.replace(/\/$/, '')); isAbout = window.location.pathname.replace(/\/$/, '') === '/about'; aboutOpen = false; active = null; mobileMenuOpen = false; resetIdle(); };
    window.addEventListener('popstate', syncRoute);
    idleEvents.forEach((event) => window.addEventListener(event, resetIdle, { passive: true, capture: event === 'scroll' }));
    document.addEventListener('visibilitychange', resetIdle);
    resetIdle();
    return () => {
      window.removeEventListener('popstate', syncRoute);
      idleEvents.forEach((event) => window.removeEventListener(event, resetIdle, event === 'scroll'));
      document.removeEventListener('visibilitychange', resetIdle);
      motionPreference.removeEventListener('change', syncMotionPreference);
    };
  });
  function navigate(event: MouseEvent, path: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    history.pushState({}, '', path);
    isAbout = path === '/about';
    shopOpen = false;
    active = null;
    aboutOpen = false;
    mobileMenuOpen = false;
    resetIdle();
    window.scrollTo(0, 0);
  }
  let active: Section | null = null;
  let trigger: HTMLButtonElement | null = null;

  function toggle(section: Section, event: MouseEvent) {
    if (active === section) { closePanel(); return; }
    trigger = event.currentTarget as HTMLButtonElement;
    active = section;
  }
  function closePanel() { active = null; trigger?.focus(); }
  function openMobileMenu() { active = null; mobileMenuOpen = true; }
  function toggleAbout() {
    if (shopOpen) history.pushState({}, '', '/');
    shopOpen = false;
    aboutOpen = !aboutOpen;
    resetIdle();
  }
  function closeAbout() { aboutOpen = false; resetIdle(); }
  function toggleShop() {
    aboutOpen = false;
    shopOpen = !shopOpen;
    history.pushState({}, '', shopOpen ? '/shop' : '/');
    resetIdle();
  }
  async function closeShop() {
    shopOpen = false;
    history.pushState({}, '', '/');
    resetIdle();
    await tick();
    document.getElementById('home-shop-trigger')?.focus({ preventScroll: true });
  }
  function closeHomePanels() {
    aboutOpen = false;
    if (shopOpen) history.pushState({}, '', '/');
    shopOpen = false;
    resetIdle();
  }
  function openShopFromPage() {
    history.pushState({}, '', '/shop');
    isAbout = false;
    aboutOpen = false;
    active = null;
    mobileMenuOpen = false;
    shopOpen = true;
    resetIdle();
  }
</script>

<svelte:head>
  <title>{isAbout ? 'Our Story — Brick Street Bagels' : shopOpen ? 'Shop — Brick Street Bagels' : 'Brick Street Bagels'}</title>
  <meta name="description" content="Brick Street Bagels — Boston." />
</svelte:head>
<svelte:window onkeydown={(event) => { if (event.key === 'Escape') { if (shopOpen) closeShop(); else if (aboutOpen) closeAbout(); else if (active) closePanel(); } }} />

{#if isAbout}
  <SiteHeader {isAbout} {active} onNavigate={navigate} onShop={openShopFromPage} onSelect={toggle} onOpenMobileMenu={openMobileMenu} />
{/if}

<LocationsPanel open={active === 'Locations'} onclose={closePanel} />

{#if isAbout}
  <AboutPage />
{:else}
  <LandingPage {shopOpen} {aboutOpen} {isIdle} {reducedMotion} onCloseHomePanels={closeHomePanels} onToggleAbout={toggleAbout} onToggleShop={toggleShop} onCloseShop={closeShop} onResetIdle={resetIdle} />
{/if}

<ShopPanel open={shopOpen} onclose={closeShop} />

<AboutDrawer open={aboutOpen && !isAbout} onclose={closeAbout} />

<MobileMenu open={mobileMenuOpen} onclose={() => mobileMenuOpen = false} {isAbout} onNavigate={navigate} onShop={openShopFromPage} />
