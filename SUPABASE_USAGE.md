# Supabase Client Usage Examples

Quick reference for using Supabase in your components and pages.

## Authentication

### Sign Up
```typescript
import { signUp } from '@/lib/supabase'

const handleSignup = async () => {
  const { data, error } = await signUp(
    'user@example.com',
    'password123',
    {
      fullName: 'John Doe',
      username: 'johndoe'
    }
  )
  
  if (error) {
    console.error('Signup error:', error.message)
  } else {
    console.log('User created:', data.user)
  }
}
```

### Sign In
```typescript
import { signIn } from '@/lib/supabase'

const handleLogin = async () => {
  const { data, error } = await signIn('user@example.com', 'password123')
  
  if (error) {
    console.error('Login error:', error.message)
  } else {
    console.log('Logged in:', data.user)
  }
}
```

### Sign Out
```typescript
import { signOut } from '@/lib/supabase'

const handleLogout = async () => {
  const { error } = await signOut()
  
  if (error) {
    console.error('Logout error:', error.message)
  }
}
```

### Get Current User
```typescript
import { getCurrentUser } from '@/lib/supabase'

const user = await getCurrentUser()
if (user) {
  console.log('Current user:', user.email)
}
```

### Reset Password
```typescript
import { resetPassword } from '@/lib/supabase'

const handleResetPassword = async () => {
  const { error } = await resetPassword('user@example.com')
  
  if (error) {
    console.error('Reset error:', error.message)
  } else {
    console.log('Password reset email sent!')
  }
}
```

## Database Queries

### Query Trading Plans
```typescript
import { supabase } from '@/lib/supabase'

const fetchTradingPlans = async () => {
  if (!supabase) {
    console.error('Supabase not configured')
    return
  }

  const { data, error } = await supabase
    .from('trading_plans')
    .select('*')
    .order('min_deposit', { ascending: true })
  
  if (error) {
    console.error('Error fetching plans:', error.message)
  } else {
    console.log('Trading plans:', data)
  }
}
```

### Create User Investment
```typescript
import { supabase } from '@/lib/supabase'

const createInvestment = async (planId: string, amount: number) => {
  if (!supabase) return

  const user = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('user_investments')
    .insert({
      user_id: user.data.user?.id,
      plan_id: planId,
      amount: amount,
      status: 'active'
    })
    .select()
  
  if (error) {
    console.error('Error creating investment:', error.message)
  } else {
    console.log('Investment created:', data)
  }
}
```

### Get User's Investments
```typescript
import { supabase } from '@/lib/supabase'

const fetchUserInvestments = async () => {
  if (!supabase) return

  const { data, error } = await supabase
    .from('user_investments')
    .select(`
      *,
      trading_plans (
        name,
        daily_return,
        duration_days
      )
    `)
    .eq('status', 'active')
  
  if (error) {
    console.error('Error fetching investments:', error.message)
  } else {
    console.log('User investments:', data)
  }
}
```

### Create Transaction
```typescript
import { supabase } from '@/lib/supabase'

const createTransaction = async (type: 'deposit' | 'withdrawal', amount: number) => {
  if (!supabase) return

  const user = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.data.user?.id,
      type: type,
      amount: amount,
      status: 'pending'
    })
    .select()
  
  if (error) {
    console.error('Error creating transaction:', error.message)
  } else {
    console.log('Transaction created:', data)
  }
}
```

### Get User's Transaction History
```typescript
import { supabase } from '@/lib/supabase'

const fetchTransactions = async () => {
  if (!supabase) return

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)
  
  if (error) {
    console.error('Error fetching transactions:', error.message)
  } else {
    console.log('Recent transactions:', data)
  }
}
```

## Real-time Subscriptions

### Subscribe to Transaction Updates (Using Helper)
```typescript
import { subscribeToTable, unsubscribe } from '@/lib/supabase'
import { useEffect } from 'react'

const useTransactionSubscription = (userId: string) => {
  useEffect(() => {
    const channel = subscribeToTable(
      'transactions',
      (payload) => {
        console.log('Transaction update:', payload)
        if (payload.eventType === 'INSERT') {
          console.log('New transaction:', payload.new)
        } else if (payload.eventType === 'UPDATE') {
          console.log('Updated transaction:', payload.new)
        } else if (payload.eventType === 'DELETE') {
          console.log('Deleted transaction:', payload.old)
        }
      },
      `user_id=eq.${userId}`
    )

    return () => {
      unsubscribe(channel)
    }
  }, [userId])
}
```

