<script setup>
defineProps({
  title: String,
  description: String,
  image: String,
  time: String,
  persons: String,
  difficulty: String,
});
</script>
<template>
  <NuxtLink to="/recipe/pho-bo" class="card-link">
    <article class="recipe-card">
      <div class="image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
          alt="Pho Bo suppe"
        />

        <span class="badge">Svært</span>
      </div>

      <div class="content">
        <h3>Pho Bo - Vietnamesisk okse suppe</h3>

        <p class="description">
          Den ultimative nudelret med krydret bouillon, friske urter og mørt
          oksekød.
        </p>

        <div class="meta">
          <div class="meta-item">
            <Icon name="material-symbols:alarm-outline-rounded" />
            <span>30 min</span>
          </div>

          <div class="meta-item">
            <Icon name="line-md:account" />
            <span>4 pers.</span>
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
<style scoped>
.recipe-card {
  width: 100%;
  max-width: 400px;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  background: #eee;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.image-wrapper {
  position: relative;
}

.image-wrapper img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #e57373;
  color: black;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 14px;
}

/* Content */
.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.meta {
  display: flex;
  gap: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* MOBILE (768px) */
@media (max-width: 768px) {
  .recipe-card {
    height: auto;
    border-radius: 16px;
  }

  .image-wrapper img {
    height: 200px;
  }

  h3 {
    font-size: 1.25rem;
  }

  .description {
    font-size: 0.9rem;
  }

  .meta {
    gap: 16px;
  }

  .badge {
    font-size: 12px;
    padding: 4px 10px;
  }

  .content {
    padding: 16px;
  }
}
</style>
