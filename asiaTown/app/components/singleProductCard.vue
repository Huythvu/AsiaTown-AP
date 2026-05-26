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
        <div class="product-card__image-wrapper">
            <NuxtImg :src="product.imageSmall ?? product.image" :alt="product.title" class="product-card__image" />
        </div>
        <div class="product-card__content">
            <p class="product-card__category">{{ product.categories[0]}}</p>
            <h4 class="product-card__title">{{ product.title }}</h4>
            <h4 class="product-card__price">{{ product.price }} kr.</h4>
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

.product-card__image-wrapper {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid red;

}

.product-card__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.product-card__content {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
}

.product-card__category {
    font-size: var(--font-small);
    margin: 0;
}

.product-card__title {
    font-size: var(--font-h4-desktop);
    margin: 0;
}

.product-card__price {
    font-size: var(--font-h4-desktop);
    margin: 0;
}
</style>