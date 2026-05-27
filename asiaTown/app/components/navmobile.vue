<template>
  <header class="mobile-nav">
    <div class="nav-top">
      <NuxtLink to="/" class="logo">
        <img src="" alt="Logo" />
      </NuxtLink>

      <button class="burger-btn" @click="isOpen = !isOpen">
        <Icon v-if="!isOpen" name="mdi:menu" />

        <Icon v-else name="mdi:close" />
      </button>
    </div>

    <nav v-if="isOpen" class="mobile-menu">
      <NuxtLink to="/"> Alle varer </NuxtLink>

      <NuxtLink to="/"> Nudler </NuxtLink>

      <NuxtLink to="/"> Soja/Sauce </NuxtLink>

      <NuxtLink to="/"> Snacks </NuxtLink>

      <NuxtLink to="/recipes"> Madopskrifter </NuxtLink>

      <NuxtLink to="/kontakt"> Kontakt </NuxtLink>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<style scoped>
.mobile-nav {
  display: none;
}

@media (max-width: 768px) {
  .mobile-nav {
    display: block;

    padding: var(--space-md);

    border-bottom: 1px solid #ddd;

    background: white;
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
    align-items: center;
    justify-content: center;

    background: transparent;
    border: none;
  }

  .burger-btn .icon {
    font-size: 2.5rem;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;

    gap: var(--space-lg);

    padding-top: var(--space-xl);
  }

  .mobile-menu a {
    color: black;
    text-decoration: none;
    font-weight: 500;
  }
}
</style>
