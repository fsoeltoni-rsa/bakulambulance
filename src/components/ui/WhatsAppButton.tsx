"use client"

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  message: string
  className?: string
  children: React.ReactNode
}

export function WhatsAppButton({ message, className, children }: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const contacts = [
    {
      name: "Aris",
      role: "Sales Consultant",
      number: "62895365351111",
    },
    {
      name: "Fathan",
      role: "Sales Consultant",
      number: "6281220062407",
    }
  ]

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-primary p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">Pilih Konsultan Sales</h3>
                <p className="text-brand-gold text-sm">Hubungi kami via WhatsApp</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {contacts.map((contact) => (
                <a
                  key={contact.name}
                  href={`https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-gray-50 hover:bg-green-50 p-4 rounded-xl border border-gray-100 hover:border-green-200 transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform shrink-0">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-primary group-hover:text-[#25D366] transition-colors">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.role}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
