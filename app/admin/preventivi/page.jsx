import { createServerSupabase } from '@/lib/supabase'
import { readLocalPreventivi, mergePreventivi } from '@/lib/preventivi-local'
import PreventiviTable from '@/components/admin/PreventiviTable'
import AdminProtected from '@/components/admin/AdminProtected'

async function getPreventivi() {
  // Read from Supabase (service role bypasses RLS)
  let supabaseData = []
  try {
    const db = createServerSupabase()
    const { data, error } = await db
      .from('preventivi')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) supabaseData = data
  } catch {}

  // Merge with local fallback file (for entries saved when Supabase was unavailable)
  const localData = readLocalPreventivi()
  return mergePreventivi(supabaseData, localData)
}

export default async function PreventiviPage() {
  const preventivi = await getPreventivi()

  return (
    <AdminProtected>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Preventivi</h1>
          <p className="text-gray-500 text-sm mt-1">{preventivi.length} richieste totali</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <PreventiviTable initialData={preventivi} />
        </div>
      </div>
    </AdminProtected>
  )
}
