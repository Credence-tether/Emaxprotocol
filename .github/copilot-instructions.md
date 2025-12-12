# Copilot Instructions for Emaxprotocol

## Project Overview

Emaxprotocol is a Next.js 15 cryptocurrency trading platform built with TypeScript, featuring automated trading solutions, market data visualization, and Supabase backend integration. The project is auto-synced from v0.dev and deployed on Vercel.

## Architecture & Stack

- **Framework**: Next.js 15 with App Router (`app/` directory)
- **Language**: TypeScript (strict mode enabled, `@/` path alias for root imports)
- **Styling**: Tailwind CSS with CSS variables for theming (`hsl(var(--primary))` pattern)
- **UI Components**: shadcn/ui (Radix UI + CVA) in `components/ui/`
- **Package Manager**: npm (use `--legacy-peer-deps` flag for installations)
- **Backend**: Supabase (authentication, database, real-time subscriptions)
- **Icons**: Lucide React

## Critical Conventions

### Component Patterns

**Client vs Server Components**:
- Pages in `app/**/page.tsx` are server components by default
- Add `"use client"` directive for:
  - Components using React hooks (`useState`, `useEffect`, etc.)
  - Event handlers and interactivity
  - Browser APIs
- Examples: [components/header.tsx](components/header.tsx), [components/cookie-consent.tsx](components/cookie-consent.tsx)

**UI Components Structure**:
- All UI primitives live in `components/ui/` using CVA variants pattern
- See [components/ui/button.tsx](components/ui/button.tsx) for the canonical pattern:
  - Use `cva()` for variant definitions
  - Export `buttonVariants` and component
  - Accept `asChild` prop with `Slot` for composition
  - Use `cn()` utility for className merging

**Styling with cn()**:
- Always use `cn()` from `@/lib/utils` for conditional classes
- Pattern: `cn("base-classes", variantClasses, className)`
- Tailwind with CSS variables: `bg-primary` resolves to `hsl(var(--primary))`

### Layout & Routing

**Page Structure**:
- Every page imports shared layout components:
  ```tsx
  // In app/layout.tsx (applied globally)
  <Header /> -> <main>{children}</main> -> <Footer />
  <CookieConsent /> <ChatWidget /> (global overlays)
  ```
- Homepage ([app/page.tsx](app/page.tsx)) uses section-based components: `Hero`, `Features`, `TradingPlansPreview`, `LiveCryptoMarket`, etc.

**Navigation Links**:
- Use Next.js `<Link>` from `next/link` for internal navigation
- Public routes: `/about`, `/trading`, `/trading-plans`, `/markets`, `/affiliate`, `/login`, `/signup`, `/contact`, `/faq`
- Protected routes: `/dashboard` (user), `/admin/dashboard` (admin only)
- Header navigation is dynamic based on authentication state (see [components/header.tsx](components/header.tsx))

### Supabase Backend Integration

**Graceful Degradation**:
- Supabase config is optional; app shows setup guide if env vars missing ([lib/supabase.ts](lib/supabase.ts))
- Wrap auth-required pages with `<AuthWrapper>` component ([components/auth-wrapper.tsx](components/auth-wrapper.tsx))
- Check `isSupabaseConfigured()` before using `supabase` client
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Authentication Pattern**:
- See [app/login/page.tsx](app/login/page.tsx) and [app/signup/page.tsx](app/signup/page.tsx) for auth flows
- Always wrap auth pages in `<AuthWrapper>` to show setup guide if unconfigured
- Use helper functions: `signUp()`, `signIn()`, `signOut()`, `getCurrentUser()`, `isAdmin()` from [lib/supabase.ts](lib/supabase.ts)
- Handle errors with user-friendly messages in `<Alert>` components
- Auth responses include `{ data, error }` structure
- Use `<ProtectedRoute>` component to protect authenticated pages (see [components/protected-route.tsx](components/protected-route.tsx))
- Set `requireAdmin={true}` prop for admin-only routes

**Database Structure**:
- Database types defined in [lib/supabase.ts](lib/supabase.ts) with TypeScript interfaces
- Core tables: `trading_plans`, `user_investments`, `transactions`, `user_profiles`, `withdrawal_requests`, `notifications`
- **user_profiles**: Stores user info, balances, role ('user' or 'admin'), KYC status, referral codes
- **withdrawal_requests**: Manages withdrawal requests with admin approval workflow
- **notifications**: User notifications with type and read status
- Use typed Supabase client for type-safe database queries
- Example: `supabase.from('trading_plans').select('*')`
- Row Level Security (RLS) enabled on all tables

**Real-time Subscriptions**:
- All tables have real-time enabled for live updates
- Use `subscribeToTable()` helper to listen to database changes
- Example: `subscribeToTable('transactions', callback, 'user_id=eq.${userId}')`
- Always clean up subscriptions with `unsubscribe(channel)` in component cleanup
- See [components/realtime-transactions-dashboard.tsx](components/realtime-transactions-dashboard.tsx) for example

