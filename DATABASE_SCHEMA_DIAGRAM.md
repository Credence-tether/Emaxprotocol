# Database Schema Relationship Diagram

## Current Schema (7 Tables)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         auth.users (Supabase)                       │
│                    (Built-in authentication)                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  user_profiles  │ ✅ IMPLEMENTED
                    │ (User accounts) │
                    └────────┬────────┘
                    ┌────────┼────────┐
         ┌──────────┘ ┌──────┘ └───────┴──────────┐
         │            │                           │
    ┌────▼────┐  ┌───▼──────────┐  ┌────────┴────────────┐
    │ 2FA      │  │ KYC Documents│  │ Compliance          │
    │ Type     │  │ Type         │  │ Agreements Type     │
    │ Phase 1  │  │ Phase 1      │  │ Phase 1             │
    └──────────┘  └──────────────┘  └─────────────────────┘
         │
    ┌────▼──────────────────────────────┬──────────────────┐
    │                                    │                  │
┌───▼────────────┐          ┌───────────▼─────────┐   ┌─────▼────────────────┐
│ trading_plans  │          │ user_investments    │   │    transactions      │
│ ✅ IMPLEMENTED │          │ ✅ IMPLEMENTED      │   │ ✅ IMPLEMENTED       │
│                │          │                     │   │                      │
│ - min_deposit  │          │ - user_id → users   │   │ - user_id → users    │
│ - max_deposit  │◄─────────┤ - plan_id → plans   │   │ - type (4 enums)     │
│ - daily_return │          │ - amount            │   │ - status (3 enums)   │
│ - duration     │          │ - status (3 enums)  │   │ - amount             │
└────────────────┘          └─────────────────────┘   └──────────────────────┘
         │                            │                         │
         └────────┬────────────────────┴─────────────┬──────────┘
                  │                                  │
         ┌────────▼──────────────────┐    ┌─────────▼──────────┐
         │ investment_returns        │    │ withdrawal_requests│
         │ Phase 2 (RECOMMENDED)     │    │ ✅ IMPLEMENTED     │
         │                           │    │                    │
         │ - investment_id → inv     │    │ - user_id → users  │
         │ - return_amount           │    │ - amount           │
         │ - return_percentage       │    │ - wallet_address   │
         │ - status (3 enums)        │    │ - status (4 enums) │
         └───────────────────────────┘    │ - admin_notes      │
                                          └────────────────────┘
         ┌──────────────────────────────────────────────────────────┐
         │                    notifications                         │
         │              ✅ IMPLEMENTED                              │
         │                                                          │
         │ - user_id → users                                       │
         │ - title, message                                        │
         │ - type (4 enums): info, success, warning, error        │
         │ - is_read (boolean)                                     │
         └──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                     Storage Buckets (3)                          │
│                  ✅ IMPLEMENTED WITH RLS                         │
├──────────────────────────────────────────────────────────────────┤
│ 1. user-documents (Private)  → KYC, verification                │
│ 2. avatars (Public)          → Profile pictures                 │
│ 3. receipts (Private)        → Transaction receipts             │
└──────────────────────────────────────────────────────────────────┘
```

---

## Enhanced Schema with All Phases

```
PHASE 1 TABLES (Critical - Security & Compliance)
├── two_factor_auth      [user_id] ──→ user_profiles
├── security_logs        [user_id] ──→ user_profiles
├── kyc_documents        [user_id] ──→ user_profiles
└── compliance_agreements[user_id] ──→ user_profiles

PHASE 2 TABLES (High Priority - Financial Operations)
├── investment_returns   [investment_id] ──→ user_investments
│                        [user_id] ──→ user_profiles
├── admin_actions_log    [admin_id] ──→ user_profiles
│                        [target_user_id] ──→ user_profiles
├── platform_settings    [updated_by_admin] ──→ user_profiles (optional)
└── email_logs           [user_id] ──→ user_profiles (optional)

PHASE 3 TABLES (Recommended - Growth & Enhancement)
├── user_devices         [user_id] ──→ user_profiles
├── payment_methods      [user_id] ──→ user_profiles
├── referral_rewards     [referrer_id] ──→ user_profiles
│                        [referred_user_id] ──→ user_profiles
└── support_tickets      [user_id] ──→ user_profiles
                         [assigned_to_admin] ──→ user_profiles

