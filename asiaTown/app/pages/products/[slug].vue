<script setup>
const product = {
    brand: 'Nongshim',
    title: 'Shin Ramyun Gourmet Spicy Nongshim',
    price: '15,95 kr.',
    description:
        'Nongshim Shin Ramyun Gourmet Spicy er koreanske instantnudler med en stærk og fyldig oksekødsbaseret suppe.',
    image: 'https://www.figma.com/api/mcp/asset/ee28d38a-5749-4ac6-8770-d17f79181c0c',
}

const recipes = [
    ['Creamy Shin Ramyun med æg og ost', 'https://www.figma.com/api/mcp/asset/5baf9a5d-2995-4a1a-8f04-4e5a8b41324e'],
    ['Korean Army Stew (Budae Jjigae)', 'https://www.figma.com/api/mcp/asset/570dd010-f393-4d46-ac24-331169a80c5b'],
    ['Shin Ramyun stir-fry', 'https://www.figma.com/api/mcp/asset/53be980e-5b13-472a-bd08-b2f64d90efb5'],
]

const relatedProducts = [
    {
        title: 'Buldak Lime flavor',
        price: '13,95',
        image: 'https://www.figma.com/api/mcp/asset/953b22f9-39a3-4f67-8b0a-7f6e6b3374fc',
        categories: ['Nudler'],
    },
    {
        title: 'Buldak Carbonara',
        price: '13,95',
        image: 'https://www.figma.com/api/mcp/asset/e8fc810e-0975-4a50-b06f-3160ee6d1344',
        categories: ['Nudler'],
    },
    {
        title: 'Chapagetti Nongshim',
        price: '15,95',
        image: 'https://www.figma.com/api/mcp/asset/a080c3aa-8443-4179-bed9-dedf14193ed3',
        categories: ['Nudler'],
    },
    {
        title: 'Shin Kimchi Ramyun',
        price: '15,95',
        image: 'https://www.figma.com/api/mcp/asset/67854c8f-ad30-418f-825d-87364d2c1d58',
        categories: ['Nudler'],
    }
]
</script>

<template>
    <main class="page">
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

        <section class="section">
            <h2>Opskrifter med dette produkt</h2>

            <div class="recipe-grid">
                <article v-for="[title, image] in recipes" :key="title">
                    <img :src="image" :alt="title" />
                    <h3>{{ title }}</h3>
                </article>
            </div>
        </section>

        <section class="section">
            <h2>Relaterede produkter</h2>

            <div class="product-grid">
                <SingleProductCard v-for="product in relatedProducts" :key="product.title" :product="product" />
            </div>
        </section>
    </main>
</template>

<style scoped>
.page {
    /* max-width: 1440px;
    margin: 0 auto;
    padding: 16px 64px 64px; */

    /* Move to style.css later */
    /* background: #fff; */
    /* color: #1a1a1a; */
}

.breadcrumbs {
    margin-bottom: var(--space-md);
}

.product {
  display: grid;
  grid-template-columns: minmax(300px, 720px) minmax(300px, 1fr);
  gap: clamp(32px, 5vw, 64px);
  margin-bottom: 64px;
}

.product-img {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-img img {
  max-width:60%;
  height: auto;
  object-fit: contain;
}

.brand {
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 500;

    /* color: #4f4f4f; */
}

h1 {
    margin-bottom: 16px;
    font-size: 40px;
    font-weight: 600;
    line-height: 1.5;
}

.price {
    margin-bottom: 16px;
    font-size: 32px;
    font-weight: 600;
}

.tabs {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
    border-top: 1px solid;
    border-bottom: 1px solid;
    /* border-color: #e5e5e5; */
}

.tabs button {
    position: relative;
    padding: 16px 0 12px;
    border: 0;
    background: none;
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
}

.tabs .active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 8px;
    width: 100%;
    height: 2px;

    background: #000;
}

.recipe-grid,
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.recipe-grid img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 6px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}
</style>
