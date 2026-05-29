<script setup>
import MySwiper from '~/components/swiper/MySwiper.vue';


const product = {
    brand: 'Nongshim',
    title: 'Shin Ramyun Gourmet Spicy Nongshim',
    price: '15,95 kr.',
    description:
        'Nongshim Shin Ramyun Gourmet Spicy er koreanske instantnudler med en stærk og fyldig oksekødsbaseret suppe.',
    image: 'https://www.figma.com/api/mcp/asset/ee28d38a-5749-4ac6-8770-d17f79181c0c',
}

const recipes = [
    {
        title: 'Creamy Shin Ramyun med æg og ost',
        image: 'https://www.figma.com/api/mcp/asset/5baf9a5d-2995-4a1a-8f04-4e5a8b41324e',
    },
    {
        title: 'Korean Army Stew (Budae Jjigae)',
        image: 'https://www.figma.com/api/mcp/asset/570dd010-f393-4d46-ac24-331169a80c5b',
    },
    {
        title: 'Shin Ramyun stir-fry',
        image: 'https://www.figma.com/api/mcp/asset/53be980e-5b13-472a-bd08-b2f64d90efb5',
    },
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
                <MySwiper :items="recipes" v-slot="{ item }">
                    <article>
                        <img :src="item.image" :alt="item.title" />
                        <h3>{{ item.title }}</h3>
                    </article>
                </MySwiper>
            </div>
        </section>

        <section class="related">
            <h2>Relaterede produkter</h2>
            <div class="related-grid">
                <MySwiper :items="relatedProducts" v-slot="{ item }">
                    <SingleProductCard :product="item" />
                </MySwiper>
            </div>
        </section>
    </main>
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
    content: '';
    position: absolute;
    left: 0;
    bottom: 8px;
    width: 100%;
    height: 2px;
    background: #000;
}

.recipe-grid article {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.recipe-grid img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: 6px;
}

.recipe-grid :deep(.swiper-slide) {
    width: calc(33.333% - 10.666px);
}

.related-grid :deep(.swiper-slide) {
    width: calc(33.333% - 10.666px);
}

.recipe,
.related {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

@media (max-width: 768px) {

    section.product {
        display: block;
        padding-bottom: var(--space-xl);
    }

    section.recipe {
        padding-bottom: var(--space-xl);
    }

    section.related {
        padding-bottom: var(--space-xl);
    }

    .recipe-grid :deep(.swiper-slide) {
        width: 100%;

    }

    .related-grid :deep(.swiper-slide) {
        width: 100%;
    }
}
</style>
