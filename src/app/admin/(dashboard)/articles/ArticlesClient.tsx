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

export function ArticlesClient({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form State
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [currentImageUrl, setCurrentImageUrl] = useState('')

  const supabase = createClient()
  const router = useRouter()

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!editingId) {
      setSlug(generateSlug(e.target.value))
    }
  }

  const resetForm = () => {
    setTitle('')
    setSlug('')
    setExcerpt('')
    setContent('')
    setIsPublished(true)
    setImageFile(null)
    setCurrentImageUrl('')
    setEditingId(null)
  }

  const openEdit = (article: any) => {
    setEditingId(article.id)
    setTitle(article.title)
    setSlug(article.slug)
    setExcerpt(article.excerpt || '')
    setContent(article.content || '')
    setIsPublished(article.is_published)
    setCurrentImageUrl(article.cover_image_url || '')
    setImageFile(null)
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return
    
    await supabase.from('articles').delete().eq('id', id)
    setArticles(articles.filter(a => a.id !== id))
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
      
      const payload: any = {
        title,
        slug,
        excerpt,
        content,
        is_published: isPublished,
        cover_image_url: imageUrl,
      }

      if (isPublished && (!editingId || !articles.find(a => a.id === editingId)?.published_at)) {
        payload.published_at = new Date().toISOString()
      }

      if (editingId) {
        const { error } = await supabase.from('articles').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('articles').insert([payload])
        if (error) throw error
      }

      const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
      if (data) setArticles(data)
      
      setIsOpen(false)
      resetForm()
      router.refresh()
    } catch (error: any) {
      console.error(error)
      if (error.code === '23505') {
        alert('Slug sudah digunakan. Silakan ubah slug artikel.')
      } else {
        alert('Terjadi kesalahan saat menyimpan artikel.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
        <h2 className="font-semibold text-gray-800">Daftar Artikel</h2>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger render={<Button className="bg-brand-primary text-white" />}>
            <Plus className="w-4 h-4 mr-2" /> Tulis Artikel
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Judul Artikel</Label>
                  <Input value={title} onChange={handleTitleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Slug (URL)</Label>
                  <Input value={slug} onChange={e => setSlug(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Gambar Cover</Label>
                <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                {currentImageUrl && !imageFile && (
                  <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                    <div className="w-24 h-12 relative rounded overflow-hidden">
                      <Image src={currentImageUrl} alt="Current" fill className="object-cover" />
                    </div>
                    Gambar cover saat ini
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Kutipan Singkat (Excerpt)</Label>
                <Textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} required />
              </div>
              <div className="space-y-2">
                <Label>Konten HTML</Label>
                <Textarea 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                  rows={15} 
                  className="font-mono text-sm"
                  placeholder="<h2>Sub Judul</h2><p>Paragraf pertama...</p>" 
                  required 
                />
                <p className="text-xs text-gray-500">Anda dapat menggunakan tag HTML dasar seperti &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;ul&gt;, dll.</p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isPublished" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} className="rounded border-gray-300" />
                <Label htmlFor="isPublished">Publikasikan Artikel</Label>
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
              <TableHead>Judul Artikel</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">Belum ada artikel.</TableCell>
              </TableRow>
            ) : articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">
                  <div className="max-w-[300px] truncate">{article.title}</div>
                  <div className="text-xs text-gray-500 truncate">/{article.slug}</div>
                </TableCell>
                <TableCell>
                  {new Date(article.published_at || article.created_at).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${article.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {article.is_published ? 'Published' : 'Draft'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEdit(article)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(article.id)}>
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
