-- ============================================================================
-- ADDITIONAL PRODUCTION TABLES FOR EMAXPROTOCOL INVESTMENT PLATFORM
-- ============================================================================
-- Run these in Supabase SQL Editor to add recommended production tables
-- These are organized by phase and priority
-- ============================================================================

-- ============================================================================
-- PHASE 1: CRITICAL TABLES (Security & Compliance)
-- ============================================================================

-- ============================================================================
-- TABLE: two_factor_auth
-- Purpose: Store 2FA settings and backup codes for enhanced security
-- ============================================================================
CREATE TABLE IF NOT EXISTS two_factor_auth (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  enabled BOOLEAN DEFAULT false,
  secret TEXT,
  backup_codes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE two_factor_auth ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own 2FA settings"
  ON two_factor_auth FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own 2FA settings"
  ON two_factor_auth FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own 2FA settings"
  ON two_factor_auth FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- TABLE: security_logs
-- Purpose: Comprehensive audit trail for security events and compliance
-- ============================================================================
CREATE TABLE IF NOT EXISTS security_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own security logs"
  ON security_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all security logs"
  ON security_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Index for performance
CREATE INDEX idx_security_logs_user_id ON security_logs(user_id);
CREATE INDEX idx_security_logs_created_at ON security_logs(created_at DESC);

-- ============================================================================
-- TABLE: kyc_documents
-- Purpose: Track individual KYC document submissions and verification
-- ============================================================================
CREATE TABLE IF NOT EXISTS kyc_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('id', 'proof_of_address', 'selfie', 'other')),
  file_path TEXT NOT NULL,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  verified_by_admin UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE kyc_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own KYC documents"
  ON kyc_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own KYC documents"
  ON kyc_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all KYC documents"
  ON kyc_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update KYC documents"
  ON kyc_documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_kyc_documents_user_id ON kyc_documents(user_id);
CREATE INDEX idx_kyc_documents_status ON kyc_documents(verification_status);

-- ============================================================================
-- TABLE: compliance_agreements
-- Purpose: Track user acceptance of terms, privacy policy, risk disclosure
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_agreements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  agreement_type TEXT NOT NULL CHECK (agreement_type IN ('terms', 'privacy_policy', 'risk_disclosure', 'aml_kyc')),
  version TEXT NOT NULL,
  agreed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE compliance_agreements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own agreements"
  ON compliance_agreements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own agreements"
  ON compliance_agreements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_compliance_agreements_user_id ON compliance_agreements(user_id);
CREATE INDEX idx_compliance_agreements_type ON compliance_agreements(agreement_type);

-- ============================================================================
-- PHASE 2: HIGH PRIORITY TABLES (Financial & Operations)
-- ============================================================================

-- ============================================================================
-- TABLE: investment_returns
-- Purpose: Track periodic returns and dividends for investments
-- ============================================================================
CREATE TABLE IF NOT EXISTS investment_returns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_id UUID REFERENCES user_investments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  return_amount DECIMAL(10,2) NOT NULL,
  return_percentage DECIMAL(5,2) NOT NULL,
  return_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'credited', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE investment_returns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own returns"
  ON investment_returns FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all returns"
  ON investment_returns FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_investment_returns_user_id ON investment_returns(user_id);
CREATE INDEX idx_investment_returns_investment_id ON investment_returns(investment_id);
CREATE INDEX idx_investment_returns_status ON investment_returns(status);

-- ============================================================================
-- TABLE: admin_actions_log
-- Purpose: Audit trail for all admin operations
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_actions_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL,
  target_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action_details JSONB,
  changes_made JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admin_actions_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all admin logs"
  ON admin_actions_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_admin_actions_log_admin_id ON admin_actions_log(admin_id);
CREATE INDEX idx_admin_actions_log_target_user_id ON admin_actions_log(target_user_id);
CREATE INDEX idx_admin_actions_log_created_at ON admin_actions_log(created_at DESC);

-- ============================================================================
-- TABLE: platform_settings
-- Purpose: Global platform configuration without code changes
-- ============================================================================
CREATE TABLE IF NOT EXISTS platform_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  setting_type TEXT CHECK (setting_type IN ('number', 'string', 'boolean', 'json')),
  updated_by_admin UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public settings"
  ON platform_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update settings"
  ON platform_settings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default platform settings
