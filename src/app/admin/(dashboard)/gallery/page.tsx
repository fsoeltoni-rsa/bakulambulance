import { createClient } from '@/utils/supabase/server'
import { GalleryClient } from './GalleryClient'

export const revalidate = 0

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data: gallery } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Galeri Karya</h1>
        <p className="text-gray-500">Kelola foto-foto dokumentasi karoseri.</p>
      </div>
      <GalleryClient initialGallery={gallery || []} />
    </div>
  )
}
