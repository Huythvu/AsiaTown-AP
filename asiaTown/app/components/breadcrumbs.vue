<script setup>
const route = useRoute();

const breadcrumbs = computed(() =>
  route.path
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => ({
      label: segment,
      to: "/" + array.slice(0, index + 1).join("/"),
    }))
);
</script>

<template>
  <nav class="breadcrumbs">
    <NuxtLink to="/"> <Icon name="mdi:home" />Forside</NuxtLink>

    <template v-for="crumb in breadcrumbs" :key="crumb.to">
      <span> / </span>
      <NuxtLink :to="crumb.to">
        {{ crumb.label }}
      </NuxtLink>
    </template>
  </nav>
</template>

<style scoped>  
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--breadcrumb-gap);
  padding: 0rem var(--space-3xl);
  font-size: var(--breadcrumb-font-size);
  font-weight: var(--weight-breadcrumb);
  color: #666;

}

.breadcrumbs a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.iconify {
  font-size: 16.8px;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}


</style>