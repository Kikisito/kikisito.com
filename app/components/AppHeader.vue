<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

<template>
  <UNavigationMenu
    :items="links"
    variant="link"
    color="neutral"
    class="bg-muted/80 backdrop-blur-sm rounded-lg px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
  >
    <template #list-trailing>
      <ColorModeButton />
    </template>
  </UNavigationMenu>
</template>