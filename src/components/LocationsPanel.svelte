<script lang="ts">
  import LocationsContent from './LocationsContent.svelte';
  export let open = false;
  export let onclose: () => void;
  function autofocus(node: HTMLElement) { node.focus(); }
</script>

{#if open}
  <button class="panel-dismiss" aria-label="Close navigation panel" onclick={onclose}></button>
  <section id="nav-panel" class="nav-panel locations-panel" aria-label="Locations" tabindex="-1" use:autofocus>
    <LocationsContent />
  </section>
{/if}