PHASE 4 TABLES (Optional - Future Features)
├── user_blacklist       [user_id] ──→ user_profiles
│                        [created_by_admin] ──→ user_profiles
└── api_keys             [user_id] ──→ user_profiles
```

---

## Current Data Flow

```
User Signup
    │
    ├─→ auth.users (Supabase built-in)
    │
    ├─→ user_profiles (auto-created by trigger)
    │
    └─→ Ready for investment

User Deposits Money
    │
    ├─→ Create transaction (type='deposit', status='pending')
    │
    ├─→ Update user_profiles.total_balance
    │
    └─→ Ready for investment

User Invests
    │
    ├─→ Select trading_plan
    │
    ├─→ Create user_investments
    │
    ├─→ Create transaction (type='deposit')
    │
    ├─→ Update user_profiles.total_invested
    │
    ├─→ Create notification
    │
    └─→ Investment active

Daily Returns (Manual or Scheduled)
    │
    ├─→ Calculate return based on daily_return %
    │
    ├─→ Create transaction (type='return')
    │
    ├─→ Update user_profiles.total_earnings
    │
    className─→ Create notification
    │
    └─→ User sees returns

User Requests Withdrawal
    │
    ├─→ Create withdrawal_request
    │
    ├─→ Send notification to user
    │
    ├─→ Admin reviews
    │
    ├─→ (Admin: Update status to 'approved' or 'rejected')
    │
    ├─→ system processes withdrawal
    │
    ├─→ Create transaction (type='withdrawal')
    │
    ├─→ Update user_profiles.total_balance
    │
    └─→ Send confirmation notification
```

---

## Enhanced Data Flow with Phase 1

```
User Signup (with 2FA & Compliance)
    │
    ├─→ auth.users
    │
    ├─→ user_profiles
    │
    ├─→ Log security event → security_logs ⭐ NEW
    │
    ├─→ Request KYC documents
    │   └─→ kyc_documents table ⭐ NEW
    │
    ├─→ Capture compliance agreements ⭐ NEW
    │   └─→ compliance_agreements table ⭐ NEW
    │
    └─→ Optional: User enables 2FA ⭐ NEW
        └─→ two_factor_auth table ⭐ NEW

All Admin Actions Logged
    │
    ├─→ Admin views users → Log to security_logs
    │
    ├─→ Admin updates KYC status → Log to security_logs
    │
    ├─→ Admin approves withdrawal → Log to security_logs + admin_actions_log ⭐
    │
    └─→ Full audit trail for compliance
```

---

## Enhanced Data Flow with Phase 2

```
Daily Returns Distribution (Automated)
    │
    ├─→ Calculate returns on all active investments
    │
    ├─→ Create investment_returns entries ⭐ NEW
    │   ├─→ investment_id
    │   ├─→ return_amount
    │   ├─→ return_date
    │   └─→ status='pending'
    │
    ├─→ Create transaction entries
    │   └─→ type='return'
    │
    ├─→ Update user_profiles.total_earnings
    │
    ├─→ Admin reviews and approves returns
    │   └─→ Log to admin_actions_log ⭐ NEW
    │
    ├─→ Credit returns to user balance
    │   ├─→ Update investment_returns.status='credited'
    │   ├─→ Update user_profiles.total_balance
    │   └─→ Create transaction.status='completed'
    │
    ├─→ Log email sent
    │   └─→ email_logs ⭐ NEW
    │
    └─→ Create notification

Platform Configuration (No Code Changes Needed)
    │
    ├─→ Store settings in platform_settings ⭐ NEW
    │   ├─→ max_daily_withdrawal
    │   ├─→ min_investment
    │   ├─→ max_investment
    │   ├─→ withdrawal_processing_time
    │   └─→ email_notifications_enabled
    │
    ├─→ Admin updates settings via dashboard
    │
    ├─→ Log to admin_actions_log
    │
    └─→ Changes take effect immediately
```

---

## Data Model - Relationships Summary

### One-to-Many Relationships
```
user_profiles (one)
    └←─ many ─→ user_investments
    └←─ many ─→ transactions
    └←─ many ─→ withdrawal_requests
    └←─ many ─→ notifications
    └←─ many ─→ [Phase 1-4 tables with user_id]

trading_plans (one)
    └←─ many ─→ user_investments

user_investments (one)
    └←─ many ─→ investment_returns [Phase 2]

user_profiles (admin)
    └←─ many ─→ admin_actions_log [Phase 2]
