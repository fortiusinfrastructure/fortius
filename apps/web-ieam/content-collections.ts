import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const research = defineCollection({
  name: 'research',
  directory: 'src/content/research',
  include: '*.md',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    title_en: z.string().optional(),
    subtitle: z.string(),
    subtitle_en: z.string().optional(),
    type: z.string(),
    type_en: z.string().optional(),
    contentKind: z.enum([
      'analisis',
      'policy',
      'infografia',
      'reseña-evento',
      'entrevista',
      'nota-prensa',
    ]),
    category: z.string(),
    category_en: z.string().optional(),
    publishDate: z.string(),
    readTime: z.string(),
    heroImage: z.string(),
    heroImage_en: z.string().optional(),
    mainImage: z.string(),
    mainImage_en: z.string().optional(),
    mainImageCaption: z.string(),
    mainImageCaption_en: z.string().optional(),
    authorName: z.string(),
    authorName_en: z.string().optional(),
    authorRole: z.string(),
    authorRole_en: z.string().optional(),
    authorImage: z.string(),
    authorBio: z.string().optional(),
    authorBio_en: z.string().optional(),
    pullQuote: z.string().optional(),
    pullQuote_en: z.string().optional(),
    content_en: z.string().optional(),
    materials: z
      .array(
        z.object({
          label: z.string(),
          label_en: z.string().optional(),
          url: z.string(),
        }),
      )
      .optional(),
    content: z.string(),
  }),
});

export default defineConfig({
  content: [research],
});
