<script setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <header class="mobile-nav">
    <div class="nav-top">
      <NuxtLink to="/" class="logo">
        <img
          src="https://diplomatic-friend-1bce2a96ef.media.strapiapp.com/asia_Town_1_456a806ff1.png"
          alt="Asia Town logo"
        />
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
        <NuxtLink to="/" @click="isOpen = false"> Alle varer </NuxtLink>

        <NuxtLink to="/" @click="isOpen = false"> Nudler </NuxtLink>

        <NuxtLink to="/" @click="isOpen = false"> Soja/Sauce </NuxtLink>

        <NuxtLink to="/" @click="isOpen = false"> Snacks </NuxtLink>

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

@media (max-width: 768px) {
  .mobile-nav {
    display: block;
    padding: var(--space-md);
    border-bottom: 1px solid #ddd;
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
    background: rgba(0, 0, 0, 0.2); /* Gør baggrunden mørkere */
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
