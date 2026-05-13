<script setup>
const STRAPI_URL = 'https://diplomatic-friend-1bce2a96ef.strapiapp.com'

// Filter state
const search = ref('')
const selectedCategories = ref([])
const selectedCountries = ref([])
const selectedBrands = ref([])

// Hent ALLE produkter én gang — bruges til at beregne counts og filtrere lokalt
const { data: allProductsRes } = await useFetch(
  `${STRAPI_URL}/api/products`,
  {
    key: 'all-products',
    query: { populate: '*', 'pagination[pageSize]': 1000 },
  }
)
const allProducts = computed(() => allProductsRes.value?.data ?? [])

// Filter-funktion: returnerer hvilke produkter der ville matche givet et sæt filtre
const matchesFilters = (product, filters) => {
  if (filters.search && !product.Title?.toLowerCase().includes(filters.search.toLowerCase())) {
    return false
  }
  if (filters.categories?.length) {
    const productCats = (product.kategoriers ?? []).map(k => k.Kategori)
    if (!filters.categories.some(c => productCats.includes(c))) return false
  }
  if (filters.countries?.length) {
    if (!product.land || !filters.countries.includes(product.land.Land)) return false
  }
  if (filters.brands?.length) {
    if (!product.brand || !filters.brands.includes(product.brand.Brand)) return false
  }
  return true
}

// Beregn counts: for hver filter-option, hvor mange matcher
// hvis vi tilføjede netop den option til de øvrige aktive filtre?
const countFor = (filterKey, optionValue) => {
  const testFilters = {
    search: search.value,
    categories: filterKey === 'categories' ? [optionValue] : selectedCategories.value,
    countries: filterKey === 'countries' ? [optionValue] : selectedCountries.value,
    brands: filterKey === 'brands' ? [optionValue] : selectedBrands.value,
  }
  return allProducts.value.filter(p => matchesFilters(p, testFilters)).length
}

// Filtrerede produkter
const filteredProducts = computed(() => {
  return allProducts.value.filter(p => matchesFilters(p, {
    search: search.value,
    categories: selectedCategories.value,
    countries: selectedCountries.value,
    brands: selectedBrands.value,
  }))
})

// Saml unikke filter-optioner fra produktdata
const allCategories = computed(() => {
  const map = new Map()
  allProducts.value.forEach(p => {
    (p.kategoriers ?? []).forEach(k => {
      if (!map.has(k.Kategori)) map.set(k.Kategori, k)
    })
  })
  return Array.from(map.values()).sort((a, b) => a.Kategori.localeCompare(b.Kategori))
})

const allCountries = computed(() => {
  const map = new Map()
  allProducts.value.forEach(p => {
    if (p.land && !map.has(p.land.Land)) map.set(p.land.Land, p.land)
  })
  return Array.from(map.values()).sort((a, b) => a.Land.localeCompare(b.Land))
})

const allBrands = computed(() => {
  const map = new Map()
  allProducts.value.forEach(p => {
    if (p.brand && !map.has(p.brand.Brand)) map.set(p.brand.Brand, p.brand)
  })
  return Array.from(map.values()).sort((a, b) => a.Brand.localeCompare(b.Brand))
})

// Helpers
const getImageUrl = (product) => {
  const img = product.Image?.[0]
  if (!img) return null
  return img.formats?.small?.url || img.url
}

const getImageAlt = (product) => product.Image?.[0]?.alternativeText || product.Title

const formatPrice = (price) => {
  if (price == null) return null
  return `${price.toFixed(2).replace('.', ',')} kr`
}

const resetFilters = () => {
  search.value = ''
  selectedCategories.value = []
  selectedCountries.value = []
  selectedBrands.value = []
}

const hasActiveFilters = computed(() =>
  !!(search.value
    || selectedCategories.value.length
    || selectedCountries.value.length
    || selectedBrands.value.length)
)

const activeFilterCount = computed(() =>
  selectedCategories.value.length
  + selectedCountries.value.length
  + selectedBrands.value.length
  + (search.value ? 1 : 0)
)
</script>

