import { Truck } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminProtected({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-brand-900 text-white px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <Truck className="w-5 h-5 text-brand-500" strokeWidth={2} />
          <span className="font-bold text-sm tracking-tight">Bruno Trasporti — Admin</span>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-gray-100 shrink-0 hidden md:block">
          <AdminNav />
        </aside>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
