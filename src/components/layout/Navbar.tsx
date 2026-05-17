"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Spesifikasi', href: '/#spesifikasi' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Artikel', href: '/artikel' },
    { name: 'Hubungi Kami', href: '/#hubungi' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white shadow-sm py-4 border-b border-gray-100'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="font-extrabold text-2xl tracking-tight text-brand-primary">
              Bakul <span className="text-brand-gold">Ambulance</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-brand-primary hover:text-brand-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/62895365351111?text=Halo%2C%20saya%20ingin%20konsultasi%20mengenai%20pembuatan%20ambulance."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md bg-brand-primary text-white hover:bg-brand-primary/90 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              Konsultasi Gratis
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 text-brand-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 px-6",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ul className="flex flex-col gap-6 text-lg font-medium text-brand-primary">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="block hover:text-brand-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto mb-10">
          <a
            href="https://wa.me/62895365351111?text=Halo%2C%20saya%20ingin%20konsultasi%20mengenai%20pembuatan%20ambulance."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-full font-medium bg-brand-primary text-white shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Konsultasi Gratis Sekarang
          </a>
        </div>
      </div>
    </header>
  )
}
