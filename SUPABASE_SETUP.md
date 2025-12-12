# Supabase Setup Guide for Emaxprotocol

This project uses Supabase as the backend for authentication, database, and real-time features.

## Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Name: `emaxprotocol` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to your users
   - Pricing Plan: Free tier is sufficient for development

### 2. Get Your API Credentials

1. In your Supabase dashboard, go to **Settings → API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public key** (starts with `eyJ...`)

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Set Up Database Schema

Run these SQL commands in your Supabase SQL Editor (Dashboard → SQL Editor):

```sql
-- Create trading_plans table
CREATE TABLE trading_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  min_deposit DECIMAL(10,2) NOT NULL,
  max_deposit DECIMAL(10,2) NOT NULL,
  daily_return DECIMAL(5,2) NOT NULL,
  duration_days INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_investments table
CREATE TABLE user_investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES trading_plans(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('deposit', 'withdrawal', 'return', 'referral')) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE trading_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for trading_plans (public read)
CREATE POLICY "Anyone can view trading plans"
  ON trading_plans FOR SELECT
  USING (true);

-- Create policies for user_investments (users can only see their own)
CREATE POLICY "Users can view their own investments"
  ON user_investments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own investments"
  ON user_investments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for transactions (users can only see their own)
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert sample trading plans
INSERT INTO trading_plans (name, min_deposit, max_deposit, daily_return, duration_days) VALUES
  ('Starter Plan', 100, 999, 2.5, 30),
  ('Professional Plan', 1000, 4999, 3.5, 60),
  ('Premium Plan', 5000, 9999, 4.5, 90),
  ('VIP Plan', 10000, 999999, 5.5, 180);

-- Create user_profiles table for additional user data
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('user', 'admin')) DEFAULT 'user',
  total_balance DECIMAL(10,2) DEFAULT 0.00,
  total_invested DECIMAL(10,2) DEFAULT 0.00,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES auth.users(id),
  kyc_status TEXT CHECK (kyc_status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create withdrawal_requests table
CREATE TABLE withdrawal_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  wallet_address TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'completed')) DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON user_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for withdrawal_requests
CREATE POLICY "Users can view their own withdrawal requests"
  ON withdrawal_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawal requests"
  ON withdrawal_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all withdrawal requests"
  ON withdrawal_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update withdrawal requests"
  ON withdrawal_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, username, referral_code)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'fullName',
    NEW.raw_user_meta_data->>'username',
    SUBSTRING(MD5(NEW.id::TEXT) FROM 1 FOR 8)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Realtime for tables (for live updates)
ALTER PUBLICATION supabase_realtime ADD TABLE trading_plans;
ALTER PUBLICATION supabase_realtime ADD TABLE user_investments;
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE user_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE withdrawal_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
```

### 5. Set Up Storage for File Uploads

Run these commands in your Supabase SQL Editor to create storage buckets:

```sql
-- Create storage bucket for user documents (KYC, ID verification, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-documents', 'user-documents', false);

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Create storage bucket for transaction receipts
INSERT INTO storage.buckets (id, name, public)
VALUES ('receipts', 'receipts', false);

-- Storage policies for user-documents (users can only access their own files)
CREATE POLICY "Users can upload their own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'user-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'user-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own documents"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'user-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'user-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for avatars (public read, owner write)
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for receipts (users can only access their own)
CREATE POLICY "Users can upload receipts"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'receipts' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own receipts"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'receipts' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

### 6. Enable Realtime in Dashboard

1. Go to **Database → Replication** in your Supabase dashboard
2. Verify that the tables `trading_plans`, `user_investments`, and `transactions` are enabled for replication
3. These tables will now broadcast real-time updates to subscribed clients

### 7. Configure Authentication

1. In Supabase Dashboard, go to **Authentication → Providers**
2. Enable **Email** provider (enabled by default)
3. Optional: Configure other providers (Google, GitHub, etc.)

### 8. Configure Email Templates

Supabase sends automated emails for authentication. Here's how to customize them:

#### Access Email Templates

1. Go to **Authentication → Email Templates** in your Supabase dashboard
2. You'll see templates for:
   - **Confirm Signup** - Sent when users create an account
   - **Magic Link** - For passwordless login
   - **Change Email Address** - When users update their email
   - **Reset Password** - For password recovery

#### Customize Templates

Each template has these editable fields:

**1. Confirm Signup Email**
- Sent to verify new user email addresses
- Contains a confirmation link that expires in 24 hours
- Default subject: "Confirm Your Signup"

**Recommended customization:**
```
Subject: Welcome to Emaxprotocol - Verify Your Email

