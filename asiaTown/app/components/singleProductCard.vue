<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="product-card">
        <div class="image-wrapper">
            <NuxtImg :src="product.imageSmall ?? product.image" :alt="product.title" class="product-image" />
        </div>
        <div class="content">
            <p class="category">{{ product.categories[0] }}</p>
            <h4 class="title">{{ product.title }}</h4>
            <h4 class="price">{{ product.price }} kr.</h4>
        </div>
    </div>
</template>


<style scoped>
main {
    background-color: seagreen;
    padding: 20px;
}

.product-card {
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    border-radius: 6px;
}

.image-wrapper {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid red;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.content {
    display: flex;
    flex-direction: column;
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
}
</style>