'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/supabase'
import {
  LayoutDashboard,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/deposits', label: 'Deposits', icon: ArrowDownToLine },
  { href: '/dashboard/withdrawals', label: 'Withdrawals', icon: ArrowUpFromLine },
  { href: '/dashboard/investments', label: 'Investments', icon: Wallet },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function MobileSidebar() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger aria-label="Open menu" className="p-2 rounded-md hover:bg-white/10">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#071225] text-white border-white/10 p-0 w-72">
        <div className="p-6 text-xl font-bold text-cyan-400 border-b border-white/10">
          Emax Dashboard
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition
                ${pathname === href ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/5 text-gray-300'}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={async () => {
            await signOut()
            window.location.href = '/login'
          }}
          className="m-4 flex items-center gap-3 px-4 py-3 rounded-md text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </SheetContent>
    </Sheet>
  )
}
