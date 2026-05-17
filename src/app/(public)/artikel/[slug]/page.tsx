import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft, ArrowRight, Calendar, ChevronRight, Share2, Link as LinkIcon, Check } from 'lucide-react'
import { ShareButtons } from './ShareButtons'

export const revalidate = 60

export default async function ArtikelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const supabase = await createClient()
  const { slug } = await params

  // Fetch article
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!article || !article.is_published) {
    notFound()
  }

  // Fetch related articles (excluding current)
  const { data: relatedArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .neq('id', article.id)
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-brand-primary transition-colors">Beranda</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/artikel" className="hover:text-brand-primary transition-colors">Artikel</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 truncate max-w-[200px] md:max-w-md">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-brand-gold font-medium mb-4">
            <Calendar className="w-4 h-4" />
            {new Date(article.published_at || article.created_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-brand-primary mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Cover Image */}
        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-12 shadow-md">
          <Image
            src={article.cover_image_url || "https://images.unsplash.com/photo-1587556610433-5d20cef85b19?auto=format&fit=crop&q=80"}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content & Share */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Share Sidebar (Desktop) */}
          <div className="hidden lg:block w-16 shrink-0">
            <div className="sticky top-32 flex flex-col gap-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>Bagikan</span>
              <div className="w-[1px] h-12 bg-gray-200 mx-auto"></div>
              <ShareButtons url={`https://bakulambulance.com/artikel/${article.slug}`} title={article.title} />
            </div>
          </div>

          <div className="flex-1">
            {/* Main Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-brand-primary prose-a:text-brand-accent hover:prose-a:text-brand-primary"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />

            {/* Share Bottom (Mobile/Tablet) */}
            <div className="mt-12 pt-8 border-t border-gray-100 lg:hidden flex items-center gap-4">
              <span className="font-semibold text-gray-900">Bagikan Artikel:</span>
              <ShareButtons url={`https://bakulambulance.com/artikel/${article.slug}`} title={article.title} horizontal />
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16 mt-12 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-brand-primary">Artikel Terkait</h3>
              <Link href="/artikel" className="text-sm font-semibold text-brand-accent hover:text-brand-primary transition-colors flex items-center gap-1">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/artikel/${related.slug}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={related.cover_image_url || "https://images.unsplash.com/photo-1587556610433-5d20cef85b19?auto=format&fit=crop&q=80"}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors line-clamp-2">{related.title}</h4>
                    <div className="text-xs text-gray-500">
                      {new Date(related.published_at || related.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
