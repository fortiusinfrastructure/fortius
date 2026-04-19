import { ArrowRight, Calendar, MapPin, Clock, FileText, Video, Mic } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';

const getBadgeTheme = (badge?: string) => {
  if (!badge) return { bg: 'bg-slate-100', text: 'text-[#0A2540]', border: 'border-slate-200' };
  const tone = badge.toLowerCase();
  if (tone.includes('informe') || tone.includes('report')) return { bg: 'bg-[#E9F2FF]', text: 'text-[#0A3D62]', border: 'border-[#B6D7FF]' };
  if (tone.includes('análisis') || tone.includes('analisis') || tone.includes('analysis')) return { bg: 'bg-[#FFF4E5]', text: 'text-[#A55400]', border: 'border-[#FFD9A6]' };
  if (tone.includes('actualidad') || tone.includes('news')) return { bg: 'bg-[#F6E8FF]', text: 'text-[#6B21A8]', border: 'border-[#E4C7FF]' };
  if (tone.includes('opinión') || tone.includes('opinion')) return { bg: 'bg-[#EAF7F1]', text: 'text-[#1B6B43]', border: 'border-[#B9E4CD]' };
  if (tone.includes('entrevista') || tone.includes('interview')) return { bg: 'bg-[#FFECEE]', text: 'text-[#B42318]', border: 'border-[#FFC2C7]' };
  if (tone.includes('evento') || tone.includes('conferencia') || tone.includes('webinar') || tone.includes('event')) return { bg: 'bg-[#E5F7FF]', text: 'text-[#0A527B]', border: 'border-[#B3E5FF]' };
  return { bg: 'bg-slate-100', text: 'text-[#0A2540]', border: 'border-slate-200' };
};

export type CardVariant = 'featured' | 'standard' | 'compact';

export interface CardProps {
  variant?: CardVariant;
  image?: string;
  badge?: string;
  title: string;
  summary?: string;
  metadata?: {
    date?: string;
    author?: string;
    readTime?: string;
    location?: string;
    format?: string;
  };
  ctaText?: string;
  ctaLink?: string;
  className?: string;
  locale: 'es' | 'en';
}

export function Card({
  variant = 'standard',
  image,
  badge,
  title,
  summary,
  metadata,
  ctaText,
  ctaLink,
  className,
  locale,
}: CardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  const badgeTheme = getBadgeTheme(badge);
  const isEn = locale === 'en';

  const getIcon = () => {
    if (!badge) return null;
    const lower = badge.toLowerCase();
    if (lower.includes('video')) return <Video className="w-3 h-3 mr-1" />;
    if (lower.includes('podcast')) return <Mic className="w-3 h-3 mr-1" />;
    if (lower.includes('informe') || lower.includes('report')) return <FileText className="w-3 h-3 mr-1" />;
    return null;
  };

  if (isCompact) {
    const body = (
      <>
        {metadata?.date && (
          <div className="flex-shrink-0 w-16 text-center pt-1">
            <span className="block text-2xl font-bold text-[#0A2540] leading-none">{metadata.date.split(' ')[0]}</span>
            <span className="block text-xs uppercase text-slate-500 font-medium">{metadata.date.split(' ')[1]}</span>
          </div>
        )}
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            {badge && (
              <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border', badgeTheme.bg, badgeTheme.text, badgeTheme.border)}>
                {badge}
              </span>
            )}
            {metadata?.format && (
              <span className="text-[10px] text-slate-500 flex items-center">
                <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                {metadata.format}
              </span>
            )}
          </div>
          <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-[#006994] transition-colors leading-tight mb-1">
            {title}
          </h3>
          {metadata?.location && (
            <div className="flex items-center text-xs text-slate-500 mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {metadata.location}
            </div>
          )}
        </div>
      </>
    );
    const classes = cn('group flex gap-4 p-4 border-b hairline hover:bg-slate-50 transition-colors cursor-pointer', className);
    return ctaLink ? <Link href={ctaLink} className={classes}>{body}</Link> : <div className={classes}>{body}</div>;
  }

  const body = (
    <>
      {image && (
        <div className={cn('relative overflow-hidden w-full bg-slate-100', isFeatured ? 'md:col-span-7 aspect-video' : 'aspect-video')}>
          <img src={image} alt={title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
          {badge && !isFeatured && (
            <div className="absolute top-4 left-4">
              <span className={cn('inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm border rounded-full', badgeTheme.bg, badgeTheme.text, badgeTheme.border)}>
                {getIcon()}
                {badge}
              </span>
            </div>
          )}
        </div>
      )}
      <div className={cn('flex flex-col justify-between p-6', isFeatured ? 'md:col-span-5 bg-gradient-to-br from-white to-[#F2F6FB]' : 'flex-grow')}>
        <div>
          {!isFeatured && <div className="h-1 w-12 bg-[#006994] mb-4 rounded-full" />}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
            {badge && isFeatured && (
              <span className={cn('inline-flex items-center px-2 py-1 rounded-full border font-bold text-[11px]', badgeTheme.bg, badgeTheme.text, badgeTheme.border)}>
                {badge}
              </span>
            )}
            {metadata?.date && (
              <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{metadata.date}</span>
            )}
            {metadata?.readTime && (
              <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{metadata.readTime}</span>
            )}
            {metadata?.author && (
              <span className="text-slate-700 normal-case">{isEn ? `by ${metadata.author}` : `por ${metadata.author}`}</span>
            )}
          </div>
          <h3 className={cn('font-serif font-bold text-slate-900 group-hover:text-[#006994] transition-colors mb-3', isFeatured ? 'text-2xl md:text-3xl leading-tight' : 'text-xl leading-snug')}>
            {title}
          </h3>
          {summary && <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">{summary}</p>}
        </div>
        <div className="mt-auto pt-4 flex items-center text-[#0A2540] font-bold text-sm group-hover:translate-x-1 transition-transform">
          {ctaText || (isEn ? 'Read more' : 'Leer más')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </>
  );
  const classes = cn('group block bg-white overflow-hidden border hairline hover:-translate-y-1 transition-all duration-300', isFeatured ? 'grid md:grid-cols-12 gap-0' : 'flex flex-col h-full', className);
  return ctaLink ? <Link href={ctaLink} className={classes}>{body}</Link> : <div className={classes}>{body}</div>;
}
