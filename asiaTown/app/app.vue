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
  padding: 16px 64px 0;
  width: 100%;
  max-width: 1920px;
  align-self: center;
  flex: 1;
}
</style>