INSERT INTO platform_settings (setting_key, setting_value, description, setting_type) 
VALUES 
  ('max_daily_withdrawal', '{"amount": 50000}', 'Maximum withdrawal amount per day', 'json'),
  ('min_investment', '{"amount": 100}', 'Minimum investment amount', 'json'),
  ('max_investment', '{"amount": 1000000}', 'Maximum investment amount', 'json'),
  ('withdrawal_processing_time', '{"hours": 24}', 'Time to process withdrawals', 'json'),
  ('email_notifications_enabled', '{"value": true}', 'Enable email notifications', 'boolean'),
  ('two_factor_auth_required', '{"value": false}', 'Require 2FA for all users', 'boolean')
ON CONFLICT (setting_key) DO NOTHING;

-- ============================================================================
-- TABLE: email_logs
-- Purpose: Track all sent emails for debugging and compliance
-- ============================================================================
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  email_type TEXT,
  subject TEXT,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own email logs"
  ON email_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all email logs"
  ON email_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX idx_email_logs_status ON email_logs(status);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- ============================================================================
-- PHASE 3: RECOMMENDED TABLES (Growth & Enhancement)
-- ============================================================================

-- ============================================================================
-- TABLE: user_devices
-- Purpose: Track login devices for security and device management
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  device_name TEXT NOT NULL,
  device_type TEXT,
  ip_address INET,
  user_agent TEXT,
  last_seen TIMESTAMP WITH TIME ZONE,
  is_trusted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own devices"
  ON user_devices FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their devices"
  ON user_devices FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their devices"
  ON user_devices FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_user_devices_user_id ON user_devices(user_id);

-- ============================================================================
-- TABLE: payment_methods
-- Purpose: Store user payment information for deposits
-- ============================================================================
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bank_transfer', 'crypto_wallet', 'card', 'paypal')),
  label TEXT,
  wallet_address TEXT,
  account_number TEXT,
  is_primary BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payment methods"
  ON payment_methods FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their payment methods"
  ON payment_methods FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their payment methods"
  ON payment_methods FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their payment methods"
  ON payment_methods FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_payment_methods_user_id ON payment_methods(user_id);

-- ============================================================================
-- TABLE: referral_rewards
-- Purpose: Track referral commissions and rewards
-- ============================================================================
CREATE TABLE IF NOT EXISTS referral_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reward_amount DECIMAL(10,2) NOT NULL,
  reward_type TEXT CHECK (reward_type IN ('commission', 'bonus', 'cashback')),
  trigger_action TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'earned', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE referral_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own referral rewards"
  ON referral_rewards FOR SELECT
  USING (auth.uid() = referrer_id);

CREATE POLICY "Admins can view all referral rewards"
  ON referral_rewards FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_referral_rewards_referrer_id ON referral_rewards(referrer_id);
CREATE INDEX idx_referral_rewards_referred_user_id ON referral_rewards(referred_user_id);
CREATE INDEX idx_referral_rewards_status ON referral_rewards(status);

-- ============================================================================
-- TABLE: support_tickets
-- Purpose: Customer support ticket system
-- ============================================================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to_admin UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tickets"
  ON support_tickets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON support_tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tickets"
  ON support_tickets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets"
  ON support_tickets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update tickets"
  ON support_tickets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);

-- ============================================================================
-- PHASE 4: OPTIONAL TABLES (Future Expansion)
-- ============================================================================

-- ============================================================================
-- TABLE: user_blacklist
-- Purpose: Block fraudulent users or compromised wallets
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_blacklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'appealed', 'removed')),
  notes TEXT,
  created_by_admin UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_blacklist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view blacklist"
  ON user_blacklist FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- TABLE: api_keys
-- Purpose: Manage API access for integrations
-- ============================================================================
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  key_name TEXT NOT NULL,
  key_hash TEXT UNIQUE NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  permissions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own API keys"
  ON api_keys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their API keys"
  ON api_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their API keys"
  ON api_keys FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their API keys"
  ON api_keys FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- Enable Realtime for New Tables
-- ============================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE two_factor_auth;
ALTER PUBLICATION supabase_realtime ADD TABLE security_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE kyc_documents;
ALTER PUBLICATION supabase_realtime ADD TABLE investment_returns;
ALTER PUBLICATION supabase_realtime ADD TABLE admin_actions_log;
ALTER PUBLICATION supabase_realtime ADD TABLE user_devices;
ALTER PUBLICATION supabase_realtime ADD TABLE support_tickets;

-- ============================================================================
-- VERIFICATION SCRIPT
-- Check that all tables were created
-- ============================================================================

-- Uncomment and run to verify all tables
/*
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
*/
