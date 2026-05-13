<script setup>
const STRAPI_URL = 'https://diplomatic-friend-1bce2a96ef.strapiapp.com'

// Filter state — arrays now since we support multiple selections
const search = ref('')
const selectedCategories = ref([])
const selectedCountries = ref([])
const selectedBrands = ref([])
const selectedTypes = ref([])

// Fetch filter options
const { data: categoriesRes } = await useFetch(`${STRAPI_URL}/api/kategoriers`, { key: 'categories' })
const { data: countriesRes } = await useFetch(`${STRAPI_URL}/api/lands`, { key: 'countries' })
const { data: brandsRes } = await useFetch(`${STRAPI_URL}/api/brands`, { key: 'brands' })
const { data: typesRes } = await useFetch(`${STRAPI_URL}/api/types`, { key: 'types' })

const categories = computed(() => categoriesRes.value?.data ?? [])
const countries = computed(() => countriesRes.value?.data ?? [])
const brands = computed(() => brandsRes.value?.data ?? [])
const types = computed(() => typesRes.value?.data ?? [])

// Build query — uses $in for multi-select (matches ANY of the selected values)
const productQuery = computed(() => {
  const q = { populate: '*' }

  if (search.value) {
    q['filters[Title][$containsi]'] = search.value
  }

  // For arrays, Strapi expects filters[field][$in][0]=val1&filters[field][$in][1]=val2
  selectedCategories.value.forEach((val, i) => {
    q[`filters[kategorier][Kategori][$in][${i}]`] = val
  })
  selectedCountries.value.forEach((val, i) => {
    q[`filters[land][Land][$in][${i}]`] = val
  })
  selectedBrands.value.forEach((val, i) => {
    q[`filters[brand][Brand][$in][${i}]`] = val
  })
  selectedTypes.value.forEach((val, i) => {
    q[`filters[type][Type][$in][${i}]`] = val
  })

  return q
})

const { data: response, pending, error } = await useFetch(
  `${STRAPI_URL}/api/products`,
  {
    key: 'products',
    query: productQuery,
    watch: [productQuery],
  }
)

const products = computed(() => response.value?.data ?? [])

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
  selectedTypes.value = []
}

const hasActiveFilters = computed(() =>
  !!(search.value
    || selectedCategories.value.length
    || selectedCountries.value.length
    || selectedBrands.value.length
    || selectedTypes.value.length)
)

// Count active filters for display
const activeFilterCount = computed(() =>
  selectedCategories.value.length
  + selectedCountries.value.length
  + selectedBrands.value.length
  + selectedTypes.value.length
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
        <div v-if="categories.length" style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 0.875rem; margin: 0 0 0.5rem;">Kategori</h3>
          <label
            v-for="cat in categories"
            :key="cat.documentId"
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; cursor: pointer; font-size: 0.9rem;"
          >
            <input
              v-model="selectedCategories"
              type="checkbox"
              :value="cat.Kategori"
            />
            {{ cat.Kategori }}
          </label>
        </div>

        <!-- Countries -->
        <div v-if="countries.length" style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 0.875rem; margin: 0 0 0.5rem;">Land</h3>
          <label
            v-for="c in countries"
            :key="c.documentId"
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; cursor: pointer; font-size: 0.9rem;"
          >
            <input
              v-model="selectedCountries"
              type="checkbox"
              :value="c.Land"
            />
            {{ c.Land }}
          </label>
        </div>

        <!-- Brands -->
        <div v-if="brands.length" style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 0.875rem; margin: 0 0 0.5rem;">Brand</h3>
          <label
            v-for="b in brands"
            :key="b.documentId"
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; cursor: pointer; font-size: 0.9rem;"
          >
            <input
              v-model="selectedBrands"
              type="checkbox"
              :value="b.Brand"
            />
            {{ b.Brand }}
          </label>
        </div>

        <!-- Types -->
        <div v-if="types.length">
          <h3 style="font-size: 0.875rem; margin: 0 0 0.5rem;">Type</h3>
          <label
            v-for="t in types"
            :key="t.documentId"
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; cursor: pointer; font-size: 0.9rem;"
          >
            <input
              v-model="selectedTypes"
              type="checkbox"
              :value="t.Type"
            />
            {{ t.Type }}
          </label>
        </div>
      </aside>

      <!-- Results -->
      <section>
        <p v-if="pending" style="color: #666;">Indlæser...</p>
        <p v-else-if="error" style="color: red;">Fejl: {{ error.message }}</p>
        <p v-else-if="!products.length" style="color: #666; padding: 2rem; text-align: center; background: #f8f8f8; border-radius: 8px;">
          Ingen produkter matcher dine filtre.
        </p>

        <div v-else>
          <p style="color: #666; margin: 0 0 1rem;">{{ products.length }} produkt(er)</p>

          <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem;">
            <li
              v-for="product in products"
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
                  <span v-for="kat in product.kategorier" :key="kat.documentId" style="background: #d4edda; color: #155724; padding: 0.15rem 0.5rem; border-radius: 3px; font-size: 0.75rem;">
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