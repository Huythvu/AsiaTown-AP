<script setup>
const { data } = await useFetch(
  "https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products?populate=*&pagination[limit]=8"
);

const products = computed(() => data.value?.data.slice(0, 8) || []);
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <h1>
        Autentiske asiatiske <br />
        <span>råvarer & specialiteter</span>
      </h1>

      <p>
        Udforsk vores store udvalg af nudler, saucer, snacks og friske varer
        direkte fra Asien. Alt hvad du behøver til dit asiatiske køkken.
      </p>

      <div class="hero-buttons">
        <NuxtLink to="/produkter" class="btn-primary">
          Se alle varer →
        </NuxtLink>

        <NuxtLink to="/opskrifter" class="btn-secondary">
          Madopskrifter
        </NuxtLink>
      </div>
    </div>
  </section>
  <section class="udvalgt">
    <div class="header">
      <h2>Udvalgte produkter</h2>
      <NuxtLink to="/produkter" class="see-all">Se alle →</NuxtLink>
    </div>
    <div class="udvalgte-produkter">
      <div v-for="product in products" :key="product.id" class="card">
        <NuxtLink :to="`/produkter/${product.Slug}`">
          <img
            :src="
              product.Image?.[0]?.formats?.small?.url || product.Image?.[0]?.url
            "
            :alt="product.Title"
          />

          <div class="card-content">
            <p class="kategori">
              {{ product.kategorier?.[0]?.Kategori }}
            </p>

            <h4>{{ product.Title }}</h4>

            <p class="price">{{ product.Pris }} kr.</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<style scoped>
/* HERO SIDE */

.hero {
  padding: 48px;
  border-radius: 16px;
  background-color: #f5e1d9;

  position: relative;
  overflow: hidden;
}

/* Content */
.hero-content {
  max-width: 600px;
}

h1 span {
  color: #e94e3c;
}

/* Text */
p {
  margin-top: 16px;
  color: #555;
  max-width: 500px;
  line-height: 1.5;
}

/* Buttons */
.hero-buttons {
  margin-top: var(--space-md);
  display: flex;
  gap: var(--space-md);
}

.btn-primary {
  background: #e94e3c;
  color: white;
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
}

.btn-secondary {
  background: #eee;
  padding: 12px 20px;
  border-radius: 999px;
  color: black;
  text-decoration: none;
}

/* Grid */
.udvalgte-produkter {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

/* Card FJERN SENERE*/
.card {
  border: 1px solid #eee;
  border-radius: 8px;
  transition: 0.2s;
}

.card-content {
  padding: 16px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
</style>
