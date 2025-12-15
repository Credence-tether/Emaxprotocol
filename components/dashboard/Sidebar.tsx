'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Settings,
  LogOut,
} from 'lucide-react'
import { signOut } from '@/lib/supabase'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/deposits', label: 'Deposits', icon: ArrowDownToLine },
  { href: '/dashboard/withdrawals', label: 'Withdrawals', icon: ArrowUpFromLine },
  { href: '/dashboard/investments', label: 'Investments', icon: Wallet },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 bg-[#071225] border-r border-white/10 flex-col">
      <div className="p-6 text-xl font-bold text-cyan-400">
        Emax Dashboard
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${pathname === href
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'hover:bg-white/5 text-gray-300'}
            `}
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
        className="m-4 flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
      >
        <LogOut size={18} />
        Sign out
      </button>
    </aside>
  )
}
