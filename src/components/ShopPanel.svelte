<script lang="ts">
  import { tick } from 'svelte';
  import './shop.css';

  export let open = false;
  export let onclose: () => void;

  type Product = {
    id: string;
    name: string;
    price: string;
    unit?: string;
    category: string;
    image?: string;
    alt?: string;
    description?: string;
    flavors?: string[];
  };

  const filters = ['Food', 'Merch'] as const;
  let filter: typeof filters[number] = 'Food';

  const foodCategories = ['Bagel Schmear', 'Bagels', 'Open-Faced Bagel Sandwich', 'Drinks'] as const;
  let foodCategory: typeof foodCategories[number] | null = null;

  const products: Product[] = [
    { id: 'bagel-schmear', name: 'Bagel + Schmear', price: '$5.00', category: 'Bagel Schmear', description: 'A fresh-baked bagel with your choice of cream cheese.', flavors: ['Everything', 'Sesame', 'Rosemary + Sea Salt', 'Cheddar Cheese', 'Poppy', 'Plain'] },
    { id: 'schmear', name: 'Schmear', price: '$7.25', unit: 'per 8oz tub', category: 'Bagel Schmear', image: '/images/story-counter.jpg', alt: 'Brick Street schmear tubs stacked beside fresh bagels', description: 'An 8oz tub of cream cheese, enough for 3–4 bagels.', flavors: ['Plain', 'Scallion', 'Dill Pickle', 'Maple Cinnamon', 'Bacon Scallion'] },

    { id: 'whole-bagel', name: 'Whole Bagels', price: '$3.25', unit: 'each', category: 'Bagels', image: '/images/bagels.jpg', alt: 'A selection of fresh Brick Street bagels', description: 'A single fresh-baked bagel, in your favorite flavor.', flavors: ['Everything', 'Sesame', 'Rosemary + Sea Salt', 'Cheddar Cheese', 'Poppy', 'Plain'] },
    { id: 'half-dozen', name: 'Half Dozen', price: '$18.00', unit: '6 bagels', category: 'Bagels', description: 'Six fresh bagels, mix and match your favorite flavors.' },
    { id: 'dozen', name: 'Dozen', price: '$33.00', unit: '12 bagels', category: 'Bagels', description: 'A dozen fresh bagels, mix and match your favorite flavors.' },

    { id: 'tomato-bagel', name: 'Tomato Bagel', price: '$8.50', category: 'Open-Faced Bagel Sandwich' },
    { id: 'spicy-bagel', name: 'Spicy Bagel', price: '$6.50', category: 'Open-Faced Bagel Sandwich' },
    { id: 'mothers-garden', name: 'Mother’s Garden', price: '$10.00', category: 'Open-Faced Bagel Sandwich' },
    { id: 'fish-and-chips', name: 'Fish and Chips', price: '$14.00', category: 'Open-Faced Bagel Sandwich' },
    { id: 'classic-lox', name: 'Classic Lox', price: '$14.00', category: 'Open-Faced Bagel Sandwich' },
    { id: 'butter-and-jam', name: 'Butter and Jam', price: '$6.50', category: 'Open-Faced Bagel Sandwich' },
    { id: 'big-dill', name: 'Big Dill', price: '$14.00', category: 'Open-Faced Bagel Sandwich' },

    { id: 'oj', name: 'OJ', price: '$4.00', category: 'Drinks' },
    { id: 'iced-matcha', name: 'Iced Matcha', price: '$5.25+', category: 'Drinks', description: 'Price shown is for the smallest size; larger sizes cost more.' },
    { id: 'hot-coffee', name: 'Hot Coffee', price: '$3.85', category: 'Drinks' },
    { id: 'cold-brew', name: 'Cold Brew', price: '$4.00+', category: 'Drinks', description: 'Price shown is for the smallest size; larger sizes cost more.' }
  ];

  function productsIn(category: string) { return products.filter((product) => product.category === category); }

  let categoryListEl: HTMLElement;
  let highlightTop = 0;
  let highlightHeight = 0;
  let highlightVisible = false;

  function glideTo(item: HTMLElement) {
    if (!categoryListEl) return;
    const containerRect = categoryListEl.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    highlightTop = itemRect.top - containerRect.top;
    highlightHeight = itemRect.height;
    highlightVisible = true;
  }
  function handleCategoryPointerMove(event: MouseEvent) {
    const item = (event.target as HTMLElement).closest('.shop-category-link') as HTMLElement | null;
    if (item) glideTo(item);
  }
  function handleCategoryFocusIn(event: FocusEvent) {
    const item = event.target as HTMLElement;
    if (item.classList?.contains('shop-category-link')) glideTo(item);
  }
  function hideGlide() { highlightVisible = false; }

  let selected: Product | null = null;
  let heading: HTMLHeadingElement;
  let wasOpen = false;

  $: if (open !== wasOpen) {
    if (open) {
      filter = 'Food';
      foodCategory = null;
      selected = null;
      focusHeading();
    }
    wasOpen = open;
  }

  async function focusHeading() { await tick(); heading?.focus({ preventScroll: true }); }
  function chooseFilter(category: typeof filters[number]) { filter = category; foodCategory = null; focusHeading(); }
  function showCategory(category: typeof foodCategories[number]) { foodCategory = category; focusHeading(); }
  function showCategoryList() { foodCategory = null; focusHeading(); }
  function showProduct(product: Product) { selected = product; focusHeading(); }
  function showGrid() { selected = null; focusHeading(); }

  // Pide's shop easing: cubic-bezier(.16, 1, .3, 1).
  function shopEase(progress: number) {
    let time = progress;
    for (let i = 0; i < 7; i++) {
      const remaining = 1 - time;
      const x = 3 * remaining * remaining * time * .16 + 3 * remaining * time * time * .3 + time ** 3;
      const slope = 3 * remaining * remaining * .16 + 6 * remaining * time * .14 + 3 * time * time * .7;
      time = Math.min(1, Math.max(0, time - (x - progress) / slope));
    }
    return 1 - (1 - time) ** 3;
  }

  function slideIn(_node: Element) {
    const mobile = window.matchMedia('(max-width: 799px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return { duration: reduce ? 0 : mobile ? 280 : 760, easing: shopEase, css: (_t: number, u: number) => `transform: translate${mobile ? 'Y' : 'X'}(${u * 100}%);` };
  }
  function slideOut(node: Element) {
    const mobile = window.matchMedia('(max-width: 799px)').matches;
    return { ...slideIn(node), duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : mobile ? 220 : 760 };
  }
</script>

{#if open}
  <section id="shop-panel" class="shop-panel" aria-label="Brick Street shop" in:slideIn out:slideOut>
    <div class="shop-panel-header"><h2 bind:this={heading} tabindex="-1">{selected ? selected.name : foodCategory ? foodCategory : 'shop'}</h2><button type="button" onclick={onclose}>close</button></div>
    <div class="shop-panel-content">
      {#if selected}
        <button class="shop-back" type="button" onclick={showGrid}>← back to {foodCategory ? foodCategory.toLowerCase() : 'shop'}</button>
        <div class="shop-product-detail">
          {#if selected.image}
            <img class:schmear-photo={selected.id === 'schmear'} src={selected.image} alt={selected.alt} />
          {:else}
            <div class="shop-product-placeholder shop-product-placeholder-detail">{selected.name}</div>
          {/if}
          <div class="shop-product-info">
            <p class="shop-product-kind">{selected.category}</p>
            <h3>{selected.name}</h3>
            <p class="shop-detail-price">{selected.price}{#if selected.unit} <span>{selected.unit}</span>{/if}</p>
            {#if selected.description}<p class="shop-description">{selected.description}</p>{/if}
            {#if selected.flavors}<h4>Flavors</h4><ul>{#each selected.flavors as flavor}<li>{flavor}</li>{/each}</ul>{/if}
          </div>
        </div>
      {:else if foodCategory}
        <button class="shop-back" type="button" onclick={showCategoryList}>← back to food</button>
        <div class="shop-grid">{#each productsIn(foodCategory) as product}<button class="shop-product-card" type="button" onclick={() => showProduct(product)} aria-label={'View ' + product.name.toLowerCase()}><span class="shop-product-image">{#if product.image}<img class:schmear-photo={product.id === 'schmear'} src={product.image} alt={product.alt} />{:else}<span class="shop-product-placeholder">{product.name}</span>{/if}</span><span class="shop-product-caption"><span>{product.name}</span><span>{product.price}</span></span>{#if product.unit}<span class="shop-product-unit">{product.unit}</span>{/if}</button>{/each}</div>
      {:else}
        <nav class="shop-filters" aria-label="Shop categories">{#each filters as category}<button type="button" class:chosen={filter === category} aria-pressed={filter === category} onclick={() => chooseFilter(category)}>{category}</button>{/each}</nav>
        <div class="shop-results" aria-live="polite">
          {#if filter === 'Merch'}
            <p class="shop-empty">No merch available yet.</p>
          {:else}
            <nav class="shop-category-list" aria-label="Food categories" bind:this={categoryListEl} onmousemove={handleCategoryPointerMove} onmouseleave={hideGlide} onfocusin={handleCategoryFocusIn}>
              <div class="shop-category-highlight" class:is-visible={highlightVisible} style="transform: translateY({highlightTop}px); height: {highlightHeight}px;"></div>
              {#each foodCategories as category}
                <button type="button" class="shop-category-link" onclick={() => showCategory(category)}>{category}</button>
              {/each}
            </nav>
          {/if}
        </div>
      {/if}
    </div>
  </section>
{/if}
