# 🚀 Quick Setup: Email Templates (5 Minutes)

## Where to Go
1. Open Supabase Dashboard → https://supabase.com/dashboard
2. Click your project
3. Go to **Authentication** → **Email Templates**

## What to Update

### ✉️ Confirm Signup (REQUIRED)
**Subject:** Welcome to Emaxprotocol - Verify Your Email 🚀

**Why:** First email users see - make a good impression!

**What to include:**
- Welcome message
- Clear "Verify Email" button
- What they get after verifying
- Expiry notice (24 hours)

### 🔑 Reset Password (REQUIRED)
**Subject:** Reset Your Emaxprotocol Password 🔐

**Why:** Security-critical email

**What to include:**
- Clear "Reset Password" button
- Security warnings
- Expiry notice (1 hour)
- "Didn't request this?" section

### 📧 Change Email (Optional)
Only needed if you let users change their email

### 🔐 Magic Link (Optional)
Only if you implement passwordless login

## Critical Settings

### Redirect URLs (REQUIRED)
Go to **Authentication** → **URL Configuration**

**Add these:**
```
Development:
http://localhost:3000/auth/callback
http://localhost:3000/reset-password

Production (when you deploy):
https://your-domain.com/auth/callback
https://your-domain.com/reset-password
```

## Rate Limits to Know
- 4 emails per hour per email address
- Applies to all template types
- Can't bypass in free tier

## Testing Steps
1. Create test account with YOUR email
2. Check inbox (and spam)
3. Click verification link
4. Confirm it redirects properly
5. Try password reset flow

## Quick Fixes

**Email not arriving?**
- Check spam folder
- Wait 5 minutes
- Check rate limit (4/hour)

**Link not working?**
- Add redirect URLs above
- Check link hasn't expired

**Looks ugly?**
- Copy templates from [EMAIL_TEMPLATE_GUIDE.md](EMAIL_TEMPLATE_GUIDE.md)
- Paste into Supabase dashboard

## Pro Tip
For production, set up SendGrid or AWS SES for better deliverability. But Supabase's default works fine for development!

## Done? ✅
- [ ] Updated Confirm Signup template
- [ ] Updated Reset Password template  
- [ ] Added redirect URLs
- [ ] Tested with your own email
- [ ] Checked spam folder
- [ ] Verified links work

You're ready! 🎉
