import fs from 'fs'
import path from 'path'

const LOCAL_FILE = path.join(process.cwd(), 'data', 'preventivi_local.json')

/**
 * Read all preventivi saved to the local JSON fallback file.
 * Returns [] if the file doesn't exist or can't be parsed.
 */
export function readLocalPreventivi() {
  try {
    if (fs.existsSync(LOCAL_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf8'))
    }
  } catch {}
  return []
}

/**
 * Merge Supabase rows with local-file rows, deduplicating by ID.
 * Supabase data takes precedence; local entries only added if their
 * ID isn't already in the Supabase result set.
 */
export function mergePreventivi(supabaseData = [], localData = []) {
  const supabaseIds = new Set(supabaseData.map((r) => r.id))
  return [
    ...supabaseData,
    ...localData.filter((r) => !supabaseIds.has(r.id)),
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}
