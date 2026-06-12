<script setup>
const { data, error } = await useFetch(
  "https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products?populate=*"
)

const products = computed(() => data.value?.data || [])

const {
  selectedFilters,
  selectedMaxPrice,
  filterGroups,
  filteredProducts,
  minPrice,
  maxPrice,
  hasActiveFilters,
  activeFilterCount,
  resetFilters,
} = useProductFilters(products, {
  showCategoryFilter: true,
  showTypeFilter: true,
  showBrandFilter: true,
  showCountryFilter: true,
  minPrice: 0,
})
</script>

<template>
  <main>
    <header>
      <h1>Alle Varer</h1>
      <p>Udforsk vores komplette sortiment af asiatiske produkter.</p>
    </header>

    <section class="product-layout">
      <div class="desktop-filter">
        <ProductFilter :filter-groups="filterGroups" :selected-filters="selectedFilters"
          :selected-max-price="selectedMaxPrice" :min-price="minPrice" :max-price="maxPrice"
          :has-active-filters="hasActiveFilters" :active-filter-count="activeFilterCount"
          @update:selected-filters="selectedFilters = $event" @update:selected-max-price="selectedMaxPrice = $event"
          @reset="resetFilters" />
      </div>

      <div class="product-content">
        <div class="toolbar">
          <p class="product-count">{{ filteredProducts.length }} produkter</p>

          <MobileFilter>
            <ProductFilter :filter-groups="filterGroups" :selected-filters="selectedFilters"
              :selected-max-price="selectedMaxPrice" :min-price="minPrice" :max-price="maxPrice"
              :has-active-filters="hasActiveFilters" :active-filter-count="activeFilterCount"
              @update:selected-filters="selectedFilters = $event" @update:selected-max-price="selectedMaxPrice = $event"
              @reset="resetFilters" />
          </MobileFilter>

          <div class="sort">
            <Icon name="tabler:arrows-sort" />
            <Select>
              <option value="popular">Mest Populære</option>
              <option value="az">A-Z</option>
              <option value="category">Kategori</option>
            </Select>
          </div>
        </div>

        <div v-if="filteredProducts.length > 0" class="product-list">
          <SingleProductCard v-for="product in filteredProducts" :key="product.id" :id="product.id"
            :title="product.Title" :slug="product.Slug" :price="product.Pris"
            :category="product.kategoriers?.[0]?.Kategori ?? 'Ukategoriseret'" :image="product.Image?.[0]?.url"
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
header {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.product-layout {
  display: grid;
  grid-template-columns: minmax(180px, 310px) minmax(310px, 1fr);
  gap: var(--space-lg);
}

.desktop-filter {
  display: block;
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

@media (max-width: 768px) {
  header {
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
  }

  .product-layout {
    display: block;
  }

  .desktop-filter {
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

  .sort {
    order: 2;
    justify-self: end;
  }

  .product-count {
    order: 3;
    grid-column: 1 / -1;
  }

  .product-list {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
  }
}
</style>