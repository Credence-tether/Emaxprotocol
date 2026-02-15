# Database Schema Analysis - Emaxprotocol Investment Platform

## Current Status: ✅ Core Schema Complete, ⚠️ Enhancements Recommended

### Existing Tables (Complete) ✓

#### 1. **trading_plans** ✓
Core investment package management  
```
Fields: id, name, min_deposit, max_deposit, daily_return, duration_days, created_at
```
**Status**: Ready for production

#### 2. **user_investments** ✓
User's active investment positions  
```
Fields: id, user_id, plan_id, amount, status, created_at, updated_at
Status enum: 'active', 'completed', 'cancelled'
```
**Status**: Ready for production

#### 3. **transactions** ✓
Financial transaction log  
```
Fields: id, user_id, type, amount, status, created_at
Type enum: 'deposit', 'withdrawal', 'return', 'referral'
Status enum: 'pending', 'completed', 'failed'
```
**Status**: Ready for production

#### 4. **user_profiles** ✓
User account and profile information  
```
Fields:
- Authentication: id (UUID), created_at, updated_at
- Profile: full_name, username, avatar_url
- Account: role (user/admin), total_balance, total_invested, total_earnings
- KYC: kyc_status (pending/approved/rejected)
- Referral: referral_code, referred_by
```
**Status**: Ready for production

#### 5. **withdrawal_requests** ✓
Withdrawal management with admin approval  
```
Fields: id, user_id, amount, wallet_address, status, admin_notes, created_at, updated_at
Status enum: 'pending', 'approved', 'rejected', 'completed'
```
**Status**: Ready for production

#### 6. **notifications** ✓
User notification system  
```
Fields: id, user_id, title, message, type, is_read, created_at
Type enum: 'info', 'success', 'warning', 'error'
```
**Status**: Ready for production

#### 7. **Storage Buckets** ✓
Three buckets with RLS policies  
- `user-documents` (Private) - KYC docs, ID verification
- `avatars` (Public) - Profile pictures
- `receipts` (Private) - Transaction receipts
```
**Status**: Ready for production

---

## Schema Completeness Assessment

### ✅ What's Working

- User authentication (email/password, password reset)
- User profiles with role-based access control
- Trading plans with clear parameters
- Investment tracking with status management
- Transaction history with comprehensive types
- Withdrawal workflow with admin approval
- User notifications system
- File storage with proper access control
- Row Level Security (RLS) on all tables
- Real-time subscriptions on all tables
- Automatic user profile creation on signup

### ⚠️ Recommended Additional Tables for Production

#### For Enhanced User Management

**1. two_factor_auth**
Store 2FA settings per user
```sql
CREATE TABLE two_factor_auth (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  enabled BOOLEAN DEFAULT false,
  secret TEXT,
  backup_codes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Essential for protecting user accounts from unauthorized access

**2. user_devices**
Track login devices and locations for security
```sql
CREATE TABLE user_devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  device_name TEXT NOT NULL,
  device_type TEXT,
  ip_address INET,
  user_agent TEXT,
  last_seen TIMESTAMP WITH TIME ZONE,
  is_trusted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Track login devices, detect suspicious activity, allow device management

**3. security_logs**
Comprehensive audit trail for security events
```sql
CREATE TABLE security_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Compliance, fraud detection, incident response

#### For Financial Operations

**4. investment_returns**
Track periodic returns for investments
```sql
CREATE TABLE investment_returns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_id UUID REFERENCES user_investments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  return_amount DECIMAL(10,2) NOT NULL,
  return_percentage DECIMAL(5,2) NOT NULL,
  return_date DATE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'credited', 'paid')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Track returns separately from general transactions, calculate accurate earnings

**5. payment_methods**
Store user payment information
```sql
CREATE TABLE payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('bank_transfer', 'crypto_wallet', 'card', 'paypal')),
  label TEXT,
  wallet_address TEXT,
  account_number TEXT,
  is_primary BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Support multiple payment methods, simplify deposits/withdrawals

