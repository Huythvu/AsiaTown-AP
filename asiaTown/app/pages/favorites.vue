<script setup>
const { data } = await useFetch(
    "https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products?populate=*"
);

const products = computed(() => data.value?.data || []);

const favoriteIds = ref([]);

onMounted(() => {
    favoriteIds.value = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );
});

const favoriteProducts = computed(() =>
    products.value.filter((product) =>
        favoriteIds.value.includes(product.id)
    )
);
</script>

<template>
    <main>
        <h1>Mine favoritter</h1>

        <div v-if="favoriteProducts.length" class="product-list">
            <SingleProductCard v-for="product in favoriteProducts" :key="product.id" :id="product.id"
                :title="product.Title" :slug="product.Slug" :price="product.Pris"
                :category="product.kategoriers?.[0]?.Kategori" :image="product.Image?.[0]?.url"
                :image-small="product.Image?.[0]?.formats?.small?.url" />
        </div>

        <p v-else>
            Du har endnu ikke gemt nogen favoritter.
        </p>
    </main>
</template>

<style scoped>
.product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
}
</style>