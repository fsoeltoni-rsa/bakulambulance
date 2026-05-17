"use client"

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { uploadImage } from '@/utils/supabase/upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form State
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [features, setFeatures] = useState('') // comma separated
  const [priceLabel, setPriceLabel] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [currentImageUrl, setCurrentImageUrl] = useState('')

  const supabase = createClient()
  const router = useRouter()

  const resetForm = () => {
    setName('')
    setDescription('')
    setFeatures('')
    setPriceLabel('')
    setIsActive(true)
    setImageFile(null)
    setCurrentImageUrl('')
    setEditingId(null)
  }

  const openEdit = (product: any) => {
    setEditingId(product.id)
    setName(product.name)
    setDescription(product.description || '')
    setFeatures(product.features?.join('\n') || '')
    setPriceLabel(product.priceLabel || product.price_label || '')
    setIsActive(product.is_active)
    setCurrentImageUrl(product.image_url || '')
    setImageFile(null)
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return
    
    await supabase.from('products').delete().eq('id', id)
    setProducts(products.filter(p => p.id !== id))
    router.refresh()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = currentImageUrl

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const featureArray = features.split('\n').filter(f => f.trim() !== '')
      
      const payload = {
        name,
        description,
        features: featureArray,
        price_label: priceLabel,
        is_active: isActive,
        image_url: imageUrl,
      }

      if (editingId) {
        await supabase.from('products').update(payload).eq('id', editingId)
      } else {
        await supabase.from('products').insert([payload])
      }

      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (data) setProducts(data)
      
      setIsOpen(false)
      resetForm()
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan saat menyimpan data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
        <h2 className="font-semibold text-gray-800">Daftar Produk</h2>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger render={<Button className="bg-brand-primary text-white" />}>
            <Plus className="w-4 h-4 mr-2" /> Tambah Produk
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nama Produk</Label>
                <Input value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Label Harga (Opsional)</Label>
                <Input value={priceLabel} onChange={e => setPriceLabel(e.target.value)} placeholder="Contoh: Mulai dari Rp 350 Juta" />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi Singkat</Label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Fitur Utama (Satu baris per fitur)</Label>
                <Textarea value={features} onChange={e => setFeatures(e.target.value)} rows={5} placeholder="Stretcher manual&#10;Tabung oksigen&#10;Lampu rotator" />
              </div>
              <div className="space-y-2">
                <Label>Gambar Produk</Label>
                <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                {currentImageUrl && !imageFile && (
                  <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                      <Image src={currentImageUrl} alt="Current" fill className="object-cover" />
                    </div>
                    Gambar saat ini
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="rounded border-gray-300" />
                <Label htmlFor="isActive">Tampilkan di website (Aktif)</Label>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} className="bg-brand-primary">{loading ? 'Menyimpan...' : 'Simpan'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Gambar</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">Belum ada produk.</TableCell>
              </TableRow>
            ) : products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-100">
                    {product.image_url ? (
                      <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.price_label || '-'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {product.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEdit(product)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
