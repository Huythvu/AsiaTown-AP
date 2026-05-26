<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="products-page">
        <h1 class="products-title">Products</h1>
        <div class="products-grid">
        <SingleProductCard v-for="n in 8" :key="n" />
        </div>
    </div>
</template>

<style scoped>
</style>