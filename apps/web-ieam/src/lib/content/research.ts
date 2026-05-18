import { marked } from 'marked';
import { allResearch } from 'content-collections';
import { articles as mockArticles, type Article } from '@/lib/mock-data/articles';
import { parseEventDate } from '@/lib/utils/content';

function renderMarkdown(markdown: string | undefined): string | undefined {
  if (!markdown?.trim()) return undefined;
  return marked.parse(markdown, { breaks: true, gfm: true }) as string;
}

function normalizeCollectionArticle(doc: (typeof allResearch)[number]): Article {
  return {
    slug: doc.slug,
    type: doc.type as Article['type'],
    type_en: doc.type_en,
    contentKind: doc.contentKind,
    category: doc.category,
    category_en: doc.category_en,
    title: doc.title,
    title_en: doc.title_en,
    subtitle: doc.subtitle,
    subtitle_en: doc.subtitle_en,
    heroImage: doc.heroImage,
    heroImage_en: doc.heroImage_en,
    mainImage: doc.mainImage,
    mainImage_en: doc.mainImage_en,
    mainImageCaption: doc.mainImageCaption,
    mainImageCaption_en: doc.mainImageCaption_en,
    publishDate: doc.publishDate,
    readTime: doc.readTime,
    author: {
      name: doc.authorName,
      name_en: doc.authorName_en,
      role: doc.authorRole,
      role_en: doc.authorRole_en,
      image: doc.authorImage,
      bio: doc.authorBio ?? 'Perfil editorial en pruebas con content-collections.',
      bio_en: doc.authorBio_en ?? 'Editorial profile under content-collections pilot.',
    },
    content: renderMarkdown(doc.content) ?? '',
    content_en: renderMarkdown(doc.content_en),
    pullQuote: doc.pullQuote,
    pullQuote_en: doc.pullQuote_en,
    materials: doc.materials,
    relatedArticles: [],
  };
}

const collectionArticles = allResearch.map(normalizeCollectionArticle);

function mergeArticles(): Article[] {
  const merged = new Map<string, Article>();

  for (const article of mockArticles) merged.set(article.slug, article);
  for (const article of collectionArticles) merged.set(article.slug, article);

  return [...merged.values()].sort(
    (a, b) => parseEventDate(b.publishDate).getTime() - parseEventDate(a.publishDate).getTime(),
  );
}

export const researchArticles = mergeArticles();

export function getResearchArticleBySlug(slug: string): Article | undefined {
  return researchArticles.find((article) => article.slug === slug);
}
