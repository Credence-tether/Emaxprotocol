# Database Schema Quick Reference

## Current Tables (7 - Ready for Production) ✅

| Table | Purpose | Status |
|-------|---------|--------|
| `trading_plans` | Investment packages | ✅ Production Ready |
| `user_profiles` | User accounts & profiles | ✅ Production Ready |
| `user_investments` | User investment positions | ✅ Production Ready |
| `transactions` | Financial transaction log | ✅ Production Ready |
| `withdrawal_requests` | Withdrawal management | ✅ Production Ready |
| `notifications` | User notifications | ✅ Production Ready |
| `storage buckets` | File uploads (3 buckets) | ✅ Production Ready |

---

## Recommended Additional Tables

### Phase 1️⃣: CRITICAL (Must Have Before Production Launch)

| Table | Fields | Why | Complexity |
|-------|--------|-----|-----------|
| `two_factor_auth` | user_id, secret, backup_codes | Security requirement | 🟢 Low |
| `security_logs` | user_id, action, ip_address | Compliance & fraud detection | 🟢 Low |
| `kyc_documents` | user_id, document_type, verification_status | Regulatory requirement | 🟡 Medium |
| `compliance_agreements` | user_id, agreement_type, agreed_at | Legal protection | 🟢 Low |

### Phase 2️⃣: HIGH (First 30 Days)

| Table | Fields | Why | Complexity |
|-------|--------|-----|-----------|
| `investment_returns` | investment_id, return_amount, status | Track earnings | 🟡 Medium |
| `admin_actions_log` | admin_id, action_type, target_user_id | Audit trail | 🟢 Low |
| `platform_settings` | setting_key, setting_value | Config without code changes | 🟢 Low |
| `email_logs` | recipient_email, email_type, status | Debug & compliance | 🟢 Low |

### Phase 3️⃣: RECOMMENDED (Growth Phase)

| Table | Fields | Why | Complexity |
|-------|--------|-----|-----------|
| `user_devices` | user_id, device_name, ip_address | Suspicious activity detection | 🟡 Medium |
| `payment_methods` | user_id, type, wallet_address | Multiple payment options | 🟡 Medium |
| `referral_rewards` | referrer_id, reward_amount, status | Referral program | 🟡 Medium |
| `support_tickets` | user_id, title, status | Customer support | 🟡 Medium |

### Phase 4️⃣: OPTIONAL (Future)

| Table | Fields | Why | Complexity |
|-------|--------|-----|-----------|
| `user_blacklist` | user_id, reason, status | Block fraudulent users | 🟢 Low |
| `api_keys` | user_id, key_hash, permissions | Partner integrations | 🟡 Medium |

---

## Implementation Checklist

### Before Production ⚠️
- [ ] Create Phase 1 tables (2-3 hours)
- [ ] Add RLS policies (included in SQL)
- [ ] Update TypeScript types in `lib/supabase.ts`
- [ ] Test 2FA flow
- [ ] Verify compliance agreement capture

### Month 1 🎯
- [ ] Create Phase 2 tables (2-3 hours)
- [ ] Implement investment returns calculator
- [ ] Set up daily return distribution job
- [ ] Admin audit logging middleware

### Growth Phase 📈
- [ ] Create Phase 3 tables as needed
- [ ] Implement referral rewards system
- [ ] Build support ticket UI
- [ ] Device management dashboard

### Future 🚀
- [ ] Phase 4 tables for API and partnerships

---

## Quick Start: Add Phase 1 Tables

### Step 1: Copy SQL (5 minutes)
1. Open [ADDITIONAL_SCHEMA.sql](ADDITIONAL_SCHEMA.sql)
2. Copy "PHASE 1" section

### Step 2: Run in Supabase (5 minutes)
1. Login to Supabase dashboard
2. Open SQL Editor
3. Paste SQL
4. Click "Run"

### Step 3: Update TypeScript (10 minutes)
Update [lib/supabase.ts](lib/supabase.ts) with new table types

### Step 4: Test (5 minutes)
- Verify tables exist: `SELECT * FROM pg_tables WHERE schemaname='public'`
- Confirm RLS: `SELECT * FROM pg_policies`

**Total Time: ~25 minutes**

---

## Schema Size Estimate

| Phase | Tables | Avg Indexes | RLS Policies | Complexity |
|-------|--------|-------------|-------------|-----------|
| Current | 7 | 2 each | 12 total | Moderate |
| +Phase 1 | 11 | 3 each | 20 total | Moderate |
| +Phase 2 | 15 | 3 each | 28 total | High |
| +Phase 3 | 20 | 3 each | 35 total | Very High |

Current database size: ~50MB (typical usage)  
Recommended: 1GB Supabase plan ($25/mo)

---

## TypeScript Types Gap ⚠️

**Current Issue** 🔴
The types defined in `lib/supabase.ts` don't include all tables:
- Missing: `trading_plans`, `withdrawal_requests`, `notifications`
- Incomplete: Need to add all Phase 1-4 tables

**How to Fix** 
Use Supabase CLI to auto-generate types:
```bash
supabase gen types typescript --local > lib/database.types.ts
```

Then import and use for full type safety.

---

## Important Notes

### Data Privacy 🔒
- All tables have RLS enabled
- Users can only access their own data
- Admins can access data for oversight
- Sensitive data encrypted at rest

### Performance 📊
- Indexes created on frequently queried columns
- RLS optimized with indexed conditions
- Real-time subscriptions on key tables only

### Compliance 📋
- Audit logs for all admin actions
- User agreement versioning
- Document verification tracking
- Email logs for PII access

---

## Production Deployment

### Before Going Live ✅
- [ ] Phase 1 tables created
- [ ] RLS policies tested
- [ ] TypeScript types updated
- [ ] Backup configured
- [ ] Monitoring enabled

### Gradual Rollout 🚀
1. Deploy Phase 1 tables
2. Monitor for 48 hours
3. Deploy Phase 2 tables
4. Add UI for new features gradually
5. Monitor performance impact

### Rollback Plan 🔄
If issues occur:
1. Disable new features in UI
2. Keep tables but don't populate
3. Revert to Phase 0 schema if critical
4. Database backups available hourly

---

## Resources

- **Full Schema Analysis**: [SCHEMA_ANALYSIS.md](SCHEMA_ANALYSIS.md)
- **SQL Implementation**: [ADDITIONAL_SCHEMA.sql](ADDITIONAL_SCHEMA.sql)
- **Current Setup**: [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
- **Supabase Docs**: https://supabase.com/docs

---

## Questions?

- Need clarification on a table? → Check [SCHEMA_ANALYSIS.md](SCHEMA_ANALYSIS.md)
- Need SQL details? → Check [ADDITIONAL_SCHEMA.sql](ADDITIONAL_SCHEMA.sql)
- Need setup help? → Check [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

