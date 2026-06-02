<script setup>
import MySwiper from '~/components/swiper/MySwiper.vue'

const route = useRoute()
const BASE = 'https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/products'

const { data } = await useFetch(BASE, {
  key: `product-${route.params.slug}`,
  query: computed(() => ({
    'filters[Slug][$eq]': route.params.slug,
    'populate[Image]': true,
    'populate[brand]': true,
    'populate[kategoriers]': true,
    'populate[land]': true,
    'populate[types]': true,
    'populate[recipes][populate][Image]': true,
  })),
})

const product = computed(() => data.value?.data?.[0] || null)

if (!product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Produkt ikke fundet' })
}

const { data: relatedData } = await useFetch(BASE, {
  key: `related-${route.params.slug}`,
  query: computed(() => ({
    'filters[kategoriers][Kategori][$eq]':
      product.value?.kategoriers?.[0]?.Kategori,
    'filters[Slug][$ne]': route.params.slug,
    populate: '*',
    'pagination[limit]': 8,
  })),
})

const relatedProducts = computed(() => relatedData.value?.data || [])

const activeTab = ref('beskrivelse')
</script>

<template>
    <main>
        <nav class="breadcrumbs">
            <p>Breadcrumbs Later Fix</p>
        </nav>

        <section class="product">
            <div class="product-img">
                <img :src="product.Image?.[0]?.url" :alt="product.Title" />
            </div>

            <div class="product-info">
                <p class="brand">{{ product.brand?.Brand }}</p>
                <h1>{{ product.Title }}</h1>
                <p class="price">{{ product.Pris }} kr.</p>

                <div class="tabs">
                    <button :class="{ active: activeTab === 'beskrivelse' }" @click="activeTab = 'beskrivelse'">
                        Beskrivelse
                    </button>
                    <button :class="{ active: activeTab === 'naering' }" @click="activeTab = 'naering'">
                        Næringsindhold
                    </button>
                </div>

                <p v-if="activeTab === 'beskrivelse'">{{ product.ProduktBeskrivelse }}</p>
                <p v-else>{{ product.Naeringsindhold }}</p>
            </div>
        </section>

        <section v-if="product.recipes?.length" class="recipe">
            <h2>Opskrifter med dette produkt</h2>
            <div class="recipe-grid">
                <MySwiper :items="product.recipes" v-slot="{ item }">
                    <nuxt-link :to="`/recipes/${item.Slug}`">
                        <img :src="item.Image?.[0]?.url" :alt="item.Title" />
                        <h4>{{ item.Title }}</h4>
                    </nuxt-link>
                </MySwiper>
            </div>
        </section>

        <section v-if="relatedProducts.length" class="related">
            <h2>Relaterede produkter</h2>
            <div class="related-grid">
                <MySwiper :items="relatedProducts" v-slot="{ item }">
                    <SingleProductCard :title="item.Title" :slug="item.Slug" :price="item.Pris"
                        :category="item.kategoriers?.[0]?.Kategori ?? 'Ukategoriseret'" :image="item.Image?.[0]?.url"
                        :image-small="item.Image?.[0]?.formats?.small?.url" />
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
    width: calc(25% - 12px);
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
