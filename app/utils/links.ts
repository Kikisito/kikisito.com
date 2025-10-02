import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [
  {
    label: 'Inicio',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Sobre mí',
    icon: 'i-lucide-user',
    to: '/about'
  },
  {
    label: 'Proyectos',
    icon: 'i-lucide-briefcase',
    to: '/projects'
  },
  {
    label: 'Experiencia',
    icon: 'i-lucide-archive',
    to: '/experience'
  },
  {
    label: 'Tecnologías',
    icon: 'i-lucide-code',
    to: '/technologies'
  },
  {
    label: 'Contacto',
    icon: 'i-lucide-mail',
    to: '/contact'
  }
]