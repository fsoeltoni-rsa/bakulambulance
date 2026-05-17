import { createClient } from '@/utils/supabase/server'
import { ArticlesClient } from './ArticlesClient'

export const revalidate = 0

export default async function ArticlesPage() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Artikel & Berita</h1>
        <p className="text-gray-500">Kelola konten informasi, tips kesehatan, dan berita perusahaan.</p>
      </div>
      <ArticlesClient initialArticles={articles || []} />
    </div>
  )
}
