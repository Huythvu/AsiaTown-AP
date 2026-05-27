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

  <section class="categories">
    <div class="heading">
      <p class="label">KATEGORIER</p>
      <h2>Udforsk vores udvalg</h2>
    </div>

    <div class="category-grid">
      <article class="category-card">
        <img
          src="https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=1200&auto=format&fit=crop"
          alt="Nudler"
        />

        <div class="overlay"></div>

        <h3>Nudler</h3>
      </article>

      <article class="category-card">
        <img
          src="https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop"
          alt="Soja"
        />

        <div class="overlay"></div>

        <h3>Soja / Sauce</h3>
      </article>

      <article class="category-card">
        <img
          src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1200&auto=format&fit=crop"
          alt="Snacks"
        />

        <div class="overlay"></div>

        <h3>Snacks</h3>
      </article>
    </div>
  </section>

  <section class="recipes">
    <div class="heading">
      <p class="label">INSPIRATION</p>
      <h2>Madopskrifter</h2>
    </div>

    <div class="recipe-grid">
      <Recipe />
      <Recipe />
      <Recipe />
    </div>
  </section>

  <section class="newsletter">
    <div class="newsletter-content">
      <h2>Hold dig opdateret</h2>

      <p>
        Tilmeld dig vores nyhedsbrev og få besked om nye produkter, tilbud og
        opskrifter.
      </p>

      <form class="newsletter-form">
        <input type="email" placeholder="Din e-mailadresse" />

        <button>
          <Icon name="ph:paper-plane-tilt" class="send-icon" /> Tilmeld
        </button>
      </form>
    </div>
  </section>
</template>
<style scoped>
/* Hero sektion */
.hero {
  padding: 48px;
  border-radius: 16px;
  background-color: #f5e1d9;

  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 600px;
}

h1 span {
  color: #e94e3c;
}

p {
  margin-top: 16px;
}

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

.udvalgte-produkter {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-md);
}

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

/* Cards for kategorier og madopskrifter */

.heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-2xl);
}

.label {
  color: #d4a437;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.category-card {
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
}

.category-card img {
  height: 22rem;
  object-fit: cover;
}

.category-card h3 {
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  color: white;
}

.recipes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.overline {
  color: #d4a017;
  font-size: 14px;
  letter-spacing: 2px;
  margin-bottom: 4px;
}

h2 {
  margin-top: var(--section-padding-y);
}

.see-all {
  color: #e94e3c;
  font-weight: 500;
  text-decoration: none;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Nyhedsbrev */

.newsletter {
  padding: var(--space-3xl);
  background: #f3f3f3;
  border-radius: 1rem;
}

.newsletter-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.newsletter-content p {
  margin-block: var(--space-lg);
}

.newsletter-form {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
}

.newsletter-form input {
  width: 100%;
  max-width: 35rem;
  padding: 1.5rem 2rem;
  border: none;
  border-radius: 1.5rem;
  background: #b3b3b3;
  color: white;
}

.newsletter-form input::placeholder {
  color: white;
}

.newsletter-form button {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding-inline: 2rem;
  border: none;
  border-radius: 1.5rem;

  background: #ff7300;
  color: white;
}

.send-icon {
  font-size: 20px;
}
</style>