### Subscribe to All Transactions with State Management
```typescript
"use client"

import { useState, useEffect } from 'react'
import { supabase, subscribeToTable, unsubscribe } from '@/lib/supabase'

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    // Fetch initial data
    const fetchTransactions = async () => {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setTransactions(data)
    }

    fetchTransactions()

    // Subscribe to real-time updates
    const channel = subscribeToTable('transactions', (payload) => {
      if (payload.eventType === 'INSERT') {
        setTransactions((prev) => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setTransactions((prev) =>
          prev.map((t) => (t.id === payload.new.id ? payload.new : t))
        )
      } else if (payload.eventType === 'DELETE') {
        setTransactions((prev) => prev.filter((t) => t.id !== payload.old.id))
      }
    })

    return () => {
      unsubscribe(channel)
    }
  }, [])

  return (
    <div>
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          {transaction.type}: ${transaction.amount}
        </div>
      ))}
    </div>
  )
}
```

### Subscribe to Investment Updates
```typescript
import { subscribeToTable, unsubscribe } from '@/lib/supabase'
import { useEffect } from 'react'

const useInvestmentUpdates = (userId: string, onUpdate: (investment: any) => void) => {
  useEffect(() => {
    const channel = subscribeToTable(
      'user_investments',
      (payload) => {
        if (payload.eventType === 'UPDATE') {
          onUpdate(payload.new)
        }
      },
      `user_id=eq.${userId}`
    )

    return () => {
      unsubscribe(channel)
    }
  }, [userId, onUpdate])
}
```

### Subscribe to Trading Plan Changes
```typescript
import { subscribeToTable, unsubscribe } from '@/lib/supabase'
import { useEffect } from 'react'

export const useTradingPlansRealtime = (
  setPlans: React.Dispatch<React.SetStateAction<any[]>>
) => {
  useEffect(() => {
    const channel = subscribeToTable('trading_plans', (payload) => {
      if (payload.eventType === 'INSERT') {
        setPlans((prev) => [...prev, payload.new])
      } else if (payload.eventType === 'UPDATE') {
        setPlans((prev) =>
          prev.map((plan) => (plan.id === payload.new.id ? payload.new : plan))
        )
      } else if (payload.eventType === 'DELETE') {
        setPlans((prev) => prev.filter((plan) => plan.id !== payload.old.id))
      }
    })

    return () => {
      unsubscribe(channel)
    }
  }, [setPlans])
}
```

## File Storage

### Upload User Document
```typescript
import { uploadFile, getCurrentUser } from '@/lib/supabase'

const handleDocumentUpload = async (file: File) => {
  const user = await getCurrentUser()
  if (!user) {
    console.error('User not authenticated')
    return
  }

  // Organize files by user ID
  const filePath = `${user.id}/${file.name}`
  
  const { data, error } = await uploadFile('user-documents', filePath, file)
  
  if (error) {
    console.error('Upload error:', error.message)
  } else {
    console.log('File uploaded:', data)
  }
}
```

### Upload Avatar
```typescript
import { uploadFile, getFileUrl, getCurrentUser } from '@/lib/supabase'

const handleAvatarUpload = async (file: File) => {
  const user = await getCurrentUser()
  if (!user) return

  // Use consistent filename for avatar
  const filePath = `${user.id}/avatar.${file.name.split('.').pop()}`
  
  const { data, error } = await uploadFile('avatars', filePath, file)
  
  if (error) {
    console.error('Avatar upload error:', error.message)
  } else {
    // Get public URL for the avatar
    const avatarUrl = getFileUrl('avatars', filePath)
    console.log('Avatar URL:', avatarUrl)
    
    // You can now save avatarUrl to user profile in database
  }
}
```

### Complete File Upload Component
```typescript
"use client"

import { useState } from 'react'
import { uploadFile, getCurrentUser } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function FileUploader({ bucket }: { bucket: 'user-documents' | 'receipts' }) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const user = await getCurrentUser()
    if (!user) {
      alert('Please login first')
      setUploading(false)
      return
    }

    const filePath = `${user.id}/${Date.now()}_${file.name}`
    
    const { data, error } = await uploadFile(bucket, filePath, file)
    
    if (error) {
      alert('Upload failed: ' + error.message)
    } else {
      alert('File uploaded successfully!')
    }
    
    setUploading(false)
  }

  return (
    <div>
      <Input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  )
}
```

