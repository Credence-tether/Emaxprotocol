"use client"

import { useState, useEffect } from 'react'
import { supabase, subscribeToTable, unsubscribe, getCurrentUser } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowUpCircle, ArrowDownCircle, DollarSign, TrendingUp } from 'lucide-react'

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'return' | 'referral'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

/**
 * Real-time Transactions Dashboard Component
 * Demonstrates Supabase real-time subscriptions with automatic UI updates
 */
export default function RealtimeTransactionsDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch initial transactions
        const user = await getCurrentUser()
        if (!user || !supabase) {
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20)

        if (error) {
          console.error('Error fetching transactions:', error)
        } else if (data) {
          setTransactions(data)
          calculateBalance(data)
        }

        setLoading(false)
        setConnected(true)
      } catch (error) {
        console.error('Error initializing:', error)
        setLoading(false)
      }
    }

    initializeData()

    // Set up real-time subscription
    const channel = subscribeToTable(
      'transactions',
      (payload) => {
        console.log('Real-time update received:', payload)

        if (payload.eventType === 'INSERT') {
          // Add new transaction to the top of the list
          setTransactions((prev) => [payload.new as Transaction, ...prev])
          
          // Show notification
          showNotification('New transaction received!')
        } else if (payload.eventType === 'UPDATE') {
          // Update existing transaction
          setTransactions((prev) =>
            prev.map((t) =>
              t.id === payload.new.id ? (payload.new as Transaction) : t
            )
          )
          
          showNotification('Transaction updated!')
        } else if (payload.eventType === 'DELETE') {
          // Remove deleted transaction
          setTransactions((prev) => prev.filter((t) => t.id !== payload.old.id))
        }
      }
    )

    // Cleanup subscription on unmount
    return () => {
      unsubscribe(channel)
      setConnected(false)
    }
  }, [])

  // Recalculate balance whenever transactions change
  useEffect(() => {
    calculateBalance(transactions)
  }, [transactions])

  const calculateBalance = (txns: Transaction[]) => {
    const balance = txns.reduce((acc, txn) => {
      if (txn.status !== 'completed') return acc
      
      if (txn.type === 'deposit' || txn.type === 'return' || txn.type === 'referral') {
        return acc + txn.amount
      } else if (txn.type === 'withdrawal') {
        return acc - txn.amount
      }
      return acc
    }, 0)

    setTotalBalance(balance)
  }

  const showNotification = (message: string) => {
    // In a real app, use a toast notification library
    console.log('📢 Notification:', message)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle className="h-5 w-5 text-green-500" />
      case 'withdrawal':
        return <ArrowUpCircle className="h-5 w-5 text-red-500" />
      case 'return':
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case 'referral':
        return <DollarSign className="h-5 w-5 text-purple-500" />
      default:
        return <DollarSign className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'secondary',
      completed: 'default',
      failed: 'destructive',
    }

    return (
      <Badge variant={variants[status] || 'default'}>
        {status}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Alert className={connected ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
        <AlertDescription className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          {connected ? 'Real-time connection active' : 'Disconnected'}
        </AlertDescription>
      </Alert>

      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
          <CardDescription>Current account balance with completed transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">
            ${totalBalance.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Live updates as new transactions occur
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No transactions yet
            </p>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="font-medium capitalize">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`font-semibold ${
                      transaction.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {transaction.type === 'withdrawal' ? '-' : '+'}
                      ${transaction.amount.toFixed(2)}
                    </p>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
