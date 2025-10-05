<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

useSeoMeta({
    title: 'Contacto',
    description: 'Contáctame a través de redes sociales o correo electrónico'
})

const appConfig = useAppConfig()

const emailAddress = computed(() => appConfig.global.email.replace(/^mailto:/, ''))
const mailtoBase = computed(() => `mailto:${emailAddress.value}`)
const socials = computed(() => appConfig.index.socials)

const schema = z.object({
    name: z.string().min(2, 'Necesito saber tu nombre'),
    email: z.string().email('Introduce un email válido para responderte'),
    company: z.string().max(80, 'El nombre es demasiado largo').optional(),
    message: z.string().min(20, 'Cuéntame un poco más sobre lo que necesitas (mín. 20 caracteres)'),
    consent: z.boolean().refine(value => value, 'Necesito tu consentimiento para contactarte de vuelta')
})

type ContactForm = z.infer<typeof schema>

const initialState: ContactForm = {
    name: '',
    email: '',
    company: '',
    message: '',
    consent: false
}

const state = reactive<ContactForm>({ ...initialState })
const loading = ref(false)

const toast = useToast()

const resetForm = () => {
    Object.assign(state, initialState)
}

const handleSubmit = async (event: FormSubmitEvent<ContactForm>) => {
    loading.value = true

    try {
        if (import.meta.client) {
            const { data } = event
            const bodyLines = [
                'Hola,',
                '',
                data.message,
                '',
                `— ${data.name}${data.company ? ` (${data.company})` : ''}`,
                `Correo de respuesta: ${data.email}`,
            ]

            const subject = encodeURIComponent(`Mensaje de ${data.name} a través de kikisito.com`)
            const body = encodeURIComponent(bodyLines.join('\n'))

            window.open(`${mailtoBase.value}?subject=${subject}&body=${body}`, '_blank')
        }

        toast.add({
            title: 'Mensaje preparado',
            description: 'Se abrió tu cliente de correo con el mensaje pre-rellenado.',
            color: 'primary'
        })
        resetForm()
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'No pude preparar el email',
            description: `Puedes escribirme manualmente a ${emailAddress.value}.`,
            color: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <UContainer class="pt-6">
        <section class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div class="space-y-6">
                <header class="space-y-4">
                    <h1 class="text-4xl font-bold">Contacto</h1>
                    <p class="text-neutral-600 dark:text-neutral-300 max-w-2xl md:text-lg">
                        ¿Quieres contarme algo? ¿Tienes un proyecto en mente? ¿Quieres colaborar o charlar sobre tecnología?
                        Puedes escribirme a través de correo electrónico o redes sociales, o bien completar el formulario de esta página.
                    </p>
                </header>

                <div class="grid gap-4 sm:grid-cols-2">
                    <UCard class="h-full">
                        <div class="flex flex-col gap-3">
                            <div class="flex items-center gap-3">
                                <Icon name="lucide:mail" size="22" class="text-primary-500" />
                                <h2 class="text-lg font-semibold">Correo electrónico</h2>
                            </div>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400">
                                Prefiero empezar la conversación por email, aunque si lo prefieres puedes completar el formulario de esta página y te responderé igual de rápido: suelo contestar en menos de 24 horas.
                            </p>
                            <UButton
                                :href="mailtoBase"
                                color="primary"
                                variant="soft"
                                class="w-fit"
                                icon="i-lucide-send"
                            >
                                Escribir email
                            </UButton>
                            <span class="text-sm text-neutral-500 dark:text-neutral-500">
                                {{ emailAddress }}
                            </span>
                        </div>
                    </UCard>

                    <UCard class="h-full">
                        <div class="flex flex-col gap-3">
                            <div class="flex items-center gap-3">
                                <Icon name="lucide:message-circle" size="22" class="text-primary-500" />
                                <h2 class="text-lg font-semibold">Canales alternativos</h2>
                            </div>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400">
                                Si prefieres conectar por redes sociales, también estoy activo en estas plataformas.
                            </p>
                            <div class="flex flex-wrap gap-2">
                                <UButton
                                    v-for="link in socials"
                                    :key="link.to"
                                    :to="link.to"
                                    :aria-label="link['aria-label']"
                                    :icon="link.icon"
                                    target="_blank"
                                    rel="noreferrer"
                                    size="sm"
                                    variant="ghost"
                                    color="neutral"
                                >
                                    {{ link.name }}
                                </UButton>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>

            <aside class="lg:sticky lg:top-24">
                <UCard class="border border-neutral-200/70 dark:border-neutral-800/70 bg-white/80 dark:bg-neutral-900/70">
                    <div class="space-y-4">
                        <div>
                            <h2 class="text-2xl font-semibold">Avancemos con una propuesta</h2>
                            <p class="text-neutral-600 dark:text-neutral-400 text-sm pt-1">
                                Completa este formulario y prepararé un borrador de email para que lo envíes con un clic usando tu cliente de correo. Podrás editarlo antes de enviarlo.
                            </p>
                        </div>

                        <UForm
                            :state="state"
                            :schema="schema"
                            class="space-y-6"
                            @submit="handleSubmit"
                        >
                            <div class="grid gap-4 sm:grid-cols-2">
                                <UFormField label="Nombre" name="name" required>
                                    <UInput
                                        v-model="state.name"
                                        placeholder="Tu nombre"
                                        size="lg"
                                        class="shadow-sm w-full"
                                    />
                                </UFormField>

                                <UFormField label="Email" name="email" required>
                                    <UInput
                                        v-model="state.email"
                                        type="email"
                                        placeholder="nombre@empresa.com"
                                        size="lg"
                                        class="shadow-sm w-full"
                                    />
                                </UFormField>

                                <div class="sm:col-span-2">
                                    <UFormField label="Empresa (opcional)" name="company">
                                        <UInput
                                            v-model="state.company"
                                            placeholder="Empresa o proyecto"
                                            size="lg"
                                            class="shadow-sm w-full"
                                        />
                                    </UFormField>
                                </div>

                                <div class="sm:col-span-2">
                                    <UFormField label="Mensaje" name="message" required>
                                        <UTextarea
                                            v-model="state.message"
                                            placeholder="Cuéntame contexto, expectativas, proyectos..."
                                            :rows="4"
                                            class="shadow-sm w-full"
                                        />
                                    </UFormField>
                                </div>
                            </div>

                            <div class="rounded-lg w-full bg-neutral-100/80 dark:bg-neutral-800/50 p-4">
                                <UFormField name="consent">
                                    <UCheckbox
                                        v-model="state.consent"
                                        label="Acepto que me contactes en base a esta solicitud"
                                        :disabled="loading"
                                    />
                                    <p class="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 pt-1">
                                        Tus datos solo se usarán para responder a este mensaje. No recibirás newsletters ni comunicaciones no solicitadas.
                                    </p>
                                </UFormField>
                            </div>

                            <UButton
                                type="submit"
                                color="primary"
                                :loading="loading"
                                icon="i-lucide-send"
                                size="lg"
                                class="w-full sm:w-auto sm:self-end"
                            >
                                Enviar
                            </UButton>
                        </UForm>
                    </div>
                </UCard>
            </aside>
        </section>
    </UContainer>
</template>