<script setup>
const route = useRoute()

const categoryParam = computed(() => route.params.category)

// Hent kategori + headerbillede
const { data: categoryData } = await useFetch(
  'https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/kategoris',
  {
    query: {
      'filters[Kategori][$eqi]': categoryParam,
      'populate': 'KategoriHeader',
    },
  }
)

const category = computed(() => categoryData.value?.data?.[0] || null)
const categoryHeader = computed(() => category.value?.KategoriHeader || null)

// Hent produkter i kategorien
const { data, error } = await useFetch(
  'https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products',
  {
    query: {
      'filters[kategoriers][Kategori][$eqi]': categoryParam,
      populate: '*',
    },
  }
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
  showCategoryFilter: false,
  showTypeFilter: true,
  showBrandFilter: true,
  showCountryFilter: true,
  minPrice: 0,
})
</script>

<template>
  <nav>
  </nav>
  <main>
    <header class="category-hero">
      <NuxtImg v-if="categoryHeader" :src="categoryHeader.formats?.large?.url || categoryHeader.url" width="1920"
        height="300" :alt="`${category?.Kategori} header billede`" class="category-image" />

      <h1 class="category-title">{{ category?.Kategori }}</h1>
    </header>
    <p>breadCrumb</p>

    <section class="product-layout ">
      <ProductFilter :filter-groups="filterGroups" :selected-filters="selectedFilters"
        :selected-max-price="selectedMaxPrice" :min-price="minPrice" :max-price="maxPrice"
        :has-active-filters="hasActiveFilters" :active-filter-count="activeFilterCount"
        @update:selected-filters="selectedFilters = $event" @update:selected-max-price="selectedMaxPrice = $event"
        @reset="resetFilters" />
      <div class="product-content">
        <div class="toolbar">
          <p class="product-count">{{ filteredProducts.length }} produkter</p>
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

        <div v-if="filteredProducts.length > 0" class="product-list">
          <SingleProductCard v-for="product in filteredProducts" :key="product.id" :title="product.Title"
            :slug="product.Slug" :price="product.Pris"
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
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.category-image {
  object-fit: cover;
}

.category-title {
  position: absolute;
  left: 16px;
  bottom: 16px;
  color: white;
  z-index: 2;
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
    height: 220px;
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
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 24px;
  }
}
</style>