<template>
  <main style="max-width: 1300px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif;">
    <h1 style="margin-bottom: 1.5rem;">Produkter</h1>

    <div style="display: grid; grid-template-columns: 260px 1fr; gap: 2rem; align-items: start;">

      <!-- Sidebar -->
      <aside style="position: sticky; top: 1rem; background: #f8f8f8; padding: 1.25rem; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h2 style="margin: 0; font-size: 1.1rem;">
            Filtre
            <span v-if="activeFilterCount" style="background: #2c7be5; color: white; font-size: 0.75rem; padding: 0.15rem 0.5rem; border-radius: 999px; margin-left: 0.5rem;">
              {{ activeFilterCount }}
            </span>
          </h2>
          <button
            v-if="hasActiveFilters"
            @click="resetFilters"
            style="font-size: 0.8rem; background: transparent; border: none; color: #e74c3c; cursor: pointer; text-decoration: underline;"
          >
            Nulstil
          </button>
        </div>

        <!-- Search -->
        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.4rem;">Søg</label>
          <input
            v-model="search"
            type="text"
            placeholder="Søg..."
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"
          />
        </div>

        <!-- Categories -->
        <div v-if="allCategories.length" style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 0.875rem; margin: 0 0 0.5rem;">Kategori</h3>
          <label
            v-for="cat in allCategories"
            :key="cat.documentId"
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; cursor: pointer; font-size: 0.9rem;"
          >
            <input
              v-model="selectedCategories"
              type="checkbox"
              :value="cat.Kategori"
            />
            <span style="flex: 1;">{{ cat.Kategori }}</span>
            <span style="color: #999; font-size: 0.8rem;">({{ countFor('categories', cat.Kategori) }})</span>
          </label>
        </div>

        <!-- Countries -->
        <div v-if="allCountries.length" style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 0.875rem; margin: 0 0 0.5rem;">Land</h3>
          <label
            v-for="c in allCountries"
            :key="c.documentId"
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; cursor: pointer; font-size: 0.9rem;"
          >
            <input
              v-model="selectedCountries"
              type="checkbox"
              :value="c.Land"
            />
            <span style="flex: 1;">{{ c.Land }}</span>
            <span style="color: #999; font-size: 0.8rem;">({{ countFor('countries', c.Land) }})</span>
          </label>
        </div>

        <!-- Brands -->
        <div v-if="allBrands.length">
          <h3 style="font-size: 0.875rem; margin: 0 0 0.5rem;">Brand</h3>
          <label
            v-for="b in allBrands"
            :key="b.documentId"
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; cursor: pointer; font-size: 0.9rem;"
          >
            <input
              v-model="selectedBrands"
              type="checkbox"
              :value="b.Brand"
            />
            <span style="flex: 1;">{{ b.Brand }}</span>
            <span style="color: #999; font-size: 0.8rem;">({{ countFor('brands', b.Brand) }})</span>
          </label>
        </div>
      </aside>

      <!-- Results -->
      <section>
        <p v-if="!filteredProducts.length" style="color: #666; padding: 2rem; text-align: center; background: #f8f8f8; border-radius: 8px;">
          Ingen produkter matcher dine filtre.
        </p>

        <div v-else>
          <p style="color: #666; margin: 0 0 1rem;">{{ filteredProducts.length }} produkt(er)</p>

          <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem;">
            <li
              v-for="product in filteredProducts"
              :key="product.documentId"
              style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;"
            >
              <img
                v-if="getImageUrl(product)"
                :src="getImageUrl(product)"
                :alt="getImageAlt(product)"
                style="width: 100%; height: 200px; object-fit: cover;"
              />
              <div v-else style="width: 100%; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #999;">
                Intet billede
              </div>

              <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">
                <h3 style="margin: 0 0 0.5rem; font-size: 1rem;">{{ product.Title }}</h3>

                <p v-if="product.Pris" style="margin: 0 0 0.5rem; font-weight: bold;">
                  {{ formatPrice(product.Pris) }}
                </p>

                <p v-if="product.ProduktBeskrivelse" style="margin: 0 0 0.75rem; color: #666; font-size: 0.875rem; flex: 1;">
                  {{ product.ProduktBeskrivelse }}
                </p>

                <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: auto;">
                  <span v-if="product.brand" style="background: #d4edda; color: #155724; padding: 0.15rem 0.5rem; border-radius: 3px; font-size: 0.75rem;">
                    {{ product.brand.Brand }}
                  </span>
                  <span v-if="product.land" style="background: #d4edda; color: #155724; padding: 0.15rem 0.5rem; border-radius: 3px; font-size: 0.75rem;">
                    {{ product.land.Land }}
                  </span>
                  <span v-for="kat in product.kategoriers" :key="kat.documentId" style="background: #d4edda; color: #155724; padding: 0.15rem 0.5rem; border-radius: 3px; font-size: 0.75rem;">
                    {{ kat.Kategori }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>