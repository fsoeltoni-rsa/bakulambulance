"use client"

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false)

  const contacts = [
    {
      name: "Aris",
      role: "Sales Consultant",
      number: "62895365351111",
      message: "Halo Aris, saya ingin bertanya tentang karoseri ambulance."
    },
    {
      name: "Fathan",
      role: "Sales Consultant",
      number: "6281220062407",
      message: "Halo Fathan, saya ingin bertanya tentang karoseri ambulance."
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Contacts */}
      <div 
        className={cn(
          "mb-4 flex flex-col gap-3 transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {contacts.map((contact) => (
          <a
            key={contact.name}
            href={`https://wa.me/${contact.number}?text=${encodeURIComponent(contact.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white pl-4 pr-2 py-2 rounded-full shadow-lg border border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800 leading-tight">{contact.name}</p>
              <p className="text-[10px] text-gray-500">{contact.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
          </a>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 z-50",
          isOpen ? "bg-red-500" : "bg-[#25D366]"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-7 h-7 fill-current" />
        )}
      </button>
    </div>
  )
}
