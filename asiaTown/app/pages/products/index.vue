<script setup>
const { data, error } = await useFetch(
  'https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products?populate=*'
)

const products = computed(() => data.value?.data || [])
</script>

<template>
  <main>
    <header>
      <p>breadCrumb</p>
      <h1>Alle Varer</h1>
      <p>Udforsk vores komplette sortiment af asiatiske produkter.</p>
    </header>

    <section class="product-layout">
      <aside class="filter">
        <div class="filter-text">
          <Icon name="teenyicons:adjust-horizontal-solid" />
          <h4>Filtre</h4>
        </div>

        <div class="filterbackgroundtest"></div>
      </aside>

      <div class="product-content">
        <div class="toolbar">
          <p class="product-count">{{ products.length }} produkter</p>

          <button class="mobile-filter-button" type="button">
            <Icon name="teenyicons:adjust-horizontal-solid" />
            Filtre
          </button>

          <div class="sort">
            <Icon name="tabler:arrows-sort" />
            <Select>
              <option value="popular">Mest Populære</option>
              <option value="az">A-Z</option>
              <option value="category">Kategori</option>
            </Select>
          </div>
        </div>

        <div v-if="products.length > 0" class="product-list">
          <SingleProductCard v-for="product in products" 
            :key="product.id" 
            :title="product.Title" 
            :slug="product.Slug"
            :price="product.Pris" 
            :category="product.kategoriers?.[0]?.Kategori ?? 'Ukategoriseret'"
            :image="product.Image?.[0]?.url" 
            :image-small="product.Image?.[0]?.formats?.small?.url" />
        </div>
        <div v-else-if="error">
          <p>Der skete en fejl med at hente produkter.</p>
        </div>
        <div v-else>
          <p>Ingen produkter tilgængelige.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Maybe make this header spacing a global value and add a margin buttom*/
header {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.product-layout {
  display: grid;
  grid-template-columns: 310px 1fr;
  gap: var(--space-lg);
}

/* Placeholder sizing for the filter while it's empty */
.filter .filterbackgroundtest {
  width: 310px;
  height: 700px;
  background: #f0f0f0;
  /* so you can actually see it */
}

.filter-text {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.iconify {
  font-size: var(--font-body);
}

.sort {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  height: 38px;
}

.sort select {
  padding: 8px;
  border-radius: 6px;
  font-size: var(--font-body);
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.mobile-search {
  display: none;
}

.mobile-filter-button {
  display: none;
}

/* MOBILE VERSION */
@media (max-width: 768px) {

  header {
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
  }

  .mobile-search input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: var(--font-body);
  }

  .mobile-search input::placeholder {
    color: #1a1a1a;
    opacity: 1;
  }

  .product-layout {
    display: block;
  }

  .filter {
    display: none;
  }

  .product-content {
    gap: var(--space-md);
  }

  .toolbar {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-md);
    align-items: center;
  }

  .mobile-filter-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: 8px;
    border: 1px solid #1a1a1a;
    border-radius: 6px;
    background: white;
    font-size: var(--font-body);
    order: 1;
  }

  .sort {
    order: 2;
    justify-self: end;
  }

  .product-count {
    order: 3;
    grid-column: 1 / -1;
  }

  .product-list {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 24px;
  }
}
</style>
