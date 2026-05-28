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
    <header>
      <p>breadCrumb</p>
      <h1>Alle Varer</h1>
      <p>Udforsk vores komplette sortiment af asiatiske produkter.</p>
    </header>

    <section class="product-layout">
      <aside class="filter">
        <div class="filter-text">
          <Icon name="teenyicons:adjust-horizontal-solid" />
          <h4>Filter</h4>
        </div>
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
.filter-text{
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

.iconify{
  font-size: var(--font-body);
}

.sort {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  height: 38px;
}
.sort select{
  padding: 8px;
  font-size: var(--font-h4-desktop);
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
</style>
