<script setup>
const props = defineProps({
  id: Number,
  title: String,
  slug: String,
  price: Number,
  category: String,
  image: String,
  imageSmall: String,
});

const favorites = ref([]);

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]");
});

const isFavorite = computed(() => favorites.value.includes(props.id));

function toggleFavorite(event) {
  event.preventDefault();

  if (favorites.value.includes(props.id)) {
    favorites.value = favorites.value.filter((id) => id !== props.id);
  } else {
    favorites.value.push(props.id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites.value));

  console.log("klik", props.id);
}
</script>

<template>
  <NuxtLink :to="`/products/${slug}`" class="product-card">
    <div class="image-wrapper">
      <button class="favorite-btn" @click.stop.prevent="toggleFavorite">
        <Icon :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" />
      </button>

      <NuxtImg :src="imageSmall || image" :alt="title" class="product-image" />
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

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;

  background: white;
  border: none;
  border-radius: 50%;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 2;
}

.favorite-btn .iconify {
  font-size: 24px;
}

.product-card {
  position: relative;
}
</style>
