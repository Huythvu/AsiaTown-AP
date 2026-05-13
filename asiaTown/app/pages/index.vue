<script setup>
const { data: response, error, pending } = await useFetch(
  'https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products?populate=*',
  { key: 'products' }
)

const products = computed(() => response.value?.data ?? [])

// Helper: get first image URL (prefer small format for performance)
const getImageUrl = (product) => {
  const firstImage = product.Image?.[0]
  if (!firstImage) return null
  return firstImage.formats?.small?.url || firstImage.url
}

const getImageAlt = (product) => {
  return product.Image?.[0]?.alternativeText || product.Title
}
</script>

<template>
  <main style="max-width: 800px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif;">
    <h1>Products</h1>

    <p v-if="pending">Loading...</p>
    <p v-else-if="error" style="color: red;">Error: {{ error.message }}</p>
    <p v-else-if="!products.length">No products found.</p>

    <ul v-else style="list-style: none; padding: 0;">
      <li
        v-for="product in products"
        :key="product.documentId"
        style="padding: 1.5rem; border: 1px solid #ddd; margin-bottom: 1rem; border-radius: 8px;"
      >
        <img
          v-if="getImageUrl(product)"
          :src="getImageUrl(product)"
          :alt="getImageAlt(product)"
          style="display: block; max-width: 300px; height: auto; border-radius: 6px; margin-bottom: 0.75rem;"
        />
        <h2 style="margin: 0 0 0.5rem;">{{ product.Title }}</h2>
        <p style="margin: 0 0 0.5rem; color: #666;">{{ product.Description }}</p>
        <small v-if="product.Slug" style="color: #999;">Slug: {{ product.Slug }}</small>
      </li>
    </ul>
  </main>
</template>