Body:
Hi there,

Welcome to Emaxprotocol! 🎉

Thanks for signing up for our cryptocurrency trading platform. To complete your registration and start trading, please verify your email address by clicking the button below:

{{ .ConfirmationURL }}

This link will expire in 24 hours.

If you didn't create an account, you can safely ignore this email.

Best regards,
The Emaxprotocol Team

---
Need help? Contact us at support@emaxprotocol.com
```

**2. Reset Password Email**
- Sent when users request password recovery
- Contains a reset link that expires in 1 hour

**Recommended customization:**
```
Subject: Reset Your Emaxprotocol Password

Body:
Hi there,

We received a request to reset your password for your Emaxprotocol account.

Click the button below to create a new password:

{{ .ConfirmationURL }}

This link will expire in 1 hour for security reasons.

If you didn't request a password reset, please ignore this email or contact support if you have concerns.

Best regards,
The Emaxprotocol Team

---
Security tip: Never share your password with anyone.
```

**3. Magic Link Email** (Optional)
- For passwordless login
- If you implement magic link authentication later

**4. Change Email Address**
- Sent when users update their email
- Confirms the new email address

#### Template Variables

Use these variables in your templates:
- `{{ .ConfirmationURL }}` - Verification/reset link
- `{{ .Token }}` - Authentication token (if needed)
- `{{ .SiteURL }}` - Your application URL

#### Configure Email Settings

1. Go to **Authentication → Email Templates**
2. Scroll to **SMTP Settings** (optional, for custom email provider)
3. By default, Supabase uses their email service
4. For production, consider using:
   - **SendGrid**
   - **AWS SES**
   - **Mailgun**
   - **Postmark**

#### Set Redirect URLs

1. Go to **Authentication → URL Configuration**
2. Set **Site URL**: `http://localhost:3000` (development)
3. For production: `https://your-domain.com`
4. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback`
   - `http://localhost:3000/reset-password`
   - `https://your-domain.com/reset-password`

#### Email Rate Limiting

Supabase has built-in rate limiting:
- **Signup**: 4 emails per hour per email address
- **Password Reset**: 4 emails per hour per email address
- **Email Change**: 4 emails per hour per email address

For production, these limits can be adjusted in Project Settings.

#### Testing Email Templates

1. Create a test account during development
2. Check the emails in your inbox
3. Verify links work correctly
4. Test on different email clients (Gmail, Outlook, etc.)

#### Email Deliverability Tips

1. **Add DNS Records** (for production):
   - SPF record
   - DKIM record
   - DMARC policy
   
2. **Use Custom Domain** (optional):
   - Configure custom SMTP in Supabase
   - Improves deliverability and branding

3. **Avoid Spam Filters**:
   - Don't use ALL CAPS in subject lines
   - Include unsubscribe link for marketing emails
   - Use plain text + HTML format

#### Troubleshooting

**Email not received?**
1. Check spam/junk folder
2. Verify email address is correct
3. Check Supabase logs: **Logs → Edge Logs**
4. Ensure email rate limit not exceeded

**Link not working?**
1. Check redirect URLs are configured
2. Verify link hasn't expired
3. Ensure your app has proper callback handlers

### 9. Restart Development Server

```bash
npm run dev
```

## Supabase Features Used

- **Authentication**: Email/password signup and login
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Real-time**: Live updates when database changes occur
- **Storage**: Secure file uploads with access control (avatars, documents, receipts)

## Database Schema

### Tables

1. **trading_plans**
   - Investment plans with min/max deposits, daily returns, and duration
   - Real-time enabled for live updates

2. **user_investments**
   - User's active investments linked to trading plans
   - Real-time enabled for live updates

3. **transactions**
   - All financial transactions (deposits, withdrawals, returns, referrals)
   - Real-time enabled for live updates

### Storage Buckets

1. **user-documents** (Private)
   - KYC documents, ID verification, legal documents
   - Users can only access their own files

2. **avatars** (Public)
   - User profile pictures
   - Publicly readable, owner can upload/update/delete

3. **receipts** (Private)
   - Transaction receipts and proof of payment
   - Users can only access their own files

## Development Tips

- Use the Supabase client: `import { supabase } from '@/lib/supabase'`
- Check if configured: `isSupabaseConfigured()`
- Auth helpers available: `signUp()`, `signIn()`, `signOut()`, `getCurrentUser()`
- Database queries are type-safe with TypeScript interfaces

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Integration Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
