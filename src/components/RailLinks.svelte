<script lang="ts">
  export let cateringUrl: string;
  export let aboutOpen: boolean | undefined = undefined;
  export let shopOpen: boolean | undefined = undefined;
  export let shopId: string | undefined = undefined;
  export let onToggleAbout: () => void;
  export let onShopClick: () => void;
  export let onLinkClick: () => void;
</script>

<button type="button" aria-expanded={aboutOpen} aria-controls={aboutOpen === undefined ? undefined : 'about-drawer'} onclick={onToggleAbout}>about</button><a href={cateringUrl} target="_blank" rel="noreferrer" onclick={onLinkClick}>catering</a><button id={shopId} type="button" aria-expanded={shopOpen} aria-controls="shop-panel" onclick={onShopClick}>shop</button><a href="https://www.instagram.com/brick.street.bagels" target="_blank" rel="noreferrer" onclick={onLinkClick}>instagram</a>
