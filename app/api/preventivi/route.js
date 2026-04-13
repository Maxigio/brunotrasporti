import { createServerSupabase } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

const LOCAL_FILE = path.join(process.cwd(), 'data', 'preventivi_local.json')

function readLocal() {
  try {
    if (fs.existsSync(LOCAL_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf8'))
    }
  } catch {}
  return []
}

function writeLocal(record) {
  try {
    const existing = readLocal()
    existing.unshift(record)
    fs.writeFileSync(LOCAL_FILE, JSON.stringify(existing, null, 2), 'utf8')
  } catch (err) {
    console.error('writeLocal error:', err)
  }
}

// POST /api/preventivi — crea nuova richiesta (pubblico)
export async function POST(request) {
  try {
    const body = await request.json()
    const { servizio, descrizione, contatto_nome, contatto_telefono, contatto_email } = body

    if (!servizio || typeof servizio !== 'string') {
      return Response.json({ error: 'Campo servizio obbligatorio' }, { status: 400 })
    }

    const record = {
      id: crypto.randomUUID(),
      servizio,
      descrizione: descrizione || null,
      contatto_nome: contatto_nome || null,
      contatto_telefono: contatto_telefono || null,
      contatto_email: contatto_email || null,
      status: 'da_richiamare',
      created_at: new Date().toISOString(),
      source: 'local',
    }

    // Prova Supabase — se fallisce (RLS, config mancante, ecc.) usa il file locale
    let savedToSupabase = false
    try {
      const db = createServerSupabase()
      const { error } = await db.from('preventivi').insert({
        id: record.id,
        servizio: record.servizio,
        descrizione: record.descrizione || null,
        contatto_nome: record.contatto_nome || null,
        contatto_telefono: record.contatto_telefono || null,
        contatto_email: record.contatto_email || null,
        status: 'da_richiamare',
        created_at: record.created_at,
      })
      if (!error) savedToSupabase = true
    } catch {
      // Supabase non disponibile — continua con fallback
    }

    if (!savedToSupabase) {
      writeLocal(record)
    }

    return Response.json({ ok: true, source: savedToSupabase ? 'supabase' : 'local' }, { status: 201 })
  } catch (err) {
    console.error('POST /api/preventivi error:', err)
    return Response.json({ error: 'Errore interno' }, { status: 500 })
  }
}

// GET /api/preventivi — lista admin
export async function GET() {

  try {
    // Leggi da Supabase
    let supabaseData = []
    try {
      const db = createServerSupabase()
      const { data, error } = await db
        .from('preventivi')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) supabaseData = data
    } catch {}

    // Leggi da file locale
    const localData = readLocal()

    // Merge: rimuovi duplicati per ID
    const supabaseIds = new Set(supabaseData.map((r) => r.id))
    const merged = [
      ...supabaseData,
      ...localData.filter((r) => !supabaseIds.has(r.id)),
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    return Response.json(merged)
  } catch (err) {
    console.error('GET /api/preventivi error:', err)
    return Response.json({ error: 'Errore interno' }, { status: 500 })
  }
}
