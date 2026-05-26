<script setup>
import { ref } from 'vue';
</script>

<template>
<!-- Sidebar: filters -->
      <aside class="filter-sidebar">
        <div class="filter-title">
          <span>☷</span>
          <h2>Filtre</h2>
        </div>

        <section class="filter-section">
          <h3>Kategori</h3>
          <button
            v-for="category in categories"
            :key="category.name"
            class="filter-row"
            type="button"
          >
            <span class="filter-left">
              <span class="checkbox"></span>
              <span>{{ category.icon }}</span>
              <span>{{ category.name }}</span>
            </span>
            <span>›</span>
          </button>
        </section>

        <section class="filter-section">
          <h3>Pris</h3>
          <div class="price-label">
            <span></span>
            <span>0 - 300 kr.</span>
          </div>
          <input class="price-range" type="range" min="0" max="300" value="300" />
          <div class="price-min-max">
            <span>0 kr.</span>
            <span>300 kr.</span>
          </div>
        </section>

        <section class="filter-section">
          <h3>Brands</h3>
          <label v-for="brand in brands" :key="brand.name" class="check-row">
            <span class="filter-left">
              <input type="checkbox" />
              <span>{{ brand.name }}</span>
            </span>
            <span>({{ brand.count }})</span>
          </label>
        </section>

        <section class="filter-section">
          <h3>Land</h3>
          <label v-for="country in countries" :key="country.name" class="check-row">
            <span class="filter-left">
              <input type="checkbox" />
              <span>{{ country.name }}</span>
            </span>
            <span>({{ country.count }})</span>
          </label>
        </section>
      </aside>
</template>

<style scoped>
</style>