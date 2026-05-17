"use client"

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { uploadImage } from '@/utils/supabase/upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function GalleryClient({ initialGallery }: { initialGallery: any[] }) {
  const [gallery, setGallery] = useState(initialGallery)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Form State
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const supabase = createClient()
  const router = useRouter()

  const resetForm = () => {
    setCaption('')
    setCategory('')
    setImageFile(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus foto ini dari galeri?')) return
    
    await supabase.from('gallery').delete().eq('id', id)
    setGallery(gallery.filter(g => g.id !== id))
    router.refresh()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) {
      alert('Pilih gambar terlebih dahulu.')
      return
    }

    setLoading(true)

    try {
      const imageUrl = await uploadImage(imageFile)
      
      const payload = {
        caption,
        category,
        image_url: imageUrl,
      }

      await supabase.from('gallery').insert([payload])

      const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
      if (data) setGallery(data)
      
      setIsOpen(false)
      resetForm()
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan saat mengupload gambar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-brand-primary text-white">Upload Foto Baru</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Foto Galeri</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Gambar</Label>
                <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} required />
              </div>
              <div className="space-y-2">
                <Label>Caption (Deskripsi Singkat)</Label>
                <Input value={caption} onChange={e => setCaption(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Kategori (Opsional)</Label>
                <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="Contoh: Ambulance VIP" />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} className="bg-brand-primary">{loading ? 'Mengupload...' : 'Upload'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">Belum ada foto galeri.</div>
        ) : gallery.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
            <div className="relative aspect-square bg-gray-100">
              <Image src={item.image_url} alt={item.caption || 'Gallery Image'} fill className="object-cover" />
              <button 
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <p className="font-medium text-sm text-gray-800 line-clamp-1">{item.caption}</p>
              {item.category && <p className="text-xs text-brand-gold mt-1">{item.category}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
