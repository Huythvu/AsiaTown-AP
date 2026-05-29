<script setup>
import Fuse from "fuse.js";

const search = ref("");

const { data } = await useFetch(
  "https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products?populate=*"
);

const products = computed(() => data.value?.data || []);

const filteredProducts = computed(() => {
  if (!search.value.trim()) return [];

  const fuse = new Fuse(products.value, {
    keys: ["Title"],
    includeScore: true,
    threshold: 0.4,
  });

  const results = fuse.search(search.value);

  console.log(results);

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
        <button type="submit">
          <Icon name="mdi:magnify" class="search-icon" />
        </button>
      </div>
    </div>

    <!-- Main navigation -->
    <nav class="nav-bottom">
      <NuxtLink to="/">
        Alle varer
        <Icon name="mdi:chevron-down" />
      </NuxtLink>

      <NuxtLink to="/">
        Nudler
        <Icon name="mdi:chevron-down" />
      </NuxtLink>

      <NuxtLink to="/">
        Soja/Sauce
        <Icon name="mdi:chevron-down" />
      </NuxtLink>

      <NuxtLink to="/">
        Snacks
        <Icon name="mdi:chevron-down" />
      </NuxtLink>

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

.search {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 999px;
  overflow: visible;
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

@media (max-width: 768px) {
  .navbar {
    display: none;
  }
}
</style>
