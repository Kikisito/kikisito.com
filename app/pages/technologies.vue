<script setup lang="ts">
const technologies = await queryCollection('content').path('/technologies').first()

useSeoMeta({
  title: technologies!.title,
  description: technologies!.description
})
</script>

<template>
    <UContainer class="pt-6">
        <ContentRenderer v-if="technologies" :value="technologies" />
        <div v-else>Error al cargar la página</div>
    </UContainer>
</template>