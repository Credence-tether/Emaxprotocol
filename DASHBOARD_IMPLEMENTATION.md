# Dashboard System Implementation

## Overview
Complete dashboard system with user and admin functionality for Emaxprotocol trading platform.

## What's Been Implemented

### 1. Database Schema Updates

#### User Profiles Table
```sql
-- Enhanced user profiles with role-based access control
user_profiles:
  - id (uuid)
  - full_name (text)
  - username (text)
  - role (text) - 'user' or 'admin'
  - total_balance (numeric)
  - total_invested (numeric)
  - total_earnings (numeric)
  - referral_code (text)
  - kyc_status (text) - 'pending', 'approved', 'rejected'
  - created_at (timestamp)
```

#### Withdrawal Requests Table
```sql
withdrawal_requests:
  - id (uuid)
  - user_id (uuid)
  - amount (numeric)
  - wallet_address (text)
  - status (text) - 'pending', 'approved', 'rejected', 'completed'
  - admin_notes (text)
  - created_at (timestamp)
  - updated_at (timestamp)
```

#### Notifications Table
```sql
notifications:
  - id (uuid)
  - user_id (uuid)
  - title (text)
  - message (text)
  - type (text) - 'info', 'success', 'warning', 'error'
  - is_read (boolean)
  - created_at (timestamp)
```

### 2. User Dashboard (`/dashboard`)

**Location**: `app/dashboard/page.tsx`

**Features**:
- **Profile Overview**
  - Welcome message with user's name
  - 4 stat cards: Total Balance, Total Invested, Total Earnings, Notifications count
  - KYC status alert with call-to-action
  
- **Referral System**
  - Display unique referral code
  - One-click copy functionality
  - Referral earnings tracking

- **Tabbed Interface**:
  - **My Investments Tab**: List of all active/completed investments with trading plan details, current value, profit/loss
  - **Transactions Tab**: Complete transaction history with type, amount, status, and timestamps
  - **Notifications Tab**: Notification center with type-based icons and read/unread status

- **Navigation**:
  - Settings link (prepared for future settings page)
  - Logout functionality
  - Back to home button

### 3. Admin Dashboard (`/admin/dashboard`)

**Location**: `app/admin/dashboard/page.tsx`

**Features**:
- **Admin-Only Access**: Automatically checks user role and redirects non-admins
- **System Statistics**: 4 overview cards showing total users, investments, deposits, pending withdrawals

- **Tabbed Management Interface**:

  **Withdrawals Tab**:
  - List all withdrawal requests
  - Filter by status (pending, approved, rejected, completed)
  - Review dialog for each pending request
  - Approve/reject with admin notes
  - Shows user info, amount, wallet address
  
  **Users Tab**:
  - Search users by name, username, or ID
  - View user balances and join dates
  - Promote/demote admin privileges
  - Approve/reject KYC requests
  - Role and KYC status badges
  
  **Investments Tab**:
  - System-wide investment overview
  - Shows user, plan, amount, status
  - Sortable and filterable
  
  **Transactions Tab**:
  - All system transactions
  - Type, amount, status display
  - Real-time updates

### 4. Reusable Dashboard Components

#### `components/stat-card.tsx`
- Reusable stat display component
- Supports icons, trends, custom styling
- Used in both user and admin dashboards

#### `components/investment-card.tsx`
- Rich investment display card
- Shows amount, current value, profit/loss
- Progress indicator toward profit target
- Plan details and status badges
- Optional user info display (for admin view)

#### `components/protected-route.tsx`
- HOC for route protection
- Checks authentication status
- Optional admin requirement check
- Automatic redirects for unauthorized access
- Loading state with spinner
- Error alerts

### 5. Navigation Updates

**Updated**: `components/header.tsx`

**Changes**:
- Dynamic authentication state checking
- Conditional navigation items based on login status
- **For Logged-In Users**:
  - Dashboard button (visible to all authenticated users)
  - Admin Panel button (only visible to admins)
  - Sign Out button
- **For Guests**:
  - Create Account button
  - Sign In button
- Real-time role checking
- Mobile-responsive menu

### 6. Helper Functions in `lib/supabase.ts`

**New Functions**:
```typescript
// Check if user is admin
export async function isAdmin(): Promise<boolean>

// Get current user's profile
export async function getUserProfile(userId: string)
```

