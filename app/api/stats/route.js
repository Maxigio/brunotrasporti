import { createServerSupabase } from '@/lib/supabase'

// GET /api/stats — statistiche aggregate admin
export async function GET() {

  try {
    const db = createServerSupabase()

    const { data, error } = await db
      .from('preventivi')
      .select('id, servizio, status, created_at')

    if (error) throw error

    const totale = data.length
    const daRichiamare = data.filter((r) => r.status === 'da_richiamare').length
    const inLavorazione = data.filter((r) => r.status === 'in_lavorazione').length
    const completati = data.filter((r) => r.status === 'completato').length

    // Distribuzione per servizio
    const serviziCount = data.reduce((acc, r) => {
      acc[r.servizio] = (acc[r.servizio] || 0) + 1
      return acc
    }, {})
    const perServizio = Object.entries(serviziCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)

    // Trend: richieste per settimana (ultime 8 settimane)
    const now = new Date()
    const weeks = Array.from({ length: 8 }, (_, i) => {
      const d = new Date(now)
      d.setDate(d.getDate() - (7 - i) * 7)
      return d
    })

    const trend = weeks.map((weekStart, i) => {
      const weekEnd = i < 7 ? weeks[i + 1] : new Date()
      const count = data.filter((r) => {
        const d = new Date(r.created_at)
        return d >= weekStart && d < weekEnd
      }).length
      return {
        settimana: `Sett. ${i + 1}`,
        richieste: count,
      }
    })

    return Response.json({ totale, daRichiamare, inLavorazione, completati, perServizio, trend })
  } catch (err) {
    console.error('GET /api/stats error:', err)
    return Response.json({ error: 'Errore interno' }, { status: 500 })
  }
}