**6. referral_rewards**
Track referral commissions and rewards
```sql
CREATE TABLE referral_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_amount DECIMAL(10,2) NOT NULL,
  reward_type TEXT CHECK (reward_type IN ('commission', 'bonus', 'cashback')),
  trigger_action TEXT,
  status TEXT CHECK (status IN ('pending', 'earned', 'paid')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Manage referral program, track earnings attribution

#### For Compliance & KYC

**7. kyc_documents**
Track individual KYC document submissions
```sql
CREATE TABLE kyc_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT CHECK (document_type IN ('id', 'proof_of_address', 'selfie', 'other')),
  file_path TEXT NOT NULL,
  verification_status TEXT CHECK (verification_status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  rejection_reason TEXT,
  verified_by_admin UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Track individual documents, allow reminders for pending docs, audit trail

**8. compliance_agreements**
Track user agreement with policies
```sql
CREATE TABLE compliance_agreements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agreement_type TEXT CHECK (agreement_type IN ('terms', 'privacy_policy', 'risk_disclosure')),
  version TEXT NOT NULL,
  agreed_at TIMESTAMP WITH TIME ZONE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Legal compliance, prove user acceptance of terms

#### For Admin & Monitoring

**9. admin_actions_log**
Track all admin operations
```sql
CREATE TABLE admin_actions_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  target_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action_details JSONB,
  changes_made JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Accountability, audit compliance, track admin changes

**10. platform_settings**
Global platform configuration
```sql
CREATE TABLE platform_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB,
  description TEXT,
  setting_type TEXT,
  updated_by_admin UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Manage platform features, withdrawal limits, return percentages without code changes

**11. user_blacklist**
Block users or wallets
```sql
CREATE TABLE user_blacklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT CHECK (status IN ('active', 'appealed', 'removed')) DEFAULT 'active',
  notes TEXT,
  created_by_admin UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Block fraudulent users, prevent re-registration

#### For Communication & Support

**12. support_tickets**
Customer support system
```sql
CREATE TABLE support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category TEXT,
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  assigned_to_admin UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);
```
**Why**: Track user issues, support response management

**13. email_logs**
Track all sent emails
```sql
CREATE TABLE email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  email_type TEXT,
  subject TEXT,
  status TEXT CHECK (status IN ('sent', 'failed', 'bounced')) DEFAULT 'sent',
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Debug email issues, GDPR compliance, communication audit

#### For API Access (Optional)

**14. api_keys**
Manage API access for integrations
```sql
CREATE TABLE api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  key_name TEXT NOT NULL,
  key_hash TEXT UNIQUE NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  permissions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**Why**: Allow programmatic access, rate limiting per key

---

## Implementation Priority

### Phase 1: CRITICAL (Before Production) ⚠️
- [ ] `two_factor_auth` - Security requirement
- [ ] `security_logs` - Compliance/audit trail
- [ ] `kyc_documents` - Regulatory requirement
- [ ] `compliance_agreements` - Legal protection

### Phase 2: HIGH (First Month) 🔴
- [ ] `investment_returns` - Core financial tracking
- [ ] `admin_actions_log` - Admin oversight
- [ ] `platform_settings` - Operational flexibility
- [ ] `email_logs` - Debugging & compliance

### Phase 3: RECOMMENDED (Growth)
- [ ] `user_devices` - Security enhancement
- [ ] `payment_methods` - User convenience
- [ ] `referral_rewards` - Marketing feature
- [ ] `support_tickets` - Customer service
- [ ] `user_blacklist` - Fraud prevention

### Phase 4: OPTIONAL (Future)
- [ ] `api_keys` - API access for partners

---

## TypeScript Types Gap

**Current Issue**: The TypeScript types in `lib/supabase.ts` are incomplete compared to the actual SQL schema.

**Missing from TypeScript types**:
- `trading_plans`
- `withdrawal_requests`
- `notifications`

**Action Required**: Update `lib/supabase.ts` with complete type definitions for all tables.

---

## Current Implementation Status

### Dashboard Features ✓
- User Dashboard (`/dashboard`) - View profile, investments, transactions
- Admin Dashboard (`/admin/dashboard`) - Manage users, withdrawals, investments
- Deposits, Investments, Settings, Withdrawals pages

### Missing Components
- [ ] 2FA setup page
- [ ] Device management page
- [ ] Support ticket system
- [ ] KYC document upload UI
- [ ] Payment method management
- [ ] Referral rewards tracker

---

## Recommendations Summary

### For MVP (Production Launch)
✅ **Keep existing schema** - All core tables are well-designed  
✅ **Add Phase 1 tables** - Essential for compliance and security

### For Scale
✅ **Add Phase 2 tables** - Better financial tracking and admin controls  
✅ **Add Phase 3 tables** - Enhanced user experience and fraud prevention

### Security Checklist
- [ ] RLS policies on all new tables
- [ ] Admin audit logging enabled
- [ ] 2FA enforcement option
- [ ] Email verification required before deposits
- [ ] Withdrawal whitelist (optional)
- [ ] Transaction limits per user
- [ ] Velocity checks for mass transactions

---

## Migration Path

To add recommended tables without downtime:

1. Create new tables in staging environment
2. Test with data migration scripts
3. Enable replication for new tables
4. Perform blue-green deployment
5. Update frontend UI components
6. Enable new features gradually

---

## Resources

- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Current schema creation SQL
- [lib/supabase.ts](lib/supabase.ts) - TypeScript types (needs update)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
