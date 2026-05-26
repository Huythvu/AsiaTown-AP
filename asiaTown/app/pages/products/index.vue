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
  <div>
    <h1>Alle Varer</h1>


    <div v-if="products.length > 0" class="product-list">
      <SingleProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else-if="error">
      <p>Der skete en fejl med at hente produkter.</p>
    </div>
    <div v-else>
      <p>Ingen produkter tilgængelige.</p>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 24px;
}
.product-list > * {
  flex: 1 1 220px;
}
</style>