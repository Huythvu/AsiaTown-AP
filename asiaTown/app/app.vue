<script setup></script>

<template>
  <div class="page">
    <Navbar />

    <main class="page-main">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<style>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-main {
  flex: 1;
}
</style>

