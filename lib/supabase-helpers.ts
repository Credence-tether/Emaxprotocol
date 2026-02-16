import { supabase } from './supabase'

// Get current logged-in user
export async function fetchCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

// Fetch deposits for a user
export async function fetchDeposits(userId: string) {
  const { data, error } = await supabase
    .from('user_deposits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Fetch withdrawals for a user
export async function fetchWithdrawals(userId: string) {
  const { data, error } = await supabase
    .from('user_withdrawals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Fetch active investments
export async function fetchInvestments(userId: string) {
  const { data, error } = await supabase
    .from('user_investments')
    .select('*')
    .eq('user_id', userId)
    .order('activated_at', { ascending: false })

  if (error) throw error
  return data
}