```

### Many-to-Many (Implicit through transactions)
```
user_profiles ←→ trading_plans
(through user_investments)
```

### Self-referencing
```
user_profiles.referred_by → user_profiles.id
(for referral tracking)

user_profiles (admin) → admin_actions_log.admin_id
(admin actions on other users)

user_profiles (referrer) → referral_rewards.referrer_id
user_profiles (referred) → referral_rewards.referred_user_id
[Phase 3]
```

---

## Database Statistics

### Current (7 Tables)
```
Tables:        7
Indexes:       ~14 (2 per table avg)
RLS Policies:  12
Storage:       ~50MB (typical)
Bucket:        3 storage buckets
```

### After Phase 1 (+4 tables)
```
Tables:        11
Indexes:       ~22 (2 per table avg)
RLS Policies:  20+
Storage:       ~52MB
Bucket:        3 storage buckets
```

### After Phase 2 (+4 tables)
```
Tables:        15
Indexes:       ~33 (3 per table avg)
RLS Policies:  28+
Storage:       ~57MB
Bucket:        3 storage buckets
```

### After Phase 3 (+5 tables)
```
Tables:        20
Indexes:       ~48 (3 per table avg)
RLS Policies:  35+
Storage:       ~67MB
Bucket:        3 storage buckets
```

---

## Access Control Matrix

```
                    PUBLIC  USER  ADMIN
trading_plans       SELECT  SELECT SELECT
user_profiles       -       OWN   ALL
user_investments    -       OWN   ALL
transactions        -       OWN   ALL
withdrawal_requests -       OWN   ALL
notifications       -       OWN   ALL
two_factor_auth     -       OWN   ALL
security_logs       -       OWN   ALL
kyc_documents       -       OWN   ALL
compliance_agreements -     OWN   ALL
investment_returns  -       OWN   ALL (Phase 2)
admin_actions_log   -       -     ALL (Phase 2)
platform_settings   SELECT  SELECT WRITE (Phase 2)
email_logs          -       OWN   ALL (Phase 2)
user_devices        -       CRUD  ALL (Phase 3)
payment_methods     -       CRUD  ALL (Phase 3)
referral_rewards    -       OWN   ALL (Phase 3)
support_tickets     -       CRUD  ALL (Phase 3)
user_blacklist      -       -     ALL (Phase 4)
api_keys            -       CRUD  ALL (Phase 4)

KEY:
PUBLIC = Anyone
SELECT = Read only
OWN = User can only see/edit their own
CRUD = Create/Read/Update/Delete own
ALL = Can access all records
- = No access
```

---

## Cardinality Rules

```
user_profiles
├─ id (PK, UUID)
├─ 1:∞ user_investments
├─ 1:∞ transactions
├─ 1:∞ withdrawal_requests
├─ 1:∞ notifications
├─ 1:∞ two_factor_auth [UNIQUE - one per user]
├─ 0:∞ invest_returns [via investments]
└─ 0:∞ referral_rewards [as referrer]

trading_plans
├─ id (PK, UUID)
├─ 1:∞ user_investments
└─ 1:∞ investment_returns [via investments]

user_investments
├─ id (PK, UUID)
├─ ∞:1 user_profiles (FK)
├─ ∞:1 trading_plans (FK)
├─ 1:∞ investment_returns
└─ 1:∞ transactions

transactions
├─ id (PK, UUID)
├─ type IN ('deposit', 'withdrawal', 'return', 'referral')
├─ status IN ('pending', 'completed', 'failed')
└─ ∞:1 user_profiles (FK)

withdrawal_requests
├─ id (PK, UUID)
├─ status IN ('pending', 'approved', 'rejected', 'completed')
└─ ∞:1 user_profiles (FK)
```

---

## Key Insights

### Strengths ✅
- Clean hierarchy (users → investments → returns)
- Proper normalization avoiding data duplication
- Foreign key constraints maintain referential integrity
- RLS removes need for app-level access control
- Real-time subscriptions reduce polling

### Current Limitations ⚠️
- No audit trail (add Phase 1)
- No security tracking (add Phase 1)
- No compliance enforcement (add Phase 1)
- Returns calculated ad-hoc (add Phase 2)
- No platform configuration (add Phase 2)

### Growth Opportunities 📈
- Device tracking (security)
- Payment methods (UX)
- Referral tracking (marketing)
- Support system (service)
- API access (partnerships)

---

*Diagram Generated: February 15, 2026*
