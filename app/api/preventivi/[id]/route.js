import { createServerSupabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const STATI_VALIDI = ['da_richiamare', 'in_lavorazione', 'completato']

// PATCH /api/preventivi/:id — aggiorna stato (solo admin)
export async function PATCH(request, context) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const { status } = await request.json()

    if (!STATI_VALIDI.includes(status)) {
      return Response.json({ error: 'Stato non valido' }, { status: 400 })
    }

    const db = createServerSupabase()
    const { error } = await db
      .from('preventivi')
      .update({ status })
      .eq('id', id)

    if (error) throw error

    return Response.json({ ok: true })
  } catch (err) {
    console.error('PATCH /api/preventivi/[id] error:', err)
    return Response.json({ error: 'Errore interno' }, { status: 500 })
  }
}