### List User Files
```typescript
import { listFiles, getCurrentUser } from '@/lib/supabase'

const getUserDocuments = async () => {
  const user = await getCurrentUser()
  if (!user) return

  const { data, error } = await listFiles('user-documents', user.id)
  
  if (error) {
    console.error('Error listing files:', error.message)
  } else {
    console.log('User documents:', data)
    return data
  }
}
```

### Download File
```typescript
import { downloadFile } from '@/lib/supabase'

const handleDownload = async (filePath: string) => {
  const { data, error } = await downloadFile('user-documents', filePath)
  
  if (error) {
    console.error('Download error:', error.message)
  } else if (data) {
    // Create download link
    const url = URL.createObjectURL(data)
    const a = document.createElement('a')
    a.href = url
    a.download = filePath.split('/').pop() || 'download'
    a.click()
    URL.revokeObjectURL(url)
  }
}
```

### Delete File
```typescript
import { deleteFile } from '@/lib/supabase'

const handleDelete = async (filePath: string) => {
  const { error } = await deleteFile('user-documents', filePath)
  
  if (error) {
    console.error('Delete error:', error.message)
  } else {
    console.log('File deleted successfully')
  }
}
```

### Complete File Manager Component
```typescript
"use client"

import { useState, useEffect } from 'react'
import { listFiles, deleteFile, getFileUrl, getCurrentUser } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function FileManager() {
  const [files, setFiles] = useState<any[]>([])

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    const user = await getCurrentUser()
    if (!user) return

    const { data } = await listFiles('user-documents', user.id)
    if (data) setFiles(data)
  }

  const handleDelete = async (fileName: string) => {
    const user = await getCurrentUser()
    if (!user) return

    const filePath = `${user.id}/${fileName}`
    const { error } = await deleteFile('user-documents', filePath)
    
    if (!error) {
      setFiles((prev) => prev.filter((f) => f.name !== fileName))
    }
  }

  return (
    <div>
      <h2>Your Documents</h2>
      {files.map((file) => (
        <div key={file.name} className="flex items-center gap-4">
          <span>{file.name}</span>
          <span>{(file.metadata.size / 1024).toFixed(2)} KB</span>
          <Button onClick={() => handleDelete(file.name)} variant="destructive">
            Delete
          </Button>
        </div>
      ))}
    </div>
  )
}
```

## Client Component Pattern

```typescript
"use client"

import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function DashboardPage() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      console.error('Supabase is not configured')
      return
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('trading_plans')
        .select('*')
      
      if (!error) {
        setPlans(data)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {plans.map((plan) => (
        <div key={plan.id}>{plan.name}</div>
      ))}
    </div>
  )
}
```

## Server Component Pattern

```typescript
import { supabase } from '@/lib/supabase'

export default async function PlansPage() {
  if (!supabase) {
    return <div>Supabase not configured</div>
  }

  const { data: plans, error } = await supabase
    .from('trading_plans')
    .select('*')

  if (error) {
    return <div>Error loading plans</div>
  }

  return (
    <div>
      {plans.map((plan) => (
        <div key={plan.id}>{plan.name}</div>
      ))}
    </div>
  )
}
```

## Error Handling Best Practices

```typescript
import { supabase } from '@/lib/supabase'

const safeQuery = async () => {
  // Always check if Supabase is configured
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set up environment variables.')
  }

  try {
    const { data, error } = await supabase
      .from('trading_plans')
      .select('*')
    
    // Always check for error in response
    if (error) {
      throw error
    }
    
    return data
  } catch (error: any) {
    console.error('Database error:', error.message)
    // Handle error appropriately (show toast, alert, etc.)
    return null
  }
}
```

## Type Safety

The database types are already defined in `lib/supabase.ts`. Use them for type-safe queries:

```typescript
import { supabase, type Database } from '@/lib/supabase'

type TradingPlan = Database['public']['Tables']['trading_plans']['Row']
type NewInvestment = Database['public']['Tables']['user_investments']['Insert']
```
