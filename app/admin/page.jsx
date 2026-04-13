import { createServerSupabase } from '@/lib/supabase'
import { readLocalPreventivi, mergePreventivi } from '@/lib/preventivi-local'
import StatsCards from '@/components/admin/StatsCards'
import AdminProtected from '@/components/admin/AdminProtected'
import AdminCharts from '@/components/admin/AdminCharts'

async function getStats() {
  // Fetch from Supabase (service role — bypasses RLS)
  let supabaseData = []
  try {
    const db = createServerSupabase()
    const { data, error } = await db
      .from('preventivi')
      .select('id, servizio, status, created_at')
    if (!error && data) supabaseData = data
  } catch {}

  // Merge with local fallback so charts reflect ALL requests, not just Supabase ones
  const all = mergePreventivi(supabaseData, readLocalPreventivi())

  const totale = all.length
  const daRichiamare = all.filter((r) => r.status === 'da_richiamare').length
  const inLavorazione = all.filter((r) => r.status === 'in_lavorazione').length
  const completati = all.filter((r) => r.status === 'completato').length

  // Per-service breakdown for pie/bar chart
  const serviziCount = all.reduce((acc, r) => {
    const key = r.servizio || 'Non specificato'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
  const perServizio = Object.entries(serviziCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  // Weekly trend (last 8 weeks)
  const now = new Date()
  const trend = Array.from({ length: 8 }, (_, i) => {
    const weekStart = new Date(now)
    weekStart.setDate(weekStart.getDate() - (7 - i) * 7)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)
    const count = all.filter((r) => {
      const d = new Date(r.created_at)
      return d >= weekStart && d < weekEnd
    }).length
    return { settimana: `S${i + 1}`, richieste: count }
  })

  return { totale, daRichiamare, inLavorazione, completati, perServizio, trend }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <AdminProtected>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Panoramica delle richieste di preventivo</p>
        </div>

        <StatsCards stats={stats} />

        <AdminCharts perServizio={stats.perServizio} trend={stats.trend} />

        <div className="bg-brand-100 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-brand-900 text-sm">Statistiche visite sito</p>
            <p className="text-brand-700 text-xs mt-0.5">
              Configura Google Analytics per monitorare il traffico
            </p>
          </div>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1 transition-colors"
          >
            Apri GA →
          </a>
        </div>
      </div>
    </AdminProtected>
  )
}
