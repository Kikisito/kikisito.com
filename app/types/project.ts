export interface LinkInfo {
  label: string
  to: string
  icon?: string
  target?: string
  ariaLabel?: string
}

export interface ProjectInfo {
  name: string
  tagline: string
  description: string
  year: number
  category: string
  stack: string[]
  highlights?: string[]
  links?: LinkInfo[]
  archived?: boolean
  active?: boolean // Para proyectos en curso
}
