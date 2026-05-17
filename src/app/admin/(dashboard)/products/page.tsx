import { createClient } from '@/utils/supabase/server'
import { ProductsClient } from './ProductsClient'

export const revalidate = 0

export default async function ProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Produk Ambulance</h1>
        <p className="text-gray-500">Kelola daftar produk dan spesifikasinya.</p>
      </div>
      <ProductsClient initialProducts={products || []} />
    </div>
  )
}
