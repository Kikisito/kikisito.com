<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="relative">
    <!-- Menú móvil -->
    <div class="flex items-center justify-between gap-2 sm:hidden">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        :icon="isMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
        :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        aria-controls="mobile-navigation"
        :aria-expanded="isMenuOpen"
        class="border border-transparent hover:border-muted/50 rounded-lg"
        @click="toggleMenu"
      />

      <ColorModeButton />
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        id="mobile-navigation"
        class="sm:hidden absolute left-0 right-0 mt-3 z-50 px-2"
      >
        <div class="bg-muted/90 backdrop-blur-sm rounded-lg border border-muted/50 shadow-xl shadow-neutral-950/10 p-2 space-y-1">
          <UButton
            v-for="(item, index) in links"
            :key="index"
            :to="item.to"
            :icon="item.icon"
            :target="item.target"
            color="neutral"
            variant="ghost"
            class="w-full justify-start"
            @click="closeMenu"
          >
            {{ item.label }}
          </UButton>
        </div>
      </div>
    </Transition>

    <!-- Menú de escritorio -->
    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
      class="hidden sm:flex bg-muted/80 backdrop-blur-sm rounded-lg px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
    >
      <template #list-trailing>
        <ColorModeButton />
      </template>
    </UNavigationMenu>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-0.25rem);
}
</style>