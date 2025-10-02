<script setup lang="ts">
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useSeoMeta({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} - Kikisito's Portfolio` : 'Kikisito\'s Portfolio',
  description: 'Portfolio de Kikisito, ingeniero de software y desarrollador web',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: color,
  author: 'Kyllian Edouard Boucir'
})
</script>

<template>
  <UApp>
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>
