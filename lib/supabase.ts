import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

// Get missing environment variables
export const getMissingEnvVars = () => {
  const missing = []
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  return missing
}

// Database helper types (moved before client initialization)
export type Database = {
  public: {
    Tables: {
      trading_plans: {
        Row: {
          id: string
          name: string
          min_deposit: number
          max_deposit: number
          daily_return: number
          duration_days: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          min_deposit: number
          max_deposit: number
          daily_return: number
          duration_days: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          min_deposit?: number
          max_deposit?: number
          daily_return?: number
          duration_days?: number
          created_at?: string
        }
      }
      user_investments: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          amount: number
          status: 'active' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          amount: number
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          amount?: number
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'deposit' | 'withdrawal' | 'return' | 'referral'
          amount: number
          status: 'pending' | 'completed' | 'failed'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'deposit' | 'withdrawal' | 'return' | 'referral'
          amount: number
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'deposit' | 'withdrawal' | 'return' | 'referral'
          amount?: number
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          total_balance: number
          total_invested: number
          total_earnings: number
          referral_code: string | null
          referred_by: string | null
          kyc_status: 'pending' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          total_balance?: number
          total_invested?: number
          total_earnings?: number
          referral_code?: string | null
          referred_by?: string | null
          kyc_status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          total_balance?: number
          total_invested?: number
          total_earnings?: number
          referral_code?: string | null
          referred_by?: string | null
          kyc_status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      withdrawal_requests: {
        Row: {
          id: string
          user_id: string
          amount: number
          wallet_address: string
          status: 'pending' | 'approved' | 'rejected' | 'completed'
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          wallet_address: string
          status?: 'pending' | 'approved' | 'rejected' | 'completed'
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          wallet_address?: string
          status?: 'pending' | 'approved' | 'rejected' | 'completed'
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'info' | 'success' | 'warning' | 'error'
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: 'info' | 'success' | 'warning' | 'error'
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: 'info' | 'success' | 'warning' | 'error'
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}

// Initialize Supabase client with Database type
let supabase: ReturnType<typeof createClient<Database>> | null = null

if (isSupabaseConfigured()) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase not configured. Missing environment variables:', getMissingEnvVars())
}

export { supabase }

// Auth helper functions
export const signUp = async (email: string, password: string, metadata?: { fullName?: string; username?: string }) => {
  if (!supabase) throw new Error('Supabase is not configured')
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  })
  
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  if (!supabase) throw new Error('Supabase is not configured')
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

export const signOut = async () => {
  if (!supabase) throw new Error('Supabase is not configured')
  
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  if (!supabase) return null
  
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const resetPassword = async (email: string) => {
  if (!supabase) throw new Error('Supabase is not configured')
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  
  return { data, error }
}

// Storage helper functions
export const uploadFile = async (
  bucket: 'user-documents' | 'avatars' | 'receipts',
  filePath: string,
  file: File
) => {
  if (!supabase) throw new Error('Supabase is not configured')

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  return { data, error }
}

export const getFileUrl = (
  bucket: 'user-documents' | 'avatars' | 'receipts',
  filePath: string
) => {
  if (!supabase) throw new Error('Supabase is not configured')

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return data.publicUrl
}

export const downloadFile = async (
  bucket: 'user-documents' | 'avatars' | 'receipts',
  filePath: string
) => {
  if (!supabase) throw new Error('Supabase is not configured')

  const { data, error } = await supabase.storage
    .from(bucket)
    .download(filePath)

  return { data, error }
}

export const deleteFile = async (
  bucket: 'user-documents' | 'avatars' | 'receipts',
  filePath: string
) => {
  if (!supabase) throw new Error('Supabase is not configured')

  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([filePath])

  return { data, error }
}

export const listFiles = async (
  bucket: 'user-documents' | 'avatars' | 'receipts',
  folderPath?: string
) => {
  if (!supabase) throw new Error('Supabase is not configured')

  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folderPath, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  return { data, error }
}

// Realtime subscription helpers
export const subscribeToTable = (
  table: 'trading_plans' | 'user_investments' | 'transactions',
  callback: (payload: any) => void,
  filter?: string
) => {
  if (!supabase) throw new Error('Supabase is not configured')

  const channel = supabase
    .channel(`${table}-changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
        filter: filter,
      },
      callback
    )
    .subscribe()

  return channel
}

export const unsubscribe = (channel: any) => {
  if (!supabase) return
  supabase.removeChannel(channel)
}

// Helper to check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  if (!supabase) return false
  
  const user = await getCurrentUser()
  if (!user) return false

  const { data, error } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !data) return false
  
  return (data as { role: string }).role === 'admin'
}

// Helper to get user profile
export const getUserProfile = async (userId?: string) => {
  if (!supabase) throw new Error('Supabase is not configured')
  
  const id = userId || (await getCurrentUser())?.id
  if (!id) return null

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}
