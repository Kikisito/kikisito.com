<script setup lang="ts">
import type { ProjectInfo } from '~/types/project';

defineProps<{ project: ProjectInfo }>()
</script>

<template>
  <UCard class="group relative overflow-hidden border border-neutral-200/60 dark:border-neutral-800/80 hover:border-primary-400/60 dark:hover:border-primary-500/60 transition-colors duration-300 backdrop-blur supports-backdrop:backdrop-blur-md">
    <!-- Fondo decorativo -->
    <div class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div class="absolute -inset-24 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:to-primary/20 blur-2xl" />
    </div>

    <div class="flex flex-col gap-4 flex-1">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h3 class="text-lg font-semibold flex items-center gap-2">
            <span>{{ project.name }}</span>

            <!-- Si está archivado, se muestra como "Archivado" -->
            <UTooltip v-if="project.archived" text="Este proyecto está archivado y ya no se mantiene activamente.">
              <UBadge size="sm" color="warning" variant="subtle">
                Archivado
              </UBadge>
            </UTooltip>

            <!-- Si está activo, se muestra como "En curso" -->
            <UTooltip v-if="project.active" text="Este proyecto está en curso y se mantiene activamente.">
              <UBadge size="sm" color="success" variant="subtle">
                En curso
              </UBadge>
            </UTooltip>
          </h3>

            <!-- Descripción corta -->
          <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ project.tagline }}</p>
        </div>
        <div class="flex flex-col items-end gap-1">
          <UBadge color="neutral" variant="soft">{{ project.year }}</UBadge>
          <UBadge color="primary" variant="soft" size="xs" class="capitalize">{{ project.category }}</UBadge>
        </div>
      </div>

      <!-- Descripción -->
      <p class="text-sm text-neutral-700 dark:text-neutral-300">{{ project.description }}</p>

      <!-- Características -->
      <div v-if="project.highlights?.length" class="flex flex-wrap gap-1">
        <UTooltip v-for="h in project.highlights" :key="h" :text="h">
          <UBadge color="neutral" variant="outline" size="sm">{{ h }}</UBadge>
        </UTooltip>
      </div>

      <!-- Tecnologías -->
      <div class="flex flex-wrap gap-1">
        <UTooltip v-for="tech in project.stack" :key="tech" :text="tech">
          <UBadge color="neutral" variant="soft" size="sm">{{ tech }}</UBadge>
        </UTooltip>
      </div>
    </div>

    <!-- Links -->
    <div v-if="project.links?.length" class="mt-4 flex gap-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/80">
      <UButton
        v-for="l in project.links"
        :key="l.to + l.label"
        :to="l.to"
        :aria-label="l.ariaLabel || l.label"
        :icon="l.icon || 'i-lucide-external-link'"
        color="neutral"
        size="xs"
        variant="ghost"
        target="_blank"
        class="hover:text-primary-600 dark:hover:text-primary-400"
      >
        {{ l.label }}
      </UButton>
    </div>
  </UCard>
</template>
