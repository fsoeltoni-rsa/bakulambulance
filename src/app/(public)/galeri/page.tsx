import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 60 // Revalidate every minute

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient()
  const { category } = await searchParams

  // Fetch all gallery items
  let query = supabase.from('gallery').select('*').order('created_at', { ascending: false })
  
  if (category && category !== 'all' && typeof category === 'string') {
    query = query.eq('category', category)
  }

  const { data: gallery } = await query

  // Extract unique categories for filter
  const { data: allGallery } = await supabase.from('gallery').select('category')
  const categories = Array.from(new Set(allGallery?.map(item => item.category).filter(Boolean) as string[]))

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-primary py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-brand-gold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Galeri <span className="text-brand-gold">Karya Kami</span></h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Dokumentasi lengkap hasil pengerjaan karoseri ambulance dari Bakul Ambulance untuk berbagai fasilitas kesehatan di Indonesia.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link 
            href="/galeri"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${!category || category === 'all' ? 'bg-brand-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            Semua Foto
          </Link>
          {categories.map((cat) => (
            <Link 
              key={cat}
              href={`/galeri?category=${encodeURIComponent(cat)}`}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-brand-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery && gallery.length > 0 ? gallery.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100">
              <Image
                src={item.image_url || "https://images.unsplash.com/photo-1587556610433-5d20cef85b19?auto=format&fit=crop&q=80"}
                alt={item.caption || "Galeri Ambulance"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-medium text-sm md:text-base leading-snug">{item.caption}</p>
                  {item.category && <span className="inline-block mt-2 text-xs font-semibold bg-brand-gold text-brand-primary px-3 py-1 rounded-full">{item.category}</span>}
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">Tidak ada foto dalam kategori ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
