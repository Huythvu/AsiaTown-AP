<script setup>
const props = defineProps({
  title: String,
  slug: String,
  description: String,
  image: String,
  time: String,
  persons: String,
  difficulty: String,
});

const shortDescription = computed(() => {
  return props.description.length > 85
    ? props.description.slice(0, 85) + "..."
    : props.description;
});
</script>
<template>
  <NuxtLink :to="`/recipes/${slug}`">
    <article class="recipe-card">
      <div class="image-wrapper">
        <img :src="image" :alt="title" />
        <span class="badge">
          {{ difficulty }}
        </span>
      </div>

      <div class="content">
        <h4>{{ title }}</h4>
        <p class="description">
          {{ shortDescription }}
        </p>
        <div class="meta">
          <div class="meta-item">
            <Icon name="material-symbols:alarm-outline-rounded" />
            <span>{{ time }}</span>
          </div>

          <div class="meta-item">
            <Icon name="line-md:account" />
            <span>{{ persons }} pers</span>
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped>
.recipe-card {
  width: 100%;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
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
  top: var(--space-md);
  right: var(--space-md);
  background: #e57373;
  color: black;
  padding: 6px 14px;
  border-radius: 999px;
}
.content h4 {
  line-height: 1.2;
  min-height: calc(1.2em * 2);
}
.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.meta {
  display: flex;
  gap: var(--space-lg);
  margin-top: var(--space-md);
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

  .meta {
    gap: 16px;
  }

  .badge {
    padding: 4px 10px;
  }

  .content {
    padding: 16px;
  }
}
</style>
