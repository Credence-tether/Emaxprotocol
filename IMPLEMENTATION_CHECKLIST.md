#!/usr/bin/env env
# ============================================================================
# SCHEMA IMPLEMENTATION CHECKLIST - Step by Step
# ============================================================================
# Use this checklist to implement the database schema additions
# Estimated time: 25-30 hours for complete implementation
# ============================================================================

## PHASE 1: CRITICAL (Must have before production) - 5 hours

### Step 1: Backup Current Database (30 min)
- [ ] Open Supabase dashboard
- [ ] Go to Settings → Backups
- [ ] Create manual backup (take 5 minutes)
- [ ] Note backup ID/name for reference
- **Estimated**: 30 min

### Step 2: Create Phase 1 Tables (30 min)
- [ ] Open [ADDITIONAL_SCHEMA.sql](ADDITIONAL_SCHEMA.sql)
- [ ] Copy "PHASE 1: CRITICAL TABLES" section
- [ ] Paste into Supabase SQL Editor (Dashboard → SQL Editor)
- [ ] Review SQL before executing
- [ ] Click "Run" button
- [ ] Verify "Success" message appears
- **Estimated**: 30 min

### Step 3: Verify Phase 1 Installation (15 min)
- [ ] Run verification query:
  ```sql
  SELECT tablename FROM pg_tables 
  WHERE schemaname = 'public' 
  AND tablename IN ('two_factor_auth', 'security_logs', 'kyc_documents', 'compliance_agreements')
  ORDER BY tablename;
  ```
- [ ] All 4 tables should appear in results
- [ ] Check RLS is enabled:
  ```sql
  SELECT tablename, count(*) as policy_count
  FROM pg_policies
  WHERE schemaname = 'public'
  AND tablename IN ('two_factor_auth', 'security_logs', 'kyc_documents', 'compliance_agreements')
  GROUP BY tablename;
  ```
- **Estimated**: 15 min

### Step 4: Update TypeScript Types (1 hour)
- [ ] Open [lib/supabase.ts](lib/supabase.ts)
- [ ] Backup current file (copy content)
- [ ] Replace `Database` type with complete type from [TYPESCRIPT_TYPES.ts](TYPESCRIPT_TYPES.ts)
- [ ] Include at least all Phase 1 tables
- [ ] Save file
- [ ] Check for TypeScript errors in editor
- [ ] Run `npm run lint` to verify
- **Estimated**: 60 min

### Step 5: Test Phase 1 Features (1 hour)
- [ ] Restart dev server: `npm run dev`
- [ ] Test 2FA table:
  ```typescript
  const { data } = await supabase
    .from('two_factor_auth')
    .select('*')
    .limit(1)
  console.log('2FA table access:', data)
  ```
- [ ] Test security logs:
  ```typescript
  const { data } = await supabase
    .from('security_logs')
    .select('count(*)')
  ```
- [ ] Test KYC documents:
  ```typescript
  const { data } = await supabase
    .from('kyc_documents')
    .select('*')
    .limit(1)
  ```
- [ ] Test compliance agreements:
  ```typescript
  const { data } = await supabase
    .from('compliance_agreements')
    .select('*')
    .limit(1)
  ```
- [ ] All queries should return successfully
- **Estimated**: 60 min

---

## PHASE 2: HIGH PRIORITY (First 30 days) - 7 hours

### Step 6: Create Phase 2 Tables (30 min)
- [ ] Open [ADDITIONAL_SCHEMA.sql](ADDITIONAL_SCHEMA.sql)
- [ ] Copy "PHASE 2: HIGH PRIORITY TABLES" section
- [ ] Paste into Supabase SQL Editor
- [ ] Execute similar to Phase 1
- [ ] Verify tables created successfully
- **Estimated**: 30 min

### Step 7: Add Phase 2 Types (1 hour)
- [ ] Update [lib/supabase.ts](lib/supabase.ts) with Phase 2 table types
- [ ] Copy from [TYPESCRIPT_TYPES.ts](TYPESCRIPT_TYPES.ts):
  - investment_returns
  - admin_actions_log
  - platform_settings
  - email_logs
- [ ] Save and verify no TypeScript errors
- [ ] Run `npm run lint`
- **Estimated**: 60 min

### Step 8: Implement Returns Calculation (3 hours)
- [ ] Create [lib/investment-returns.ts](lib/investment-returns.ts)
- [ ] Implement daily return calculator:
  ```typescript
  export async function calculateAndDistributeReturns() {
    // Get all active investments
    // Calculate daily returns based on plan percentage
    // Insert into investment_returns table
    // Update user_profiles total_earnings
    // Create transaction records
  }
  ```
- [ ] Create scheduled job (Supabase Edge Functions or external cron)
- [ ] Test with sample data
- **Estimated**: 180 min

### Step 9: Implement Admin Action Logging (1.5 hours)
- [ ] Create [lib/audit-logger.ts](lib/audit-logger.ts)
- [ ] Middleware to log admin actions:
  ```typescript
  export async function logAdminAction(
    adminId: string,
    actionType: string,
    targetUserId?: string,
    changesMade?: Record<string, any>
  ) {
    // Insert into admin_actions_log table
  }
  ```
- [ ] Integrate into admin dashboard pages
- [ ] Test with sample admin actions
- **Estimated**: 90 min

