<script setup>
const product = {
  brand: "Nongshim",
  title: "Shin Ramyun Gourmet Spicy Nongshim",
  price: "15,95 kr.",
  description:
    "Nongshim Shin Ramyun Gourmet Spicy er koreanske instantnudler med en stærk og fyldig oksekødsbaseret suppe.",
  image:
    "https://www.figma.com/api/mcp/asset/ee28d38a-5749-4ac6-8770-d17f79181c0c",
};

const recipes = [
  [
    "Creamy Shin Ramyun med æg og ost",
    "https://www.figma.com/api/mcp/asset/5baf9a5d-2995-4a1a-8f04-4e5a8b41324e",
  ],
  [
    "Korean Army Stew (Budae Jjigae)",
    "https://www.figma.com/api/mcp/asset/570dd010-f393-4d46-ac24-331169a80c5b",
  ],
  [
    "Shin Ramyun stir-fry",
    "https://www.figma.com/api/mcp/asset/53be980e-5b13-472a-bd08-b2f64d90efb5",
  ],
];

const relatedProducts = [
  {
    title: "Buldak Lime flavor",
    price: "13,95",
    image:
      "https://www.figma.com/api/mcp/asset/953b22f9-39a3-4f67-8b0a-7f6e6b3374fc",
    categories: ["Nudler"],
  },
  {
    title: "Buldak Carbonara",
    price: "13,95",
    image:
      "https://www.figma.com/api/mcp/asset/e8fc810e-0975-4a50-b06f-3160ee6d1344",
    categories: ["Nudler"],
  },
  {
    title: "Chapagetti Nongshim",
    price: "15,95",
    image:
      "https://www.figma.com/api/mcp/asset/a080c3aa-8443-4179-bed9-dedf14193ed3",
    categories: ["Nudler"],
  },
  {
    title: "Shin Kimchi Ramyun",
    price: "15,95",
    image:
      "https://www.figma.com/api/mcp/asset/67854c8f-ad30-418f-825d-87364d2c1d58",
    categories: ["Nudler"],
  },
];
</script>

<template>
  <main>
    <nav class="breadcrumbs">
      <p>Breadcrumbs Later Fix</p>
    </nav>

    <section class="product">
      <div class="product-img">
        <img :src="product.image" :alt="product.title" />
      </div>

      <div class="product-info">
        <p class="brand">{{ product.brand }}</p>
        <h1>{{ product.title }}</h1>
        <p class="price">{{ product.price }}</p>

        <div class="tabs">
          <button class="active">Beskrivelse</button>
          <button>Næringsindhold</button>
        </div>

        <p>{{ product.description }}</p>
      </div>
    </section>

    <section class="recipe">
      <h2>Opskrifter med dette produkt</h2>

      <div class="recipe-grid">
        <article v-for="[title, image] in recipes" :key="title">
          <img :src="image" :alt="title" />
          <h3>{{ title }}</h3>
        </article>
      </div>
    </section>

    <section class="related">
      <h2>Relaterede produkter</h2>

      <div class="related-grid">
        <SingleProductCard
          v-for="product in relatedProducts"
          :key="product.title"
          :product="product"
        />
      </div>
    </section>
  </main>
  <Footer />
</template>

<style scoped>
.breadcrumbs {
  margin-bottom: var(--space-md);
}

.product {
  display: grid;
  grid-template-columns: minmax(300px, 1.2fr) minmax(300px, 1fr);
  gap: clamp(32px, 5vw, 64px);
}

.product-img {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-img img {
  max-width: 60%;
  height: auto;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.brand {
  font-size: var(--font-small);
  font-weight: var(--weight-medium);
  /* color: #4f4f4f;  CHANGE WHEN EVER ROOT COLORS ADDED*/
}

.recipe,
.related {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.price {
  font-size: var(--font-h3-desktop);
  font-weight: var(--weight-semibold);
}

.tabs {
  display: flex;
  gap: var(--space-lg);
  border-top: 1px solid;
  border-bottom: 1px solid;
  /* border-color: #e5e5e5; */
}

.tabs button {
  position: relative;
  padding: 16px 0 12px;
  border: 0;
  background: none;
  font-size: var(--font-h4-desktop);
  font-weight: var(--weight-medium);
  cursor: pointer;
}

.tabs .active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 8px;
  width: 100%;
  height: 2px;

  background: #000;
}

.recipe-grid,
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-lg);
}

.recipe-grid article {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.recipe-grid img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 6px;
}
</style>