**Database Types**:
```typescript
interface Database {
  user_profiles: {
    id: string
    role: 'user' | 'admin'
    total_balance: number
    total_invested: number
    total_earnings: number
    kyc_status: 'pending' | 'approved' | 'rejected'
    // ... other fields
  }
  withdrawal_requests: {
    id: string
    user_id: string
    amount: number
    status: 'pending' | 'approved' | 'rejected' | 'completed'
    admin_notes: string | null
    // ... other fields
  }
  notifications: {
    id: string
    user_id: string
    type: 'info' | 'success' | 'warning' | 'error'
    is_read: boolean
    // ... other fields
  }
}
```

## Usage Examples

### User Dashboard Access
```typescript
// User navigates to /dashboard
// Automatically loads their profile, investments, transactions
// Shows KYC status and referral code
// Real-time data updates
```

### Admin Dashboard Access
```typescript
// Admin navigates to /admin/dashboard
// Checks admin privileges (isAdmin() returns true)
// Loads all system data
// Can manage users, approve withdrawals, view all investments
```

### Protecting Routes
```tsx
// Wrap any page with ProtectedRoute
import { ProtectedRoute } from '@/components/protected-route'

export default function MyPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      {/* Admin-only content */}
    </ProtectedRoute>
  )
}
```

### Checking User Role in Components
```typescript
import { isAdmin } from '@/lib/supabase'

const MyComponent = () => {
  const [adminStatus, setAdminStatus] = useState(false)
  
  useEffect(() => {
    const checkRole = async () => {
      const isUserAdmin = await isAdmin()
      setAdminStatus(isUserAdmin)
    }
    checkRole()
  }, [])
  
  return adminStatus ? <AdminView /> : <UserView />
}
```

## Security Features

### Row Level Security (RLS) Policies
- Users can only view/edit their own data
- Admins have read access to all data
- Withdrawal requests require admin approval
- KYC status changes restricted to admins

### Authentication Checks
- All dashboard routes verify user authentication
- Admin routes double-check role = 'admin'
- Automatic redirects for unauthorized access
- Session-based auth with Supabase

### Data Validation
- Amount validations on withdrawals
- Status transitions controlled
- Admin notes required for rejections
- Timestamps automatically managed

## Next Steps & Future Enhancements

### Recommended Additions
1. **Settings Page** (`/settings`)
   - Profile editing
   - Password change
   - 2FA setup
   - Notification preferences

2. **Advanced Admin Features**
   - User activity logs
   - System analytics dashboard
   - Bulk user operations
   - Export data to CSV

3. **Real-Time Features**
   - Live price updates on dashboard
   - Real-time notifications
   - WebSocket connections for instant updates
   - Trading alerts

4. **Enhanced Withdrawal System**
   - Automated crypto transfers
   - Transaction hash tracking
   - Multi-signature approvals
   - Batch processing

5. **Reporting**
   - Monthly statements
   - Tax reports
   - Investment performance analytics
   - ROI calculators

## File Structure

```
app/
  dashboard/
    page.tsx              # User dashboard
  admin/
    dashboard/
      page.tsx            # Admin dashboard

components/
  stat-card.tsx           # Reusable stat display
  investment-card.tsx     # Investment display card
  protected-route.tsx     # Route protection HOC
  header.tsx              # Updated with auth state

lib/
  supabase.ts             # Enhanced with admin helpers
```

## Environment Variables Required

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Setup Instructions

1. **Run SQL from SUPABASE_SETUP.md** in your Supabase SQL editor
2. **Set environment variables** in `.env.local`
3. **Create first admin user**: Manually set `role = 'admin'` in user_profiles table
4. **Test user flow**: Sign up → View dashboard → Check investments
5. **Test admin flow**: Log in as admin → Access admin panel → Manage users/withdrawals

## Testing Checklist

- [ ] User can sign up and access dashboard
- [ ] User can view their investments and transactions
- [ ] User can copy referral code
- [ ] Admin can access admin dashboard
- [ ] Admin can approve/reject withdrawals
- [ ] Admin can manage user roles
- [ ] Admin can approve KYC requests
- [ ] Navigation shows correct buttons based on auth state
- [ ] Non-admin cannot access `/admin/dashboard`
- [ ] Logged-out users redirected to login
- [ ] Real-time data updates work
- [ ] Mobile responsive layout works

## Support

For issues or questions:
1. Check SUPABASE_SETUP.md for database configuration
2. Verify environment variables are set correctly
3. Check browser console for errors
4. Review RLS policies in Supabase dashboard
5. Ensure user has correct role in user_profiles table
