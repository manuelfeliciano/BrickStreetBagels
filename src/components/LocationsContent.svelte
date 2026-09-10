<script lang="ts">
  import { locations, directionsUrl } from '../lib/site';
</script>

<div class="locations-layout">
  <aside class="location-sidebar">
    <h2>Locations</h2>
    <p class="location-city">Boston</p>
    <p class="location-note">Find us in your neighborhood,<br/>every day of the week.</p>
  </aside>
  <div class="boston-locations">
    {#each locations as location}
      <article class="boston-location">
        <div class="location-placeholder" role="img" aria-label={location.name + ' photo placeholder'}><span>{location.name}</span><small>Location photograph to come</small></div>
        <div class="location-details"><h3>{location.name}</h3><div class="location-meta"><p>Open every day<br/>7:30am–2pm</p><address><a href={directionsUrl(location.address)} target="_blank" rel="noreferrer">{location.address}<br/>Boston, MA</a></address></div></div>
      </article>
    {/each}
  </div>
</div>