### Step 10: Implement Platform Settings (1 hour)
- [ ] Create settings management page
- [ ] Display current settings
- [ ] Allow admin to update settings
- [ ] Create utility function to read settings:
  ```typescript
  export async function getSetting(key: string) {
    // Fetch from platform_settings table
  }
  ```
- **Estimated**: 60 min

---

## PHASE 3: RECOMMENDED (Growth phase) - Optional

### Step 11: Create Phase 3 Tables (30 min)
- [ ] When ready to implement device tracking:
  - [ ] Copy Phase 3 section from [ADDITIONAL_SCHEMA.sql](ADDITIONAL_SCHEMA.sql)
  - [ ] Execute in Supabase
  - [ ] Update TypeScript types
  
- [ ] When adding payment methods:
  - Same process as above
  
- [ ] When launching referral program:
  - Same process as above

### Step 12: Create Phase 4 Tables (Optional)
- [ ] For API access: Copy Phase 4 section
- [ ] For user blacklist: Same process

---

## TESTING & DEPLOYMENT - 3 hours each phase

### Pre-Staging Testing (For each phase)
- [ ] Unit test new TypeScript types
- [ ] Integration test database queries
- [ ] Test RLS policies with different users
- [ ] Test with admin account
- [ ] Test error handling

### Staging Deployment (For each phase)
- [ ] Deploy to staging environment
- [ ] Run full test suite
- [ ] Test all related features
- [ ] Verify no performance degradation
- [ ] Get stakeholder approval

### Production Deployment (For each phase)
- [ ] Create pre-deployment backup
- [ ] Deploy during low-traffic period
- [ ] Monitor error logs
- [ ] Verify users can still transact normally
- [ ] Group deploy with other changes if possible

---

## VALIDATION CHECKLIST

### After Phase 1 ✅
- [ ] All 4 new tables exist in database
- [ ] TypeScript types compile without errors
- [ ] RLS policies work correctly
- [ ] Can insert/read test data from each table
- [ ] Security logs capture user actions
- [ ] KYC document upload flow works
- [ ] Compliance agreement capture works
- [ ] 2FA structure exists (ready for UI)

### After Phase 2 ✅
- [ ] All 4 new tables exist and have data
- [ ] Investment returns calculated daily
- [ ] Admin actions logged and visible
- [ ] Platform settings readable and updatable
- [ ] Email logs recording correctly
- [ ] User earnings reflect returns
- [ ] Admin can view all logs

### After Phase 3 ✅
- [ ] Device tracking working
- [ ] Payment methods management functional
- [ ] Referral rewards calculated correctly
- [ ] Support tickets can be created/managed
- [ ] All new tables properly indexed
- [ ] No performance degradation

---

## ROLLBACK PLAN

If something goes wrong:

### Option 1: Rollback Single Table
- [ ] Delete new table: `DROP TABLE table_name CASCADE;`
- [ ] Revert TypeScript types
- [ ] Restart app

### Option 2: Rollback All Phase X
- [ ] Use Supabase backup from before Phase X
- [ ] Restore database
- [ ] Revert code changes

### Option 3: Keep Tables, Hide Features
- [ ] Disable UI components
- [ ] Keep tables for data
- [ ] Gradually enable features

**Note**: No data loss risk because new tables are empty additions

---

## TIME ESTIMATE

| Phase | Tasks | Estimated Time | Can be Parallel |
|-------|-------|-----------------|-----------------|
| 1 | Design + SQL + Types + Test | 5 hours | No - sequential |
| 2 | Design + SQL + Types + Logic | 7 hours | Yes - after Phase 1 |
| 3 | SQL + Types + UI | 6-8 hours | Yes - after Phase 2 |
| 4 | SQL + Types (Optional) | 2-3 hours | Yes - anytime |

**Total Sequential**: 25-30 hours over 3 weeks
**Ideal Timeline**: 1 week Phase 1, 1 week Phase 2, 1 week Phase 3

---

## SIGN-OFF CHECKLIST

### Development Team
- [ ] Phase implemented per specifications
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Documentation updated

### QA Team
- [ ] All features tested
- [ ] RLS verified
- [ ] Edge cases handled
- [ ] Performance acceptable

### Operations/DevOps
- [ ] Database backup verified
- [ ] Monitoring alerts set
- [ ] Runbook documented
- [ ] Rollback tested

### Product/Compliance
- [ ] Requirements met
- [ ] Legal reviewed
- [ ] Compliance verified
- [ ] User communication ready

---

## SUPPORT REFERENCES

If you get stuck:
- [SCHEMA_ANALYSIS.md](SCHEMA_ANALYSIS.md) - Detailed explanations
- [SCHEMA_QUICK_REFERENCE.md](SCHEMA_QUICK_REFERENCE.md) - Quick lookup
- [ADDITIONAL_SCHEMA.sql](ADDITIONAL_SCHEMA.sql) - All SQL
- [TYPESCRIPT_TYPES.ts](TYPESCRIPT_TYPES.ts) - All types
- Supabase Docs: https://supabase.com/docs

---

## CONTACT & HANDOFF

- **Database Owner**: [Your Team]
- **API Owner**: [Your Team]
- **Compliance**: [Your Team]
- **Support**: [Contact Info]

---

*Last Updated: February 15, 2026*
*Maintained by: [Engineering Team]*
