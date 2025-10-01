<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: 'Inicio'
})

const available = computed(() => appConfig.global?.available)
const emailLink = computed(() => appConfig.global?.email || 'mailto:kikisito@kikisito.com')
const workLink = computed(() => appConfig.global?.workLink || 'mailto:kikisito@kikisito.com')

const social = computed(() => appConfig.index.socials)
</script>

<template>
  <section class="flex items-center justify-center px-6 pt-6 md:pt-16">
    <div class="flex flex-col items-center text-center max-w-2xl w-full">
      <!-- Foto de perfil -->
      <div class="group">
        <NuxtImg
          :src="appConfig.global.picture.url"
          :alt="appConfig.global.picture.alt"
          width="256"
          height="256"
          format="webp"
          class="w-64 h-64 md:w-64 md:h-64 rounded-full object-cover ring-4 ring-primary/30 shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:ring-primary/60"
        />
      </div>

      <!-- Nombre y especialidad -->
      <h1 class="mt-8 text-5xl font-bold">
        {{ appConfig.index.name }}
      </h1>
      
      <p class="mt-2 text-2xl font-medium text-primary-600 dark:text-primary-400">
        {{ appConfig.index.title }}
      </p>

      <!-- Biografía -->
      <p class="mt-6 text-base md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
        {{ appConfig.index.bio }}
      </p>

      <!-- Botones de acción -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:justify-center">
        <UButton color="primary" size="lg" :to="emailLink" aria-label="Contactar por correo" class="font-semibold">
          <Icon name="lucide:briefcase" /> Contáctame
        </UButton>

        <UButton
          v-if="available"
          color="success"
          size="lg"
          variant="soft"
          :to="workLink"
          aria-label="Disponible para trabajar"
          class="font-semibold">
          <span class="relative inline-flex mr-2">
            <span class="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          Disponible para trabajar
        </UButton>
      </div>

      <!-- Redes sociales -->
      <div class="mt-10 flex gap-5">
        <span class="self-center text-sm font-medium text-neutral-600 dark:text-neutral-300">
          Encuéntrame en
        </span>
        <UButton
          v-for="s in social"
          :key="s.to"
          :to="s.to"
          target="_blank"
          :aria-label="s['aria-label']"
          color="neutral"
          variant="ghost"
          size="lg"
          class="rounded-full"
          :icon="s.icon"
        >
        </UButton>
      </div>
    </div>
  </section>
</template>