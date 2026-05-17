import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'

export const revalidate = 60

export default async function ArtikelIndexPage() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-primary py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-brand-gold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Informasi & <span className="text-brand-gold">Tips Kesehatan</span></h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Kumpulan artikel, berita terbaru, dan panduan lengkap seputar dunia karoseri ambulance dan fasilitas kesehatan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles && articles.length > 0 ? articles.map((article) => (
            <Link key={article.id} href={`/artikel/${article.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <Image
                  src={article.cover_image_url || "https://images.unsplash.com/photo-1587556610433-5d20cef85b19?auto=format&fit=crop&q=80"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(article.published_at || article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <h2 className="text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-accent transition-colors line-clamp-2">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">{article.excerpt}</p>
                <div className="text-brand-accent font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          )) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">Belum ada artikel yang dipublikasikan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
