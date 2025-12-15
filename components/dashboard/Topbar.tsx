'use client'

import MobileSidebar from './MobileSidebar'

export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0B1B33]">
      <div className="md:hidden">
        <MobileSidebar />
      </div>

      <div className="ml-auto text-sm text-gray-300">
        Logged in
      </div>
    </header>
  )
}
