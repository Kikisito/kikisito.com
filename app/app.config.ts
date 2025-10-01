export default defineAppConfig({
  global: {
    picture: {
      url: 'https://avatars.githubusercontent.com/u/35898087',
      alt: 'Foto de Kikisito en GitHub'
    },
    workLink: 'mailto:kikisito@kikisito.com',
    email: 'mailto:kikisito@kikisito.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    }
  },
  index: {
    name: 'Kikisito',
    title: 'Ingeniero software',
    bio: 'Ingeniero informático full‑stack: diseño arquitecturas, optimizo bases de datos y cuido la experiencia final del usuario con la última tecnología disponible',
    socials: [
      {
        'icon': 'i-simple-icons-linkedin',
        'to': 'https://www.linkedin.com/in/kyllian-boucir/',
        'target': '_blank',
        'aria-label': 'Perfil de LinkedIn'
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/Kikisito',
        'target': '_blank',
        'aria-label': 'Perfil de GitHub'
      }
    ]
  },
  footer: {
    credits: `Hecho por Kikisito • ${new Date().getFullYear()}`,
    links: [
      {
        'icon': 'i-simple-icons-linkedin',
        'to': 'https://www.linkedin.com/in/kyllian-boucir/',
        'target': '_blank',
        'aria-label': 'Perfil de LinkedIn'
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/Kikisito',
        'target': '_blank',
        'aria-label': 'Perfil de GitHub'
      }
    ]
  }
})