"use client"

import { createClient } from "@supabase/supabase-js";
import { RealtimeChannel } from '@supabase/supabase-js'
/* ================= ENV ================= */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/* ============== Upload file ============== */
export async function uploadFile(bucket: string, path: string, file: File) {
return await supabase.storage.from(bucket).upload(path, file)
}

/* ================= DATABASE TYPES ================= */

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          username: string | null;
          avatar_url: string | null;
          role: "user" | "admin";
          total_balance: number;
          total_invested: number;
          total_earnings: number;
          referral_code: string | null;
          referred_by: string | null;
          kyc_status: "pending" | "approved" | "rejected";
          created_at: string;
          updated_at: string;
        };
      };
      user_investments: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          amount: number;
          status: "active" | "completed" | "cancelled";
          created_at: string;
          updated_at: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: "deposit" | "withdrawal" | "return" | "referral";
          amount: number;
          status: "pending" | "completed" | "failed";
          created_at: string;
        };
      };
    };
  };
};

/* ================= CLIENT ================= */

/**
 * IMPORTANT:
 * These auth options are REQUIRED for Next.js App Router.
 * Without them, RLS WILL FAIL.
 */
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "emax-auth",
    },
  }
);

/* ================= AUTH HELPERS ================= */

export const signUp = async (
  email: string,
  password: string,
  metadata?: { fullName?: string; username?: string }
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
  });
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

/**
 * Send a password reset email to the user
 */
export const resetPassword = async (email: string) => {
  const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined;
  return await supabase.auth.resetPasswordForEmail(email, redirectTo ? { redirectTo } : undefined);
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

/* ================= PROFILE ================= */

export const getUserProfile = async (userId?: string) => {
  const id = userId || (await getCurrentUser())?.id;
  if (!id) return { data: null, error: null };

  return await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
};

/* ================= ADMIN ================= */

export const isAdmin = async () => {
  const user = await getCurrentUser();
  if (!user) return false;

  const { data } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle<{ role: "user" | "admin" }>();

  return data?.role === "admin";
}

/**
 * Get list of missing Supabase environment variables
 */
export function getMissingEnvVars(): string[] {
  const missing: string[] = []
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missing.push('NEXT_PUBLIC_SUPABASE_URL')
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  
  return missing
}

/**
 * Check if Supabase is properly configured with environment variables
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

/* === List filesm ====== */
export async function listFiles(bucket: string, path: string) {
  return await supabase.storage.from(bucket).list(path)
}

/* Delete file */
export async function deleteFile(bucket: string, path: string) {
  return await supabase.storage.from(bucket).remove([path])
}

/* Get file public URL */
export function getFileUrl(bucket: string, path: string): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return data.publicUrl
}


/* Subscribe to table changes */
export function subscribeToTable(
  table: string,
  callback: (payload: any) => void
): RealtimeChannel {
  const channel = supabase
    .channel(`realtime:${table}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table },
      (payload) => {
        callback(payload)
      }
    )
    .subscribe()

  return channel
}

// Unsubscribe
export function unsubscribe(channel: RealtimeChannel) {
  supabase.removeChannel(channel)
}

