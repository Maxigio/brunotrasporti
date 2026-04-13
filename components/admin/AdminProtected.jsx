import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Leaf } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'

/**
 * Server component that wraps every protected admin page.
 * - Checks session and redirects to /admin/login if not authenticated.
 * - Renders the full admin chrome (top bar + sidebar) around children.
 *
 * The admin layout.jsx is a pure passthrough so /admin/login
 * is NOT affected by this auth check — no more infinite redirect loop.
 */
export default async function AdminProtected({ children }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-brand-900 text-white px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <Leaf className="w-5 h-5 text-brand-500" strokeWidth={2} />
          <span className="font-bold text-sm tracking-tight">Bruno Trasporti — Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 hidden sm:block">{session.user?.email}</span>
          <a
            href="/api/auth/signout"
            className="text-xs text-gray-300 hover:text-white bg-brand-700 hover:bg-brand-500 px-3 py-1.5 rounded-lg transition-colors"
          >
            Esci
          </a>
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
