<script setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <header class="mobile-nav">
    <div class="nav-top">
      <NuxtLink to="/" class="logo">
        <img src="https://diplomatic-friend-1bce2a96ef.media.strapiapp.com/asia_Town_1_456a806ff1.png"
          alt="Asia Town logo" />
      </NuxtLink>

      <button class="burger-btn" @click="isOpen = !isOpen">
        <Icon v-if="!isOpen" name="mdi:menu" size="40" />
        <Icon v-else name="mdi:close" size="40" />
      </button>
    </div>

    <Transition name="fade">
      <div v-if="isOpen" class="overlay" @click="isOpen = false"></div>
    </Transition>

    <Transition name="slide">
      <nav v-if="isOpen" class="mobile-menu">
        <NuxtLink to="/products" @click="isOpen = false"> Alle varer </NuxtLink>

        <details>
          <summary>Nudler</summary>
          <NuxtLink class="category-link" to="/products/category/nudler" @click="isOpen = false">
            Alle nudler
          </NuxtLink>
          <NuxtLink :to="{
            path: '/products/category/nudler',
            query: { type: 'Instant nudler' },
          }" @click="isOpen = false">
            Instant nudler
          </NuxtLink>

          <NuxtLink :to="{
            path: '/products/category/nudler',
            query: { type: 'Udon nudler' },
          }" @click="isOpen = false">
            Udon nudler
          </NuxtLink>
        </details>

        <details>
          <summary>Soja / Sauce</summary>
          <NuxtLink class="category-link" to="/products/category/Soja-&-Sauces" @click="isOpen = false">
            Alle soja & sauces
          </NuxtLink>
          <NuxtLink :to="{
            path: '/products/category/Soja-&-Sauces',
            query: { type: 'Chilli' },
          }" @click="isOpen = false">
            Chilli
          </NuxtLink>

          <NuxtLink :to="{
            path: '/products/category/Soja-&-Sauces',
            query: { type: 'Eddike' },
          }" @click="isOpen = false">
            Eddike
          </NuxtLink>

          <NuxtLink :to="{
            path: '/products/category/Soja-&-Sauces',
            query: { type: 'Marinade' },
          }" @click="isOpen = false">
            Marinade
          </NuxtLink>

          <NuxtLink :to="{
            path: '/products/category/Soja-&-Sauces',
            query: { type: 'Mayo' },
          }" @click="isOpen = false">
            Mayo
          </NuxtLink>

          <NuxtLink :to="{
            path: '/products/category/Soja-&-Sauces',
            query: { type: 'Pasta' },
          }" @click="isOpen = false">
            Pasta
          </NuxtLink>

          <NuxtLink :to="{
            path: '/products/category/Soja-&-Sauces',
            query: { type: 'Sauce' },
          }" @click="isOpen = false">
            Sauce
          </NuxtLink>

          <NuxtLink :to="{
            path: '/products/category/Soja-&-Sauces',
            query: { type: 'Soja' },
          }" @click="isOpen = false">
            Soja
          </NuxtLink>
        </details>

        <details>
          <summary>Snacks</summary>
          <NuxtLink class="category-link" to="/products/category/snacks" @click="isOpen = false">
            Alle snacks
          </NuxtLink>
          <NuxtLink :to="{
            path: '/products/category/snacks',
            query: { type: 'Seaweed' },
          }" @click="isOpen = false">
            Seaweed
          </NuxtLink>

          <NuxtLink :to="{ path: '/products/category/snacks', query: { type: 'Slik' } }" @click="isOpen = false">
            Slik
          </NuxtLink>

          <NuxtLink :to="{
            path: '/products/category/snacks',
            query: { type: 'Tørret frugt' },
          }" @click="isOpen = false">
            Tørret frugt
          </NuxtLink>
        </details>

        <NuxtLink to="/recipes" @click="isOpen = false">
          Madopskrifter
        </NuxtLink>

        <NuxtLink to="/kontakt" @click="isOpen = false"> Kontakt </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-nav {
  display: none;
}

.mobile-menu details {
  margin-bottom: 1rem;
}

.mobile-menu summary {
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 500;
}

.mobile-menu details a {
  display: block;
  margin-top: 0.75rem;
  margin-left: 1.5rem;
  text-decoration: none;
}

@media (max-width: 768px) {
  .mobile-nav {
    display: block;
    padding: var(--space-md);
    border-bottom: 1px solid #ddd;
    margin-bottom: var(--space-xl);
  }

  .nav-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo img {
    width: 4rem;
  }

  .burger-btn {
    display: flex;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1000;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    /* Gør baggrunden mørkere */
    backdrop-filter: blur(8px);
    z-index: 998;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    padding: 6rem 2rem;
    z-index: 999;
  }

  .mobile-menu a {
    font-size: 1.125rem;
    font-weight: 500;
  }

  .mobile-menu a:hover {
    text-decoration: underline;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
