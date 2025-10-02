<script setup lang="ts">
import type { ProjectInfo } from '../types/project'

useSeoMeta({
    title: 'Proyectos',
    description: 'Proyectos destacados'
})

const { data: projects } = await useAsyncData<ProjectInfo[]>('projects', () => {
    return queryCollection('projects').all()
})

// Filtro
const search = ref('')

const filtered = computed(() => {
        return projects.value!.filter((p: ProjectInfo) => {
        const matchesSearch = !search.value || [p.name, p.tagline, p.description, ...p.stack].some(t => t.toLowerCase().includes(search.value.toLowerCase()))
        return matchesSearch
    })
})

const total = computed(() => filtered.value.length)

// Ordenar por año desc
const ordered = computed(() => filtered.value.slice().sort((a: ProjectInfo, b: ProjectInfo) => {
    // Archivados al final
    const archivedDiff = Number(!!a.archived) - Number(!!b.archived)
    if (archivedDiff !== 0) {
        return archivedDiff
    }

    // Año descendente
    const yearDiff = b.year - a.year
    if (yearDiff !== 0) {
        return yearDiff
    }

    // Activos primero dentro del mismo año
    const activeDiff = Number(!!b.active) - Number(!!a.active)
    if (activeDiff !== 0) {
        return activeDiff
    }

    return 0
}))
</script>

<template>
    <UContainer class="pt-6">
        <!-- Header -->
        <header class="mb-10 flex flex-col gap-6">
            <div class="flex flex-col gap-3">
                <h1 class="text-4xl font-bold">Proyectos</h1>
                <p class="text-neutral-600 dark:text-neutral-300 max-w-2xl md:text-lg">
                    Selección de proyectos profesionales, experimentos técnicos y herramientas internas. Centrado en rendimiento, calidad y buenas prácticas de ingeniería.
                </p>
            </div>

            <!-- Barra de búsqueda y número de resultados -->
            <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div class="flex flex-col sm:flex-row gap-3 md:items-end">
                    <UInput
                        v-model="search"
                        placeholder="Buscar (nombre, tecnología...)"
                        icon="i-lucide-search"
                        color="neutral"
                        class="w-full sm:w-72"
                        :debounce="250"
                        size="md"
                    />
                </div>
                <div class="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <span class="font-medium">{{ total }}</span>
                    <span>resultado{{ total === 1 ? '' : 's' }}</span>
                </div>
            </div>
        </header>

        <!-- Tarjetas -->
        <TransitionGroup name="project-grid" tag="div" class="grid gap-5 sm:gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            <ProjectCard
                v-for="p in ordered"
                :key="p.name"
                :project="p"
            />
        </TransitionGroup>

        <!-- Empty state -->
        <div v-if="!ordered.length" class="mt-16 flex flex-col items-center gap-4 text-center">
            <Icon name="lucide:folder-search" size="48" class="text-neutral-400" />
            <p class="text-neutral-600 dark:text-neutral-400">No se encontraron proyectos con los filtros actuales.</p>
            <UButton size="sm" variant="soft" color="neutral" @click="() => { search = '' }">Restablecer filtros</UButton>
        </div>
    </UContainer>
</template>

<style scoped>
.project-grid-enter-active, .project-grid-leave-active { transition: all .35s cubic-bezier(.4,0,.2,1); }
.project-grid-enter-from { opacity: 0; transform: translateY(12px) scale(.98); }
.project-grid-leave-to { opacity: 0; transform: translateY(-8px) scale(.98); }
</style>