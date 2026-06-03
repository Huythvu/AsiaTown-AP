<script setup>
const isOpen = ref(false)
</script>

<template>
  <button class="mobile-filter-button" type="button" @click="isOpen = true">
    <Icon name="teenyicons:adjust-horizontal-solid" />
    Filtre
  </button>

  <Transition name="fade">
    <div
      v-if="isOpen"
      class="filter-overlay"
      @click="isOpen = false"
    ></div>
  </Transition>

  <Transition name="slide">
    <div
      v-if="isOpen"
      class="mobile-filter-drawer"
      @click.stop
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.mobile-filter-button {
  display: none;
}

@media (max-width: 768px) {
  .mobile-filter-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: 8px;
    border: 1px solid #1a1a1a;
    border-radius: 6px;
    background: white;
    font-size: var(--font-body);
    order: 1;
  }

  .filter-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
    z-index: 1001;
  }

  .mobile-filter-drawer {
    position: fixed;
    top: 0;
    left: 0;
    width: 70%;
    max-width: 340px;
    height: 100dvh;
    background: white;
    padding: var(--space-lg);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1002;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-100%);
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