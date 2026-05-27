<template>
  <header class="navbar">
    <!-- Top navigation -->
    <div class="nav-top">
      <NuxtLink to="/" class="logo">
        <img src="" alt="Asia Town logo" />
      </NuxtLink>

      <form class="search">
        <input type="search" placeholder="Søg i vores butik" />

        <button type="submit">
          <Icon name="mdi:magnify" class="search-icon" />
        </button>
      </form>
    </div>

    <!-- Main navigation -->
    <nav class="nav-bottom">
      <NuxtLink to="/">
        Alle varer
        <Icon name="mdi:chevron-down" />
      </NuxtLink>

      <NuxtLink to="/">
        Nudler
        <Icon name="mdi:chevron-down" />
      </NuxtLink>

      <NuxtLink to="/">
        Soja/Sauce
        <Icon name="mdi:chevron-down" />
      </NuxtLink>

      <NuxtLink to="/">
        Snacks
        <Icon name="mdi:chevron-down" />
      </NuxtLink>

      <NuxtLink to="/recipes"> Madopskrifter </NuxtLink>

      <NuxtLink to="/kontakt"> Kontakt </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin: -64px;
}
.nav-top {
  display: flex;
  align-items: center;
  gap: var(--space-3xl);
  padding: var(--space-lg) var(--space-3xl);
  border-bottom: 1px solid #000000;
}

.logo img {
  width: 5rem;
}

.search {
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 999px;
  overflow: hidden;
}

.search input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  outline: none;
}

.search button {
  background: transparent;
  border: none;
  padding-inline: 1.5rem;
}

.search-icon {
  font-size: 1.5rem;
}

.nav-bottom {
  display: flex;
  align-items: center;
  gap: var(--space-2xl);
  padding: var(--space-lg) var(--space-3xl);
}

.nav-bottom a {
  gap: var(--space-xs);
  font-weight: var(--weight-label);
  text-decoration: none;
}
</style>
