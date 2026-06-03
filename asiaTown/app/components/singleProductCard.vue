<script setup>
const props = defineProps({
    title: String,
    slug: String,
    price: Number,
    category: String,
    image: String,
    imageSmall: String,
});
</script>

<template>
    <NuxtLink :to="`/products/${slug}`" class="product-card">
        <div class="image-wrapper">
            <NuxtImg 
            :src="imageSmall || image" 
            :alt="title" 
            class="product-image" />
        </div>

        <div class="content">
            <p class="category">{{ category }}</p>
            <h4 class="title">{{ title }}</h4>
            <h4 class="price">{{ price }} kr.</h4>
        </div>
    </NuxtLink>
</template>

<style scoped>
main {
    background-color: seagreen;
    padding: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 6px;
}

.image-wrapper {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid lightgray;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  gap: 16px;
}

.category {
    font-size: var(--font-small);
}

.title {
    font-size: var(--font-h4-desktop);

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.price {
  font-size: var(--font-h4-desktop);
  margin-top: auto;
}
</style>