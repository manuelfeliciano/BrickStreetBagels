<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  export let open = false;
  export let onclose: () => void;
  function slideDrawer(_node: Element, { duration = 560 } = {}) {
    return {
      duration,
      easing: cubicInOut,
      css: (_t: number, u: number) => `transform: translateX(${u * 100}%);`
    };
  }
</script>

{#if open}
  <dialog id="about-drawer" class="about-drawer" open aria-labelledby="drawer-title" transition:slideDrawer>
    <div class="about-drawer-heading"><p>About</p><button type="button" onclick={onclose}>close</button></div>
    <div class="about-drawer-content">
      <div class="about-drawer-intro">
        <article>
          <p class="drawer-kicker">A note from Jordan</p>
          <h2 id="drawer-title">I started with<br/>a home oven.</h2>
        </article>
        <figure><img src="/images/story.jpg" alt="The Brick Street Bagels team at the bakery" /></figure>
      </div>
      <div class="about-drawer-story">
        <p>I started Brick Street Bagels in my South End apartment in late 2022. I baked early in the morning and late at night, then delivered bagels by bike before and after my day job, hoping to meet more neighbors along the way.</p>
        <p>Nine months later, Andrew joined me and we moved into Bar Mezzana’s kitchen. From 2:30am until the kitchen staff arrived at 8, we baked like crazy, loaded up my car, and set up a folding table in a nearby park.</p>
        <div class="about-story-photos"><figure><img src="/images/bakery-window.jpg" alt="Brick Street Bagels serving an early pop-up"/><figcaption>Aug 26, 2023</figcaption></figure><figure><img src="/images/bakery-hands.jpg" alt="Brick Street Bagels at the bakery doorway"/><figcaption>Today</figcaption></figure></div>
        <p>The pop-ups carried us through the seasons. When winter came, The Buttery helped us offer bagels in the South End five days a week—and the excitement from our community kept us going every morning.</p>
        <p>Now we’re growing into South Boston, with more room for bagels, coffee, and ideas from a team of creative people. The South End is still home, and I can’t wait to keep seeing you in both neighborhoods.</p>
        <p class="drawer-signoff">The bagel adventure continues.</p>
        <p class="drawer-founder">Jordan Renouf<br/><span>Founder / Owner / Sneezes weird</span></p>
      </div>
    </div>
  </dialog>
{/if}
