<script setup lang="ts">
const about = await queryCollection('content').path('/about').first()

useSeoMeta({
  title: about!.title,
  description: about!.description
})
</script>

<template>
    <UContainer class="pt-6">
        <ContentRenderer v-if="about" :value="about" />
        <div v-else>Error al cargar la página</div>
    </UContainer>
</template>