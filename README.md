# Emaxprotocol

*Cryptocurrency Trading Platform with Automated Solutions*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/emax-a0981fe9/v0-vercel-chat-link)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/fjSuvbPbgNl)

## Overview

Emaxprotocol is a Next.js 15 cryptocurrency trading platform featuring automated trading solutions, real-time market data, and secure user authentication powered by Supabase.

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (Authentication + PostgreSQL Database)
- **Icons**: Lucide React
- **Deployment**: Vercel

This repository stays in sync with deployments from [v0.dev](https://v0.dev).

## Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available at [supabase.com](https://supabase.com))

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Set up Supabase backend**:
   - See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed instructions
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase credentials

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features

- ✅ User authentication (signup/login with Supabase)
- ✅ Real-time cryptocurrency market data
- ✅ Multiple trading plans with different return rates
- ✅ Responsive design with Tailwind CSS
- ✅ Modern UI components from shadcn/ui
- 🚧 User dashboard (coming soon)
- 🚧 Investment tracking (coming soon)
- 🚧 Transaction history (coming soon)

## Project Structure

```
├── app/                    # Next.js 15 App Router pages
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── ...                # Other routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
├── lib/                   # Utilities and configurations
│   ├── supabase.ts       # Supabase client and auth helpers
│   └── utils.ts          # Helper functions
└── hooks/                 # Custom React hooks

```

## Environment Variables

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deployment

Your project is live at: **[https://vercel.com/emax-a0981fe9/v0-vercel-chat-link](https://vercel.com/emax-a0981fe9/v0-vercel-chat-link)**

Continue building on v0.dev: **[https://v0.dev/chat/projects/fjSuvbPbgNl](https://v0.dev/chat/projects/fjSuvbPbgNl)**

## Backend Integration

This is the frontend of the trading platform. The backend logic is handled by:

- **Supabase Authentication**: User signup, login, and session management
- **Supabase Database**: PostgreSQL with Row Level Security (RLS)
- **Database Tables**: `trading_plans`, `user_investments`, `transactions`

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for complete backend setup instructions.

## Development

- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

Note: Use `--legacy-peer-deps` flag when installing new packages due to peer dependency conflicts.
