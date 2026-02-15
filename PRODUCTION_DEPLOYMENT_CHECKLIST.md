# Production Deployment Checklist

## Firebase Migration Complete ✓
- [x] Removed `firebase-setup-guide.tsx` component
- [x] No Firebase code references remain in source code
- [x] Removed unused Firebase files and imports

## Build Configuration ✓
- [x] Updated `next.config.mjs` for production:
  - Enabled TypeScript and ESLint type checking
  - Removed unoptimized image settings
  - Added compression and quality standards
  - Disabled identifying header for security

## Environment Setup
- [ ] Create `.env.local` from `.env.local.example`
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` with your Supabase project URL
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase anonymous key
- [ ] (Optional) Set `SUPABASE_SERVICE_ROLE_KEY` for server-side operations

## Supabase Production Setup
- [ ] Create Supabase project at supabase.com
- [ ] Configure authentication settings in Supabase dashboard
- [ ] Run all SQL migrations from `SUPABASE_SETUP.md`
- [ ] Enable Row Level Security (RLS) on all tables
- [ ] Configure email templates for password resets
- [ ] Set up CORS settings if using custom domains

## Code Quality
- [ ] Run `npm run build` to verify TypeScript compilation
- [ ] Run `npm run lint` to check code quality
- [ ] Fix any TypeScript or ESLint errors
- [ ] Test all authentication flows in staging

## Security Checklist
- [ ] Remove `.env.local` from git (already in `.gitignore`)
- [ ] Enable HTTPS on production domain
- [ ] Set secure cookies in Supabase auth settings
- [ ] Configure proper CORS headers for API calls
- [ ] Review sensitive data handling in dashboard components
- [ ] Verify no API keys are exposed in client-side code
- [ ] Check that role-based access control (RBAC) is enforced

## Database & Storage
- [ ] Verify all Supabase tables exist and have RLS enabled
- [ ] Test file upload/download to storage buckets
- [ ] Confirm user_profiles table is created with proper constraints
- [ ] Verify real-time subscriptions work correctly

## Admin Features
- [ ] First admin user must be created manually in Supabase (set role='admin')
- [ ] Test admin dashboard for managing users and withdrawals
- [ ] Implement withdrawal approval workflow in admin section
- [ ] Set up email notifications for admin actions

## Deployment
- [ ] Deploy to Vercel or your hosting platform
- [ ] Set environment variables in hosting platform dashboard
- [ ] Run production build locally: `npm run build && npm run start`
- [ ] Test all features in production environment
- [ ] Set up monitoring and error tracking
- [ ] Configure automatic backups for Supabase

## Performance
- [ ] Enable image optimization (configured in next.config.mjs)
- [ ] Test page load performance with Lighthouse
- [ ] Verify real-time subscriptions don't cause memory leaks
- [ ] Monitor API response times
- [ ] Set up CDN caching for static assets

## Monitoring & Analytics
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Enable Supabase analytics
- [ ] Configure logging for admin actions
- [ ] Set up monitoring alerts for critical errors

## Post-Deployment
- [ ] Monitor error logs for the first 24 hours
- [ ] Verify all email notifications are sending
- [ ] Test payment/withdrawal functionality
- [ ] Document any production issues and resolutions
