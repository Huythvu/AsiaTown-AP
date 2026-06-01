<script setup>
const { data } = await useFetch(
  "https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/recipes?populate=*"
);

const recipes = computed(() => data.value?.data || []);
</script>

<template>
  <Navdesk />
  <Navmobile />
  <Breadcrumbs :items="breadcrumbs" />

  <main>
    <section class="recipe-hero">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1>Madopskrifter</h1>
        <p>Lad dig inspirere af autentiske asiatiske opskrifter</p>
      </div>
    </section>

    <section class="recipes-page">
      <div class="filters">
        <div class="select-wrapper">
          <select class="filter-select">
            <option selected disabled>Sværhedsgrad</option>

            <option>Let</option>
            <option>Mellem</option>
            <option>Svært</option>
          </select>

          <Icon name="mdi:chevron-down" class="select-icon" />
        </div>

        <div class="select-wrapper">
          <select class="filter-select">
            <option selected disabled>Tilberedningstid</option>

            <option>Under 30 min</option>
            <option>30-60 min</option>
            <option>Over 60 min</option>
          </select>

          <Icon name="mdi:chevron-down" class="select-icon" />
        </div>

        <div class="select-wrapper">
          <select class="filter-select">
            <option selected disabled>Land</option>

            <option>Thailand</option>
            <option>Vietnam</option>
            <option>Korea</option>
            <option>Kina</option>
          </select>

          <Icon name="mdi:chevron-down" class="select-icon" />
        </div>
      </div>
      <div class="recipe-grid">
        <Recipe
          v-for="recipe in recipes"
          :key="recipe.id"
          :title="recipe.Title"
          :slug="recipe.Slug"
          :description="recipe.Description"
          :image="recipe.Image[0]?.url"
          :time="`${recipe.Tid.Tid} ${recipe.Tid.Unit}`"
          :persons="recipe.AntalPersoner"
          :difficulty="recipe.Difficulty"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.recipe-hero {
  position: relative;
  height: 25rem;
  padding: 4rem;
  background-image: url("https://diplomatic-friend-1bce2a96ef.media.strapiapp.com/madopskrifter_6b210d939c.png");
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
  margin-block: var(--space-lg);
}

.select-wrapper {
  position: relative;
}

.filter-select {
  appearance: none;
  min-width: 12rem;
  padding: 1rem 3rem 1rem 1.5rem;
  border: 1px solid black;
  border-radius: 999px;
  background: white;
  font-size: var(--font-body);
  cursor: pointer;
}

.select-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-xl);
}

@media (max-width: 768px) {
  .recipe-hero {
    height: 16rem;
    padding: var(--space-xl);
    margin-bottom: 0;
  }

  .hero-content {
    max-width: 18rem;
  }

  .filters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-sm);
  }

  .select-wrapper {
    width: 100%;
  }

  .filter-select {
    width: 100%;
    min-width: unset;
  }

  .recipe-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
}
</style>
