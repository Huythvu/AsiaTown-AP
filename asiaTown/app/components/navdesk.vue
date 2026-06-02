<script setup>
import Fuse from "fuse.js";

const search = ref("");

const { data } = await useFetch(
  "https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products?populate=*",
);

const products = computed(() => data.value?.data || []);

const filteredProducts = computed(() => {
  if (!search.value.trim()) return [];

  const fuse = new Fuse(products.value, {
    keys: ["Title", "kategoriers.Kategori"],
    threshold: 0.3,
  });

  const results = fuse.search(search.value);

  return results.map((result) => result.item);
});
</script>
<template>
  <header class="navbar">
    <!-- Top navigation -->
    <div class="nav-top">
      <NuxtLink to="/" class="logo">
        <img
          src="https://diplomatic-friend-1bce2a96ef.media.strapiapp.com/asia_Town_1_456a806ff1.png"
          alt="Asia Town logo"
        />
      </NuxtLink>

      <div class="search">
        <input v-model="search" type="search" placeholder="Søg i vores butik" />
        <div v-if="search.length > 1" class="search-results">
          <NuxtLink
            v-for="product in filteredProducts"
            :key="product.id"
            :to="`/products/${product.Slug}`"
          >
            {{ product.Title }}
          </NuxtLink>
        </div>
        <button>
          <Icon name="mdi:magnify" class="search-icon" />
        </button>
      </div>
    </div>

    <!-- Main navigation -->
    <nav class="nav-bottom">
      <div class="nav-item">
        <NuxtLink to="/products">
          Alle varer
          <Icon name="mdi:chevron-down" />
        </NuxtLink>
        <div class="dropdown">
          <NuxtLink
            :to="{
              path: '/products',
              query: { category: 'Frosne Varer' },
            }"
          >
            Frosne varer
          </NuxtLink>

          <NuxtLink
            :to="{
              path: '/products',
              query: { category: 'Friske Varer' },
            }"
          >
            Friske varer
          </NuxtLink>

          <NuxtLink
            :to="{
              path: '/products',
              query: { category: 'Snacks' },
            }"
          >
            Snacks
          </NuxtLink>

          <NuxtLink
            :to="{
              path: '/products',
              query: { category: 'Soja-&-Sauces' },
            }"
          >
            Soja & Sauces
          </NuxtLink>
          <NuxtLink
            :to="{
              path: '/products',
              query: {
                category: 'Nudler',
              },
            }"
          >
            Nudler
          </NuxtLink>
        </div>
      </div>

      <div class="nav-item">
        <NuxtLink to="/products/category/nudler">
          Nudler
          <Icon name="mdi:chevron-down" />
        </NuxtLink>

        <div class="dropdown">
          <NuxtLink
            :to="{
              path: '/products/category/nudler',
              query: { type: 'Instant nudler' },
            }"
          >
            Instant nudler
          </NuxtLink>
          <NuxtLink
            :to="{
              path: '/products/category/nudler',
              query: { type: 'Udon nudler' },
            }"
          >
            Udon nudler
          </NuxtLink>
        </div>
      </div>
      <div class="nav-item">
        <NuxtLink to="/products/category/Soja-&-Sauces">
          Soja/Sauce
          <Icon name="mdi:chevron-down" />
        </NuxtLink>
        <div class="dropdown">
          <NuxtLink
            :to="{
              path: '/products/category/Soja-&-Sauces',
              query: { type: 'Chilli' },
            }"
          >
            Chilli
          </NuxtLink>
          <NuxtLink
            :to="{
              path: '/products/category/Soja-&-Sauces',
              query: { type: 'Eddike' },
            }"
          >
            Eddike
          </NuxtLink>
          <NuxtLink
            :to="{
              path: '/products/category/Soja-&-Sauces',
              query: { type: 'Marinade' },
            }"
          >
            Marinade
          </NuxtLink>
          <NuxtLink
            :to="{
              path: '/products/category/Soja-&-Sauces',
              query: { type: 'Mayo' },
            }"
          >
            Mayo
          </NuxtLink>
          <NuxtLink
            :to="{
              path: '/products/category/Soja-&-Sauces',
              query: { type: 'Pasta' },
            }"
          >
            Pasta
          </NuxtLink>
          <NuxtLink
            :to="{
              path: '/products/category/Soja-&-Sauces',
              query: { type: 'Sauce' },
            }"
          >
            Sauce
          </NuxtLink>
          <NuxtLink
            :to="{
              path: '/products/category/Soja-&-Sauces',
              query: { type: 'Soja' },
            }"
          >
            Soja
          </NuxtLink>
        </div>
      </div>
      <div class="nav-item">
        <NuxtLink to="/products/category/snacks">
          Snacks
          <Icon name="mdi:chevron-down" />
        </NuxtLink>
        <div class="dropdown">
          <NuxtLink
            :to="{
              path: '/products/category/snacks',
              query: { type: 'Seaweed' },
            }"
          >
            Seaweed
          </NuxtLink>
          <NuxtLink
            :to="{ path: '/products/category/snacks', query: { type: 'Slik' } }"
          >
            Slik
          </NuxtLink>
          <NuxtLink
            :to="{
              path: '/products/category/snacks',
              query: { type: 'Tørret frugt' },
            }"
          >
            Tørret frugt
          </NuxtLink>
        </div>
      </div>

      <NuxtLink to="/recipes"> Madopskrifter </NuxtLink>

      <NuxtLink to="/kontakt"> Kontakt </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.nav-top {
  display: flex;
  align-items: center;
  gap: var(--space-3xl);
  padding: var(--space-lg) var(--space-3xl);
  border-bottom: 1px solid #000000;
}

.logo img {
  width: 5rem;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 1rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.search {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 999px;
  background: white;
}

.search input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  outline: none;
  background: transparent;
}

.search button {
  border: none;
  background: transparent;
  padding-inline: 1.5rem;
  cursor: pointer;
}

.search-icon {
  font-size: 1.5rem;
}

.search-results a {
  display: block;
  padding: 1rem 1.5rem;
  color: black;
  text-decoration: none;
}

.search-results a:hover {
  background: #f7f7f7;
}

.nav-bottom {
  display: flex;
  align-items: center;
  gap: var(--space-2xl);
  padding: var(--space-lg) var(--space-3xl);
}

.nav-bottom a {
  gap: var(--space-xs);
  font-weight: var(--weight-label);
  text-decoration: none;
}

.nav-item {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  flex-direction: column;
  min-width: 14rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 0.5rem 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.dropdown a {
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: black;
  font-weight: 400;
}

.dropdown a:hover {
  text-decoration: underline;
}

.nav-item:hover .dropdown {
  display: flex;
}

@media (max-width: 768px) {
  .navbar {
    display: none;
  }
}
</style>
