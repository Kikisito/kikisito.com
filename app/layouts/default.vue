<script setup lang="ts">
</script>

<template>
  <UContainer class="min-h-screen flex flex-col pt-6">
    <AppHeader :links="navLinks" />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </UContainer>
</template>