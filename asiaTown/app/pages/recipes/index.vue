<template>
  <section class="recipe-hero">
    <div class="overlay"></div>

    <div class="hero-content">
      <h1>Madopskrifter</h1>

      <p>Lad dig inspirere af autentiske asiatiske opskrifter</p>
    </div>
  </section>

  <section class="recipes-page">
    <!-- Filters -->
    <div class="filters">
      <button class="filter-btn">
        Sværhedsgrad
        <Icon name="mdi:chevron-down" />
      </button>

      <button class="filter-btn">
        Tilberedningstid
        <Icon name="mdi:chevron-down" />
      </button>

      <button class="filter-btn">
        Land
        <Icon name="mdi:chevron-down" />
      </button>
    </div>

    <div class="recipe-grid">
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
    </div>
  </section>
</template>

<style scoped>
.recipe-hero {
  position: relative;
  height: 25rem;
  padding: 4rem;
  background-image: url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.hero-content {
  position: relative;
  z-index: 2;

  color: white;
}

.hero-content p {
  margin-top: var(--space-md);
}

.recipes-page {
  padding-block: var(--space-3xl);
}

.filters {
  display: flex;
  gap: var(--space-md);

  margin-bottom: var(--space-3xl);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--space-sm);

  padding: 1rem 1.5rem;

  border: 1px solid black;
  border-radius: 999px;

  background: white;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-xl);
}
</style>
