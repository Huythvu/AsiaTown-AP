<script setup>
const { data, error } = await useFetch(
  'http://localhost:1337/api/produkts?populate=*' 
)

console.log(data.value)
</script>

<template>
  <div>
    <h1>Produkter</h1>

    <div v-if="error">
      Error: {{ error }}
    </div>

    <div v-for="item in data?.data" :key="item.id">

      <!-- TEXT -->
      <h2>{{ item.Title }}</h2>
      <p>{{ item.Description }}</p>
      <p>{{ item.Image.formats.url }}</p>
      <img :src="item.Image.formats.url" alt="" width="200" />
    </div>
  </div>
</template>