**File Storage**:
- Three storage buckets: `user-documents` (private), `avatars` (public), `receipts` (private)
- Helper functions: `uploadFile()`, `downloadFile()`, `deleteFile()`, `listFiles()`, `getFileUrl()`
- Files organized by user ID: `${userId}/filename`
- See [components/file-storage-manager.tsx](components/file-storage-manager.tsx) for complete example
- Row Level Security ensures users can only access their own files

### Data Fetching

**Cryptocurrency Prices**:
- Custom hook: `useCryptoPrices()` from [hooks/use-crypto-prices.ts](hooks/use-crypto-prices.ts)
- Returns simulated live prices with realistic 2025 values (Bitcoin ~$98k, Ethereum ~$3.9k)
- Auto-updates with small random fluctuations to simulate market movement
- Pattern: `const { data, loading, error, lastUpdated } = useCryptoPrices()`

## Development Workflow

**Commands**:
- Dev server: `pnpm dev` (not `npm run dev`)
- Build: `pnpm build`
- Lint: `pnpm lint` (disabled during builds via `next.config.mjs`)
- Start prod: `pnpm start`

**Build Configuration**:
- TypeScript and ESLint errors are ignored during builds (`ignoreBuildErrors: true`)
- Images are unoptimized (`unoptimized: true`)
- This is intentional for rapid v0.dev iteration; don't remove without discussion

**Path Aliases**:
- `@/components` -> `components/`
- `@/lib` -> `lib/`
- `@/hooks` -> `hooks/`
- `@/app` -> `app/`
- Always use absolute `@/` imports, never relative paths

## Dashboard System

**User Dashboard** ([app/dashboard/page.tsx](app/dashboard/page.tsx)):
- Protected route - requires authentication
- Displays user profile, balances, investments, transactions, notifications
- Features: KYC status alert, referral code management, tabbed interface
- Real-time data loading from Supabase
- Components: `<StatCard>`, `<InvestmentCard>`

**Admin Dashboard** ([app/admin/dashboard/page.tsx](app/admin/dashboard/page.tsx)):
- Protected route - requires admin role
- System statistics: total users, investments, deposits, pending withdrawals
- Tabbed management: Withdrawals (approve/reject), Users (role/KYC management), Investments, Transactions
- Full CRUD operations for admin tasks
- Automatic role verification and redirect for non-admins

**Route Protection**:
- Use `<ProtectedRoute>` component for authenticated pages
- Set `requireAdmin={true}` for admin-only pages
- Example: `<ProtectedRoute requireAdmin={true}>{children}</ProtectedRoute>`
- See [components/protected-route.tsx](components/protected-route.tsx)

**Reusable Dashboard Components**:
- `<StatCard>`: Display metrics with icons and trends ([components/stat-card.tsx](components/stat-card.tsx))
- `<InvestmentCard>`: Rich investment display with progress ([components/investment-card.tsx](components/investment-card.tsx))

## Adding New Features

**New Pages**:
1. Create `app/page-name/page.tsx`
2. Add link to [components/header.tsx](components/header.tsx) navigation
3. Use server components unless interactivity needed
4. For protected pages, wrap with `<ProtectedRoute>`
5. Import and render section components from `components/`

**New Dashboard Features**:
1. Check user role with `isAdmin()` if role-specific
2. Use Supabase client for data fetching
3. Implement real-time subscriptions if needed with `subscribeToTable()`
4. Follow existing dashboard patterns for consistency
5. Use reusable components (`<StatCard>`, `<InvestmentCard>`) where applicable

**New UI Components**:
1. Add to `components/ui/` following shadcn/ui patterns
2. Use `cva` for variants, export both variants and component
3. Support `className` prop with `cn()` for extensibility
4. Reference [components/ui/button.tsx](components/ui/button.tsx) as template

**New Sections**:
1. Create component in `components/` (e.g., `components/new-feature.tsx`)
2. Add `"use client"` if hooks or interactivity needed
3. Import and compose in page files
4. Follow responsive design with Tailwind breakpoints (`md:`, `lg:`)

## Gotchas & Known Issues

- Supabase setup is optional but auth pages require `<AuthWrapper>`
- Dashboard pages require Supabase to be configured (check with `isSupabaseConfigured()`)
- Always check if component needs `"use client"` before adding hooks
- Admin routes must verify role with `isAdmin()` before showing content
- First admin user must be created manually in Supabase (set role='admin' in user_profiles)
- Don't modify `next.config.mjs` build error ignoring without team discussion
- Use npm with `--legacy-peer-deps` for package installations (peer dependency conflicts)
- CSS variables pattern: use `bg-primary` not direct HSL values
- v0.dev auto-pushes changes; coordinate manual edits to avoid conflicts
- Legacy Firebase files exist but are deprecated - use Supabase instead
- RLS policies prevent users from accessing other users' data - always filter by user_id
