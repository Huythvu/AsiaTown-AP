<script setup>
const { data, error } = await useFetch(
  'https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products?populate=*'
)

const products = computed(() =>
  data.value?.data.map(p => ({
    id: p.id,
    slug: p.Slug,
    title: p.Title,
    price: p.Pris,
    description: p.ProduktBeskrivelse,
    nutrition: p.Naeringsindhold,
    brand: p.brand?.Brand,
    country: p.land?.Land,
    categories: p.kategoriers?.map(k => k.Kategori) ?? [],
    types: p.types?.map(t => t.Type) ?? [],
    image: p.Image?.[0]?.url,
    imageSmall: p.Image?.[0]?.formats?.small?.url,
    imageMedium: p.Image?.[0]?.formats?.medium?.url,
  })) ?? []
)
</script>

<template>
  <main>
  <nav>
    <p>global nav</p>
    <p>breadCrumb</p>
  </nav>
  <header>
    <h1>Alle Varer</h1>
    <p>Udforsk vores komplette sortiment af asiatiske produkter.</p>
  </header>
  
    <div class="product-layout">
      <aside class="filter">
        <p>Filter</p>
        <div class="filterbackgroundtest"></div>
      </aside>

      <div class="product-content">
        <div class="toolbar">
          <p>{{ products.length }} produkter</p>

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
          <SingleProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
        <div v-else-if="error">
          <p>Der skete en fejl med at hente produkter.</p>
        </div>
        <div v-else>
          <p>Ingen produkter tilgængelige.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
nav{
  margin-bottom: var(--space-md);
}
h1{
  margin-bottom: var(--space-sm);
}
.product-layout {
  margin-top: var(--space-lg);
  display: grid;
  grid-template-columns: 310px 1fr;
  gap: 24px;
}

/* Placeholder sizing for the filter while it's empty */
.filter .filterbackgroundtest {
  width: 310px;
  height: 700px;
  background: #f0f0f0; /* so you can actually see it */
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sort {
  display: flex;
  align-items: center;
  gap: 16px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}
</style>
