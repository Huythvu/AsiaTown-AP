<script setup>
const { data } = await useFetch(
  "https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products?populate=*&pagination[limit]=8",
);

const products = computed(() => data.value?.data.slice(0, 8) || []);

const { data: recipeData } = await useFetch(
  "https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/recipes?populate=*&pagination[limit]=3",
);

const recipes = computed(() => recipeData.value?.data || []);
</script>

<template>
  <main>
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
          <NuxtLink to="/products" class="btn-primary">
            Se alle varer →
          </NuxtLink>

          <NuxtLink to="/recipes" class="btn-secondary">
            Madopskrifter →
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class="udvalgt">
      <div class="header">
        <h2>Udvalgte produkter</h2>
        <NuxtLink to="/products" class="see-all">Se alle →</NuxtLink>
      </div>
      <div class="udvalgte-produkter">
        <div v-for="product in products" :key="product.id" class="card">
          <NuxtLink :to="`/products/${product.Slug}`">
            <img
              :src="
                product.Image?.[0]?.formats?.small?.url ||
                product.Image?.[0]?.url
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
        <h4 class="label">KATEGORIER</h4>
        <h3>Udforsk vores udvalg</h3>
      </div>

      <div class="category-grid">
        <article class="category-card">
          <NuxtLink to="/products/category/nudler" class="category-card">
            <img
              src="https://diplomatic-friend-1bce2a96ef.media.strapiapp.com/nudler_bb774519b5.png"
              alt="Nudler"
            />
            <div class="overlay"></div>
            <h3>Nudler</h3>
          </NuxtLink>
        </article>

        <article class="category-card">
          <NuxtLink to="/products/category/Soja-&-Sauces" class="category-card">
            <img
              src="https://diplomatic-friend-1bce2a96ef.media.strapiapp.com/sauces_18bc6018f1.png"
              alt="Soja"
            />
            <div class="overlay"></div>
            <h3>Soja / Sauce</h3>
          </NuxtLink>
        </article>

        <article class="category-card">
          <NuxtLink to="/products/category/snacks" class="category-card">
            <img
              src="https://diplomatic-friend-1bce2a96ef.media.strapiapp.com/snacks_3cffed9894.png"
              alt="Snacks"
            />
            <div class="overlay"></div>
            <h3>Snacks</h3>
          </NuxtLink>
        </article>
      </div>
    </section>

    <section class="recipes">
      <div class="heading">
        <h4 class="label">INSPIRATION</h4>
        <h3>Madopskrifter</h3>
      </div>
      <div class="recipe-grid">
        <Recipe
          v-for="recipe in recipes"
          :key="recipe.id"
          :title="recipe.Title"
          :slug="recipe.Slug"
          :description="recipe.Description"
          :image="recipe.Image[0]?.url"
          :time="`${recipe.Tid.Tid} ${recipe.Tid.Unit}`"
          :persons="recipe.AntalPersoner"
          :difficulty="recipe.Difficulty"
        />
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
          <input type="email" placeholder="Indtast din e-mailadresse" />

          <button type="submit">
            <Icon name="ph:paper-plane-tilt" class="send-icon" />
            Tilmeld
          </button>
        </form>
      </div>
    </section>
  </main>
</template>
<style scoped>
/* Hero sektion */
.hero {
  padding: 64px;
  height: 450px;
  background-image: url("https://diplomatic-friend-1bce2a96ef.media.strapiapp.com/hero_billede_c6307160f7.png");
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 600px;
}

h1 span {
  color: #e94e3c;
}

.hero-content p {
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
  background: white;
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
.category-card:first-child img {
  object-position: 75% center;
}
.udvalgt {
  padding-top: var(--section-padding-y);
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
  border-radius: 1rem;
  border: 1px solid black;
  margin-bottom: var(--space-3xl);
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
  background: white;
  border: 1px solid black;
  color: black;
}

.newsletter-form input::placeholder {
  color: BLACK;
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

@media (max-width: 1289px) {
  .recipe-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-xl);
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: fit-content;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }

  .udvalgte-produkter {
    grid-template-columns: 1fr;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .category-card img {
    height: 18rem;
  }

  .recipe-grid {
    grid-template-columns: 1fr;
  }

  .newsletter {
    padding: var(--space-xl);
  }

  .newsletter-content {
    text-align: left;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form input {
    max-width: 100%;
  }

  .newsletter-form button {
    justify-content: center;

    padding-block: 1rem;
  }
}
</style>
