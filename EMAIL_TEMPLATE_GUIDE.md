# Email Template Setup Guide for Emaxprotocol

## Quick Start: Configure Email Templates in 5 Minutes

### Step 1: Access Email Templates

1. Open your Supabase dashboard at https://supabase.com/dashboard
2. Select your Emaxprotocol project
3. Navigate to **Authentication** (left sidebar)
4. Click **Email Templates**

You'll see 4 templates ready to customize:
- ✉️ Confirm signup
- 🔐 Magic Link
- 📧 Change Email Address
- 🔑 Reset Password

---

## Template 1: Confirm Signup (Most Important)

**When it's sent**: Immediately after a user signs up with email/password

**What it does**: Sends a verification link to confirm the email is real

### Default Template Issues:
- Generic branding
- No company personality
- Looks like spam

### Your Custom Template:

```
Subject: Welcome to Emaxprotocol - Verify Your Email 🚀

Body:
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Emaxprotocol!</h1>
      <p>Your journey to automated crypto trading starts here</p>
    </div>
    <div class="content">
      <h2>Hi there! 👋</h2>
      <p>Thanks for joining Emaxprotocol, the next generation of cryptocurrency trading.</p>
      <p>To get started with our platform and access exclusive trading features, please verify your email address:</p>
      
      <a href="{{ .ConfirmationURL }}" class="button">Verify Email Address</a>
      
      <p><small>Or copy this link: {{ .ConfirmationURL }}</small></p>
      
      <p><strong>⏱️ This link expires in 24 hours</strong></p>
      
      <p>After verification, you'll be able to:</p>
      <ul>
        <li>✅ Access your trading dashboard</li>
        <li>✅ Choose from multiple trading plans</li>
        <li>✅ Start earning daily returns</li>
        <li>✅ Manage your portfolio</li>
      </ul>
      
      <p>If you didn't create this account, you can safely ignore this email.</p>
      
      <div class="footer">
        <p>Need help? Email us at support@emaxprotocol.com</p>
        <p>&copy; 2025 Emaxprotocol. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Template 2: Reset Password

**When it's sent**: User clicks "Forgot Password" on login page

**Security**: Link expires in 1 hour

### Your Custom Template:

```
Subject: Reset Your Emaxprotocol Password 🔐

Body:
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    .warning { background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hi there,</p>
      <p>We received a request to reset the password for your Emaxprotocol account.</p>
      
      <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
      
      <p><small>Or copy this link: {{ .ConfirmationURL }}</small></p>
      
      <div class="warning">
        <p><strong>⏱️ Important:</strong></p>
        <ul>
          <li>This link expires in 1 hour for security</li>
          <li>You can only use this link once</li>
          <li>Never share this link with anyone</li>
        </ul>
      </div>
      
      <p><strong>Didn't request this?</strong></p>
      <p>If you didn't ask to reset your password, someone may be trying to access your account. Please:</p>
      <ul>
        <li>Ignore this email (the link will expire)</li>
        <li>Contact support@emaxprotocol.com immediately</li>
        <li>Consider changing your password as a precaution</li>
      </ul>
      
      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        For security, this email was sent from Emaxprotocol. Never trust password reset emails from unknown sources.
      </p>
    </div>
  </div>
</body>
</html>
```

---

## Template 3: Change Email Address

**When it's sent**: User updates their email in account settings

### Your Custom Template:

```
Subject: Confirm Your New Email Address

Body:
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Address Update</h1>
    </div>
    <div class="content">
      <p>Hi there,</p>
      <p>You requested to change the email address associated with your Emaxprotocol account.</p>
      
      <p>Click the button below to confirm this new email address:</p>
      
      <a href="{{ .ConfirmationURL }}" class="button">Confirm New Email</a>
      
      <p><strong>⏱️ This link expires in 24 hours</strong></p>
      
      <p><strong>Security Notice:</strong></p>
      <p>If you didn't request this change, your account may be compromised. Please contact support@emaxprotocol.com immediately.</p>
      
      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        &copy; 2025 Emaxprotocol
      </p>
    </div>
  </div>
</body>
</html>
```

---

## Important Configuration Steps

### 1. Set Up Redirect URLs

Go to **Authentication → URL Configuration** and add:

**Development:**
```
Site URL: http://localhost:3000

Redirect URLs:
- http://localhost:3000/auth/callback
- http://localhost:3000/reset-password
- http://localhost:3000/*
```

**Production:**
```
Site URL: https://your-domain.com

Redirect URLs:
- https://your-domain.com/auth/callback
- https://your-domain.com/reset-password
- https://your-domain.com/*
```

### 2. Test Email Flow

1. **Create test account**: Use a real email you can access
2. **Check inbox**: Verify email arrives quickly (usually < 30 seconds)
3. **Click link**: Ensure redirect works correctly
4. **Test spam folder**: Some providers filter automated emails

### 3. Rate Limits

Supabase limits emails to prevent abuse:
- **4 emails per hour** per email address
- Applies to signup, reset, and change email
- For production, request limit increase in Project Settings

---

## Production Email Setup (Optional)

For better deliverability in production, use a custom SMTP provider:

### Option 1: SendGrid (Recommended)

1. Create SendGrid account (free tier: 100 emails/day)
2. Get API key
3. In Supabase: **Authentication → Email Templates → SMTP Settings**
4. Configure:
   ```
   Host: smtp.sendgrid.net
   Port: 587
   Username: apikey
   Password: [your-sendgrid-api-key]
   From: noreply@your-domain.com
   ```

### Option 2: AWS SES

1. Set up AWS SES and verify domain
2. Get SMTP credentials
3. Configure in Supabase SMTP settings

### Option 3: Use Default (Easiest)

- Supabase's built-in email service
- Good for development and small projects
- No configuration needed
- May have lower deliverability for large volumes

---

## Troubleshooting

### Email Not Received?

1. ✅ Check spam/junk folder
2. ✅ Wait 5 minutes (sometimes delayed)
3. ✅ Check email address is correct
4. ✅ View Supabase logs: **Logs → Auth Logs**
5. ✅ Verify not rate limited (4 per hour)

### Link Not Working?

1. ✅ Check link hasn't expired
2. ✅ Verify redirect URLs configured
3. ✅ Ensure callback handler exists in your app
4. ✅ Check browser console for errors

### Emails Going to Spam?

1. ✅ Use custom SMTP provider
2. ✅ Add SPF/DKIM records to your domain
3. ✅ Avoid spam trigger words (FREE, WIN, URGENT)
4. ✅ Include unsubscribe link
5. ✅ Warm up your sending domain gradually

---

## Testing Checklist

Before going live, test:

- [ ] Signup confirmation email arrives
- [ ] Email link verifies user successfully
- [ ] Password reset email works
- [ ] Reset link redirects to correct page
- [ ] Change email confirmation works
- [ ] Emails look good on mobile
- [ ] Emails work in Gmail, Outlook, Apple Mail
- [ ] Links don't break across email clients
- [ ] Branding matches your website

---

## Best Practices

1. **Keep it simple**: Don't overload with images
2. **Clear CTA**: Make the button/link obvious
3. **Mobile-friendly**: Most users read on phones
4. **Security info**: Always mention expiry time
5. **Support contact**: Include help email
6. **Plain text fallback**: Some clients don't show HTML
7. **Test regularly**: Email clients update frequently

Need help? The email templates are in your Supabase dashboard under **Authentication → Email Templates**.
