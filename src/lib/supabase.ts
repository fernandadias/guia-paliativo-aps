/**
 * Cliente Supabase. Só é criado se as variáveis de ambiente existirem —
 * sem elas, `supabase` é null e a persistência simplesmente não acontece
 * (o preview e o desenvolvimento seguem funcionando sem backend).
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const persistenceEnabled = Boolean(url && key)

export const supabase: SupabaseClient | null = persistenceEnabled
  ? createClient(url!, key!)
  : null
