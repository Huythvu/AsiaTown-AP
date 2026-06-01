<script setup>
import { ref, computed } from "vue";

const route = useRoute();

const { data } = await useFetch(
  `https://diplomatic-friend-1bce2a96ef.strapiapp.com/api/recipes?filters[Slug][$eq]=${route.params.slug}&populate=*`
);

const recipe = computed(() => data.value?.data[0]);

const persons = ref(recipe.value?.AntalPersoner || 1);

const basePersons = recipe.value?.AntalPersoner || 1;

const calculatedIngredients = computed(() => {
  return recipe.value?.Ingrediens.map((ingredient) => ({
    ...ingredient,

    calculatedAmount: (ingredient.Amount / basePersons) * persons.value,
  }));
});

const increasePersons = () => {
  persons.value++;
};

const decreasePersons = () => {
  if (persons.value > 1) {
    persons.value--;
  }
};
const breadcrumbs = computed(() => [
  {
    label: "Forside",
    to: "/",
  },
  {
    label: "Madopskrifter",
    to: "/recipes",
  },
  {
    label: recipe.value?.Title,
  },
]);
</script>

<template>
  <Navdesk />
  <Navmobile />
  <Breadcrumbs :items="breadcrumbs" />
  <main>
    <section class="recipe-hero">
      <div class="recipe-info">
        <span class="tag">
          {{ recipe?.lands[0]?.Land }}
        </span>
        <h1>
          {{ recipe?.Title }}
        </h1>
        <p>
          {{ recipe?.Description }}
        </p>

        <div class="recipe-meta">
          <div class="meta-item">
            <Icon name="material-symbols:alarm-outline-rounded" />
            <span>
              {{ recipe?.Tid?.Tid }}
              {{ recipe?.Tid?.Unit }}
            </span>
          </div>

          <div class="meta-item">
            <Icon name="hugeicons:chef-hat" />
            <span>
              {{ recipe?.Difficulty }}
            </span>
          </div>

          <div class="meta-item">
            <Icon name="line-md:account" />
            <span>{{ persons }} pers</span>
          </div>
        </div>
      </div>

      <div class="recipe-image">
        <img :src="recipe?.Image[0]?.url" :alt="recipe?.Title" />
      </div>
    </section>

    <section class="recipe-content">
      <div class="ingredients">
        <p class="label">INGREDIENSER</p>
        <div class="persons">
          <h3>Antal personer</h3>
          <div class="counter">
            <button @click="decreasePersons">-</button>
            <span>{{ persons }}</span>
            <button @click="increasePersons">+</button>
          </div>
        </div>

        <div class="ingredient-list">
          <div
            v-for="ingredient in calculatedIngredients"
            :key="ingredient.id"
            class="ingredient"
          >
            <p>{{ ingredient.Ingredient }}</p>
            <span>
              {{ ingredient.calculatedAmount }}
              {{ ingredient.unit }}
            </span>
          </div>
        </div>
      </div>

      <div class="steps">
        <p class="label">FREMGANGSMETODE</p>
        <h2>
          {{ recipe?.Step.filter((step) => step.Instruktion).length }} TRIN
        </h2>
        <div
          v-for="step in recipe?.Step.filter((step) => step.Instruktion)"
          :key="step.id"
          class="step"
        >
          <div class="step-title">
            <h3>
              {{ step.Overskrift }}
            </h3>
          </div>
          <p>
            {{ step.Instruktion }}
          </p>
        </div>
      </div>
    </section>
    <section class="related-products">
      <h2>Relaterede produkter</h2>
      <div class="product-grid">
        <ProductCard v-for="product in recipe?.products" :key="product.id" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.recipe-hero {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-3xl);
  padding-block: var(--space-3xl);
}

.recipe-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tag {
  width: fit-content;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
}

.recipe-info h1 {
  margin-block: var(--space-xl);
}

.recipe-meta {
  display: flex;
  gap: var(--space-xl);
  margin-top: var(--space-xl);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.recipe-image img {
  height: 100%;
  max-height: 400px;
  border-radius: 1rem;
  object-fit: fill;
}

.recipe-image {
  width: 100%;
  max-width: 40rem;
}

.recipe-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  padding-block: var(--space-3xl);
  border-top: 1px solid #ccc;
}

.persons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: var(--space-xl);
}

.counter {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.counter button {
  width: 3rem;
  height: 3rem;
  border: 1px solid black;
  border-radius: 50%;
  background-color: white;
}

.ingredient {
  display: flex;
  justify-content: space-between;
  padding-block: var(--space-lg);
  border-bottom: 1px solid #ccc;
}

.steps > h2 {
  margin-block: var(--space-lg);
}

.step {
  padding-block: var(--space-xl);
  border-bottom: 1px solid #ccc;
}

.step-title {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.related-products {
  padding-block: var(--space-3xl);
}

.related-products h2 {
  margin-bottom: var(--space-2xl);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--space-xl);
}

@media (max-width: 768px) {
  main {
    padding-inline: var(--space-lg);
  }

  .recipe-hero {
    grid-template-columns: 1fr;

    gap: var(--space-xl);

    padding-block: var(--space-xl);
  }

  .recipe-info h1 {
    margin-block: var(--space-lg);
  }

  .recipe-meta {
    justify-content: space-between;

    gap: var(--space-md);
  }

  .recipe-image img {
    width: 100%;
    height: 20rem;
  }

  .recipe-content {
    grid-template-columns: 1fr;

    gap: var(--space-2xl);

    padding-block: var(--space-2xl);
  }

  .persons {
    gap: var(--space-lg);
  }

  .persons h3 {
    font-size: 2rem;
  }

  .counter button {
    width: 3rem;
    height: 3rem;
  }

  .step-title {
    align-items: flex-start;
  }

  .step-title h3 {
    line-height: 1.2;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
