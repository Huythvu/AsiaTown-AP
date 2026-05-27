<script setup>
import { ref, computed } from "vue";

const persons = ref(4);

const basePersons = 4;

const ingredients = [
  {
    name: "Risnudler 5mm",
    amount: 400,
    unit: "g",
  },
  {
    name: "Forårsløg",
    amount: 4,
    unit: "stk",
  },
  {
    name: "Kanelstang",
    amount: 1,
    unit: "stk",
  },
  {
    name: "Fiskesauce",
    amount: 68,
    unit: "ml",
  },
  {
    name: "Frisk koriander",
    amount: 4,
    unit: "bund",
  },
];

const calculatedIngredients = computed(() => {
  return ingredients.map((ingredient) => ({
    ...ingredient,
    calculatedAmount: (ingredient.amount / basePersons) * persons.value,
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
const route = useRoute();

console.log(route.params.slug);
</script>

<template>
  <section class="recipe-hero">
    <div class="recipe-info">
      <span class="tag"> Vietnamesisk </span>

      <h1>
        Pho Bo - <br />
        Vietnamesisk <br />
        oksesuppe
      </h1>

      <p>
        Klassisk hanoi-stil pho med klar bouillon, blødt oksekød og friske
        krydderurter.
      </p>

      <div class="recipe-meta">
        <div>
          <span>Tid</span>
          <p>3 Timer</p>
        </div>

        <div>
          <span>Sværhedsgrad</span>
          <p>Mellem</p>
        </div>

        <div>
          <span>Personer</span>
          <p>{{ persons }}</p>
        </div>
      </div>
    </div>

    <div class="recipe-image">
      <img
        src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1200&auto=format&fit=crop"
        alt="Pho Bo"
      />
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
          :key="ingredient.name"
          class="ingredient"
        >
          <p>{{ ingredient.name }}</p>
          <span>
            {{ ingredient.calculatedAmount }}
            {{ ingredient.unit }}
          </span>
        </div>
      </div>
    </div>

    <div class="steps">
      <p class="label">FREMGANGSMETODE</p>

      <h2>4 TRIN</h2>

      <div class="step">
        <div class="step-title">
          <h2>01</h2>

          <h3>Forbered bouillon</h3>
        </div>

        <p>
          Brun løg og ingefær på en tør pande til de er let sorte. Tilsæt til
          kogende vand med oksebryst krydderier og lidt salt.
        </p>
      </div>

      <div class="step">
        <div class="step-title">
          <h2>02</h2>

          <h3>Forbered nudler</h3>
        </div>

        <p>Læg risnudler i blød i koldt vand i 30 minutter.</p>
      </div>

      <div class="step">
        <div class="step-title">
          <h2>03</h2>

          <h3>Si og smag til</h3>
        </div>

        <p>Sigt bouillon. Smag til med fiskesauce, lidt sukker og salt.</p>
      </div>

      <div class="step">
        <div class="step-title">
          <h2>04</h2>

          <h3>Anret</h3>
        </div>

        <p>
          Læg nudler i bunden af skålen, top med oksekød og hæld bouillon over.
        </p>
      </div>
    </div>
  </section>

  <section class="related-products">
    <h2>Relaterede produkter</h2>

    <div class="product-grid">
      <ProductCard />
      <ProductCard />
    </div>
  </section>
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

.recipe-image img {
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
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

.step-title h2 {
  color: #d4a437;
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
</style>
