// ============================================================================
// TypeScript Database Types - Date Required
// ============================================================================
// This File shows what needs to be added to lib/supabase.ts
// Currently, the Database type is incomplete and missing many tables
// ============================================================================

// CURRENT STATE: lib/supabase.ts only has 3 tables defined
// The complete type definition is below

// ============================================================================
// COMPLETE TYPE DEFINITIONS TO ADD
// ============================================================================

// Copy these into lib/supabase.ts to replace the existing Database type

export type Database = {
  public: {
    Tables: {
      // ========== CORE TABLES (Already Exist) ==========
      
      trading_plans: {
        Row: {
          id: string;
          name: string;
          min_deposit: number;
          max_deposit: number;
          daily_return: number;
          duration_days: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          min_deposit: number;
          max_deposit: number;
          daily_return: number;
          duration_days: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          min_deposit?: number;
          max_deposit?: number;
          daily_return?: number;
          duration_days?: number;
          created_at?: string;
        };
      };

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
        Insert: {
          id: string;
          full_name?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          total_balance?: number;
          total_invested?: number;
          total_earnings?: number;
          referral_code?: string | null;
          referred_by?: string | null;
          kyc_status?: "pending" | "approved" | "rejected";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          total_balance?: number;
          total_invested?: number;
          total_earnings?: number;
          referral_code?: string | null;
          referred_by?: string | null;
          kyc_status?: "pending" | "approved" | "rejected";
          created_at?: string;
          updated_at?: string;
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
        Insert: {
          id?: string;
          user_id: string;
          plan_id: string;
          amount: number;
          status?: "active" | "completed" | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_id?: string;
          amount?: number;
          status?: "active" | "completed" | "cancelled";
          created_at?: string;
          updated_at?: string;
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
        Insert: {
          id?: string;
          user_id: string;
          type: "deposit" | "withdrawal" | "return" | "referral";
          amount: number;
          status?: "pending" | "completed" | "failed";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: "deposit" | "withdrawal" | "return" | "referral";
          amount?: number;
          status?: "pending" | "completed" | "failed";
          created_at?: string;
        };
      };

      withdrawal_requests: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          wallet_address: string;
          status: "pending" | "approved" | "rejected" | "completed";
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          wallet_address: string;
          status?: "pending" | "approved" | "rejected" | "completed";
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          wallet_address?: string;
          status?: "pending" | "approved" | "rejected" | "completed";
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: "info" | "success" | "warning" | "error";
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: "info" | "success" | "warning" | "error";
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: "info" | "success" | "warning" | "error";
          is_read?: boolean;
          created_at?: string;
        };
      };

      // ========== PHASE 1: CRITICAL TABLES ==========

      two_factor_auth: {
        Row: {
          id: string;
          user_id: string;
          enabled: boolean;
          secret: string | null;
          backup_codes: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          enabled?: boolean;
          secret?: string | null;
          backup_codes?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          enabled?: boolean;
          secret?: string | null;
          backup_codes?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      security_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          details: Record<string, any> | null;
          ip_address: string | null;
          success: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          details?: Record<string, any> | null;
          ip_address?: string | null;
          success?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          details?: Record<string, any> | null;
          ip_address?: string | null;
          success?: boolean;
          created_at?: string;
        };
      };

      kyc_documents: {
        Row: {
          id: string;
          user_id: string;
          document_type: "id" | "proof_of_address" | "selfie" | "other";
          file_path: string;
          verification_status: "pending" | "approved" | "rejected";
          rejection_reason: string | null;
          verified_by_admin: string | null;
          created_at: string;
          verified_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          document_type: "id" | "proof_of_address" | "selfie" | "other";
          file_path: string;
          verification_status?: "pending" | "approved" | "rejected";
          rejection_reason?: string | null;
          verified_by_admin?: string | null;
          created_at?: string;
          verified_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          document_type?: "id" | "proof_of_address" | "selfie" | "other";
          file_path?: string;
          verification_status?: "pending" | "approved" | "rejected";
          rejection_reason?: string | null;
          verified_by_admin?: string | null;
          created_at?: string;
          verified_at?: string | null;
        };
      };

      compliance_agreements: {
        Row: {
          id: string;
          user_id: string;
          agreement_type: "terms" | "privacy_policy" | "risk_disclosure" | "aml_kyc";
          version: string;
          agreed_at: string;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          agreement_type: "terms" | "privacy_policy" | "risk_disclosure" | "aml_kyc";
          version: string;
          agreed_at: string;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          agreement_type?: "terms" | "privacy_policy" | "risk_disclosure" | "aml_kyc";
          version?: string;
          agreed_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };

      // ========== PHASE 2: HIGH PRIORITY TABLES ==========

      investment_returns: {
        Row: {
          id: string;
          investment_id: string;
          user_id: string;
          return_amount: number;
          return_percentage: number;
          return_date: string;
          status: "pending" | "credited" | "paid";
          created_at: string;
        };
        Insert: {
          id?: string;
          investment_id: string;
          user_id: string;
          return_amount: number;
          return_percentage: number;
          return_date: string;
          status?: "pending" | "credited" | "paid";
          created_at?: string;
        };
        Update: {
          id?: string;
          investment_id?: string;
          user_id?: string;
          return_amount?: number;
          return_percentage?: number;
          return_date?: string;
          status?: "pending" | "credited" | "paid";
          created_at?: string;
        };
      };

      admin_actions_log: {
        Row: {
          id: string;
          admin_id: string | null;
          action_type: string;
          target_user_id: string | null;
          action_details: Record<string, any> | null;
          changes_made: Record<string, any> | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id?: string | null;
          action_type: string;
          target_user_id?: string | null;
          action_details?: Record<string, any> | null;
          changes_made?: Record<string, any> | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string | null;
          action_type?: string;
          target_user_id?: string | null;
          action_details?: Record<string, any> | null;
          changes_made?: Record<string, any> | null;
          ip_address?: string | null;
          created_at?: string;
        };
      };

      platform_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value: Record<string, any>;
          description: string | null;
          setting_type: "number" | "string" | "boolean" | "json" | null;
          updated_by_admin: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          setting_key: string;
          setting_value: Record<string, any>;
          description?: string | null;
          setting_type?: "number" | "string" | "boolean" | "json" | null;
          updated_by_admin?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          setting_key?: string;
          setting_value?: Record<string, any>;
          description?: string | null;
          setting_type?: "number" | "string" | "boolean" | "json" | null;
          updated_by_admin?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      email_logs: {
        Row: {
          id: string;
          user_id: string | null;
          recipient_email: string;
          email_type: string | null;
          subject: string | null;
          status: "sent" | "failed" | "bounced";
          error_message: string | null;
          sent_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          recipient_email: string;
          email_type?: string | null;
          subject?: string | null;
          status?: "sent" | "failed" | "bounced";
          error_message?: string | null;
          sent_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          recipient_email?: string;
          email_type?: string | null;
          subject?: string | null;
          status?: "sent" | "failed" | "bounced";
          error_message?: string | null;
          sent_at?: string;
        };
      };

      // ========== PHASE 3: RECOMMENDED TABLES ==========

      user_devices: {
        Row: {
          id: string;
          user_id: string;
          device_name: string;
          device_type: string | null;
          ip_address: string | null;
          user_agent: string | null;
          last_seen: string | null;
          is_trusted: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          device_name: string;
          device_type?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          last_seen?: string | null;
          is_trusted?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          device_name?: string;
          device_type?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          last_seen?: string | null;
          is_trusted?: boolean;
          created_at?: string;
        };
      };

      payment_methods: {
        Row: {
          id: string;
          user_id: string;
          type: "bank_transfer" | "crypto_wallet" | "card" | "paypal";
          label: string | null;
          wallet_address: string | null;
          account_number: string | null;
          is_primary: boolean;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "bank_transfer" | "crypto_wallet" | "card" | "paypal";
          label?: string | null;
          wallet_address?: string | null;
          account_number?: string | null;
          is_primary?: boolean;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: "bank_transfer" | "crypto_wallet" | "card" | "paypal";
          label?: string | null;
          wallet_address?: string | null;
          account_number?: string | null;
          is_primary?: boolean;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      referral_rewards: {
        Row: {
          id: string;
          referrer_id: string;
          referred_user_id: string;
          reward_amount: number;
          reward_type: "commission" | "bonus" | "cashback" | null;
          trigger_action: string | null;
          status: "pending" | "earned" | "paid";
          created_at: string;
        };
        Insert: {
          id?: string;
          referrer_id: string;
          referred_user_id: string;
          reward_amount: number;
          reward_type?: "commission" | "bonus" | "cashback" | null;
          trigger_action?: string | null;
          status?: "pending" | "earned" | "paid";
          created_at?: string;
        };
        Update: {
          id?: string;
          referrer_id?: string;
          referred_user_id?: string;
          reward_amount?: number;
          reward_type?: "commission" | "bonus" | "cashback" | null;
          trigger_action?: string | null;
          status?: "pending" | "earned" | "paid";
          created_at?: string;
        };
      };

      support_tickets: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          priority: "low" | "medium" | "high" | "urgent";
          category: string | null;
          status: "open" | "in_progress" | "resolved" | "closed";
          assigned_to_admin: string | null;
          created_at: string;
          updated_at: string;
          resolved_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          priority?: "low" | "medium" | "high" | "urgent";
          category?: string | null;
          status?: "open" | "in_progress" | "resolved" | "closed";
          assigned_to_admin?: string | null;
          created_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          priority?: "low" | "medium" | "high" | "urgent";
          category?: string | null;
          status?: "open" | "in_progress" | "resolved" | "closed";
          assigned_to_admin?: string | null;
          created_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
        };
      };

      // ========== PHASE 4: OPTIONAL TABLES ==========

      user_blacklist: {
        Row: {
          id: string;
          user_id: string | null;
          reason: string;
          status: "active" | "appealed" | "removed";
          notes: string | null;
          created_by_admin: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          reason: string;
          status?: "active" | "appealed" | "removed";
          notes?: string | null;
          created_by_admin?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          reason?: string;
          status?: "active" | "appealed" | "removed";
          notes?: string | null;
          created_by_admin?: string | null;
          created_at?: string;
        };
      };

      api_keys: {
        Row: {
          id: string;
          user_id: string;
          key_name: string;
          key_hash: string;
          last_used_at: string | null;
          expires_at: string | null;
          is_active: boolean;
          permissions: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          key_name: string;
          key_hash: string;
          last_used_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          permissions?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          key_name?: string;
          key_hash?: string;
          last_used_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          permissions?: string[] | null;
          created_at?: string;
        };
      };
    };
  };
};
