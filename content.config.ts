import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod/v4'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.json',
      schema: z.object({
        name: z.string(),
        tagline: z.string(),
        description: z.string(),
        year: z.number().int().min(2000).max(new Date().getFullYear()),
        category: z.string(),
        stack: z.array(z.string()),
        highlights: z.array(z.string()).optional(),
        links: z.array(
          z.object({
            label: z.string(),
            to: z.string(),
            icon: z.string().optional(),
            target: z.string().optional(),
            ariaLabel: z.string().optional()
          })
        ).optional(),
        archived: z.boolean().optional(),
        active: z.boolean().optional()
      })
    })
  }
})
