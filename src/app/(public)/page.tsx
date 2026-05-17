import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { CheckCircle2, ShieldCheck, Truck, Wrench, ArrowRight, MapPin, Phone } from 'lucide-react'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import heroImage from '@/assets/images/hero-image.png'
export const revalidate = 60 // Revalidate every minute

export default async function Home() {
  const supabase = await createClient()

  // Fetch Products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3)

  // Fetch Gallery Preview
  const { data: gallery } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  // Fetch Articles Preview
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-6 lg:pt-20 lg:pb-10 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center">
            {/* Left Content */}
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-primary tracking-tight leading-[1.2] mb-3">
                Pesan Ambulance <br className="hidden md:block" />
                <span className="text-brand-gold font-semibold">Impian Anda</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed font-light">
                Proses mudah, pengerjaan cepat, dan kualitas terjamin. Dipercaya instansi kesehatan di seluruh Indonesia. Produksi berstandar tinggi oleh Bakul Ambulance, bagian dari Global Karoseri (PT Rajendra Surya Artha).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="https://wa.me/62895365351111?text=Halo%20Mas%20Aris%2C%20saya%20ingin%20konsultasi%20pembuatan%20ambulance%20di%20Bakul%20Ambulance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-brand-accent text-white font-bold text-center hover:bg-brand-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1"
                >
                  Hubungi Aris
                </a>
                <a 
                  href="https://wa.me/6281220062407?text=Halo%20Mas%20Fathan%2C%20saya%20ingin%20konsultasi%20pembuatan%20ambulance%20di%20Bakul%20Ambulance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-brand-accent text-white font-bold text-center hover:bg-brand-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1"
                >
                  Hubungi Fathan
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] flex items-center justify-center">
              <Image
                src={heroImage}
                alt="Ambulance Production"
                fill
                className="object-contain object-center hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR SECTION */}
      <section className="bg-brand-primary text-white py-4 lg:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex flex-col items-center text-center pt-2 md:pt-0">
              <ShieldCheck className="w-8 h-8 text-white/90 mb-1" />
              <div className="font-semibold text-lg mb-0.5">10+ Tahun</div>
              <div className="text-white/80 text-sm font-light">Pengalaman Karoseri</div>
            </div>
            <div className="flex flex-col items-center text-center pt-2 md:pt-0">
              <CheckCircle2 className="w-8 h-8 text-white/90 mb-1" />
              <div className="font-semibold text-lg mb-0.5">Bergaransi</div>
              <div className="text-white/80 text-sm font-light">Resmi & Terjamin</div>
            </div>
            <div className="flex flex-col items-center text-center pt-2 md:pt-0">
              <Truck className="w-8 h-8 text-white/90 mb-1" />
              <div className="font-semibold text-lg mb-0.5">Pengiriman</div>
              <div className="text-white/80 text-sm font-light">Seluruh Indonesia</div>
            </div>
            <div className="flex flex-col items-center text-center pt-2 md:pt-0">
              <Wrench className="w-8 h-8 text-white/90 mb-1" />
              <div className="font-semibold text-lg mb-0.5">Purna Jual</div>
              <div className="text-white/80 text-sm font-light">Layanan Terbaik</div>
            </div>
          </div>
        </div>
      </section>

      {/* SPESIFIKASI SECTION */}
      <section id="spesifikasi" className="py-6 lg:py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-brand-gold font-semibold tracking-wider uppercase text-xs mb-1">Produk Unggulan</h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-primary mb-2">Pilihan Model Ambulance</h3>
            <p className="text-gray-600 text-sm font-light">Temukan berbagai tipe karoseri ambulance kami. Harga terbaik, fitur terlengkap, dan performa yang bisa diandalkan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products && products.length > 0 ? products.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={product.image_url || "https://images.unsplash.com/photo-1587556610433-5d20cef85b19?auto=format&fit=crop&q=80"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-brand-primary mb-1">{product.name}</h4>
                  <div className="text-brand-gold font-bold text-lg mb-4">
                    {product.price_label || 'Hubungi Kami'}
                  </div>
                  <p className="text-gray-600 text-sm mb-8 line-clamp-2">{product.description}</p>
                  
                  <div className="mb-8 flex-1">
                    <ul className="space-y-3">
                      {product.features?.slice(0, 5).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <WhatsAppButton 
                    message={`Halo, saya ingin menanyakan promo dan spesifikasi untuk ambulance tipe: ${product.name}. Boleh minta info lebih lanjut?`}
                    className="w-full py-4 px-4 rounded-full bg-brand-accent text-white font-bold flex items-center justify-center gap-2 hover:bg-brand-accent/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Tanya Promo {product.name.split(' ')[0]}
                  </WhatsAppButton>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-12 text-gray-500 font-medium text-lg">Belum ada data produk.</div>
            )}
          </div>
        </div>
      </section>

      {/* GALERI PREVIEW SECTION */}
      <section id="galeri" className="py-6 lg:py-10 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-brand-gold font-semibold tracking-wider uppercase text-xs mb-1">Galeri Produksi</h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-primary mb-2">Hasil Karya Kami</h3>
              <p className="text-gray-600 text-sm font-light">Dokumentasi hasil pengerjaan karoseri ambulance dari Bakul Ambulance untuk berbagai fasilitas kesehatan di Indonesia.</p>
            </div>
            <Link href="/galeri" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-colors">
              Lihat Semua Foto <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery && gallery.length > 0 ? gallery.map((item) => (
              <div key={item.id} className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden group">
                <Image
                  src={item.image_url || "https://images.unsplash.com/photo-1587556610433-5d20cef85b19?auto=format&fit=crop&q=80"}
                  alt={item.caption || "Galeri Ambulance"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white w-full">
                    <p className="font-semibold text-sm md:text-base line-clamp-2">{item.caption}</p>
                    {item.category && <span className="inline-block mt-2 text-xs font-bold bg-brand-gold text-white px-3 py-1 rounded-full">{item.category}</span>}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-12 text-gray-500 font-medium">Belum ada foto galeri.</div>
            )}
          </div>
        </div>
      </section>

      {/* ARTIKEL PREVIEW SECTION */}
      <section id="artikel" className="py-6 lg:py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-brand-gold font-semibold tracking-wider uppercase text-xs mb-1">Blog & Berita</h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-primary mb-2">Informasi & Tips</h3>
              <p className="text-gray-600 text-sm font-light">Berita terbaru, tips kesehatan, dan informasi seputar industri karoseri ambulance.</p>
            </div>
            <Link href="/artikel" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-colors">
              Lihat Semua Artikel <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles && articles.length > 0 ? articles.map((article) => (
              <Link key={article.id} href={`/artikel/${article.slug}`} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={article.cover_image_url || "https://images.unsplash.com/photo-1587556610433-5d20cef85b19?auto=format&fit=crop&q=80"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-xs font-bold text-brand-gold mb-3 uppercase tracking-wider">
                    {new Date(article.published_at || article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h4 className="text-lg font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors line-clamp-2">{article.title}</h4>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">{article.excerpt}</p>
                  <div className="mt-auto text-brand-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-3 text-center py-12 text-gray-500 font-medium">Belum ada artikel.</div>
            )}
          </div>
        </div>
      </section>

      {/* HUBUNGI KAMI SECTION */}
      <section id="hubungi" className="py-6 lg:py-10 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 md:p-10 flex flex-col justify-center bg-brand-primary text-white">
                <h2 className="text-brand-gold font-semibold tracking-wider uppercase text-xs mb-1">Konsultasi</h2>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Siap Membangun Ambulance Anda?</h3>
                <p className="text-gray-300 text-sm font-light mb-6 leading-relaxed">
                  Tim konsultan ahli kami siap membantu Anda menentukan spesifikasi ambulance yang paling tepat sesuai kebutuhan dan budget fasilitas kesehatan Anda. Hubungi kami sekarang untuk mendapatkan penawaran terbaik.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/10">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">Kantor Pusat & Workshop</h4>
                      <p className="text-gray-300 leading-relaxed">PT Rajendra Surya Artha<br/>Jalan Pramuka RT 03 RW 04, Mangun Jaya,<br/>Tambun Selatan, Bekasi 17510</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/10">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">Official Sales Consultant</h4>
                      <p className="text-gray-300 leading-relaxed">
                        <span className="font-semibold text-white">Aris Munandar</span>: 0895-3653-51111<br/>
                        <span className="font-semibold text-white">Fathan Soeltoni</span>: 0812-2006-2407
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://wa.me/62895365351111?text=Halo%20Mas%20Aris%2C%20saya%20ingin%20konsultasi%20pembuatan%20ambulance%20di%20Bakul%20Ambulance."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-4 rounded-full bg-[#25D366] text-white font-bold text-center hover:bg-[#20bd5a] transition-all shadow-lg hover:-translate-y-1"
                  >
                    Chat Aris
                  </a>
                  <a 
                    href="https://wa.me/6281220062407?text=Halo%20Mas%20Fathan%2C%20saya%20ingin%20konsultasi%20pembuatan%20ambulance%20di%20Bakul%20Ambulance."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-4 rounded-full bg-white text-brand-primary font-bold text-center hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1"
                  >
                    Chat Fathan
                  </a>
                </div>
              </div>
              
              <div className="h-80 lg:h-auto min-h-[400px] w-full bg-gray-200 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.1819777555198!2d107.054366!3d-6.239335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698fd4f757f363%3A0xc3f6a27e025178e5!2sGlobal%20Karoseri!5e0!3m2!1sen!2sid!4v1715886000000!5m2!1sen!2sid" 
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
