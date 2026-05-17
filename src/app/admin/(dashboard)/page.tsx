import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Image as ImageIcon, FileText } from 'lucide-react'

export const revalidate = 0 // always fetch fresh data for admin

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Get counts
  const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
  const { count: galleryCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true })
  const { count: articlesCount } = await supabase.from('articles').select('*', { count: 'exact', head: true })

  const stats = [
    { name: 'Total Produk', value: productsCount || 0, icon: Package },
    { name: 'Total Galeri', value: galleryCount || 0, icon: ImageIcon },
    { name: 'Total Artikel', value: articlesCount || 0, icon: FileText },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Ringkasan data website Bakul Ambulance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
