<script setup lang="ts">
const experience = await queryCollection('content').path('/experience').first()

useSeoMeta({
  title: experience!.title,
  description: experience!.description
})
</script>

<template>
    <UContainer class="pt-6">
        <ContentRenderer v-if="experience" :value="experience" />
        <div v-else>Error al cargar la página</div>
    </UContainer>
</template>