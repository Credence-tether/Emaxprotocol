"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getCurrentUser, isAdmin } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Users, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, 
  AlertTriangle, ArrowLeft, Search, Filter
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvestments: 0,
    totalDeposits: 0,
    pendingWithdrawals: 0,
  })
  const [users, setUsers] = useState<any[]>([])
  const [investments, setInvestments] = useState<any[]>([])
  const [withdrawals, setWithdrawals] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null)
  const [adminNotes, setAdminNotes] = useState('')

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push('/login')
        return
      }

      const adminStatus = await isAdmin()
      if (!adminStatus) {
        router.push('/dashboard')
        return
      }

      setAuthorized(true)
      await loadAdminData()
    } catch (error) {
      console.error('Error checking admin access:', error)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const loadAdminData = async () => {
    try {
      // Get total users
      const { count: userCount } = await supabase!
        .from('user_profiles')
        .select('*', { count: 'exact', head: true })
      
      // Get total investments
      const { data: investmentsData } = await supabase!
        .from('user_investments')
        .select('amount')
      
      const totalInvestments = investmentsData?.reduce((sum, inv) => sum + (inv as any).amount, 0) || 0

      // Get total deposits
      const { data: depositsData } = await supabase!
        .from('transactions')
        .select('amount')
        .eq('type', 'deposit')
        .eq('status', 'completed')
      
      const totalDeposits = depositsData?.reduce((sum, txn) => sum + (txn as any).amount, 0) || 0

      // Get pending withdrawals count
      const { count: pendingCount } = await supabase!
        .from('withdrawal_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      setStats({
        totalUsers: userCount || 0,
        totalInvestments,
        totalDeposits,
        pendingWithdrawals: pendingCount || 0,
      })

      // Load users
      const { data: usersData } = await supabase!
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      
      setUsers(usersData || [])

      // Load investments
      const { data: investmentsFullData } = await supabase!
        .from('user_investments')
        .select(`
          *,
          user_profiles!user_investments_user_id_fkey (
            full_name,
            username
          ),
          trading_plans (
            name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50)
      
      setInvestments(investmentsFullData || [])

      // Load withdrawal requests
      const { data: withdrawalsData } = await supabase!
        .from('withdrawal_requests')
        .select(`
          *,
          user_profiles!withdrawal_requests_user_id_fkey (
            full_name,
            username
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50)
      
      setWithdrawals(withdrawalsData || [])

      // Load transactions
      const { data: transactionsData } = await supabase!
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      
      setTransactions(transactionsData || [])

    } catch (error) {
      console.error('Error loading admin data:', error)
    }
  }

  const handleWithdrawalAction = async (withdrawalId: string, action: 'approve' | 'reject') => {
    try {
      const newStatus = action === 'approve' ? 'approved' : 'rejected'
      
      const { error } = await (supabase!
        .from('withdrawal_requests') as any)
        .update({
          status: newStatus,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', withdrawalId)

      if (error) {
        alert('Error updating withdrawal: ' + error.message)
      } else {
        alert(`Withdrawal ${action}d successfully!`)
        setSelectedWithdrawal(null)
        setAdminNotes('')
        await loadAdminData()
      }
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const { error } = await (supabase!
        .from('user_profiles') as any)
        .update({ role: newRole })
        .eq('id', userId)

      if (error) {
        alert('Error updating role: ' + error.message)
      } else {
        alert('User role updated successfully!')
        await loadAdminData()
      }
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  const updateKYCStatus = async (userId: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const { error } = await (supabase!
        .from('user_profiles') as any)
        .update({ kyc_status: status })
        .eq('id', userId)

      if (error) {
        alert('Error updating KYC status: ' + error.message)
      } else {
        alert('KYC status updated successfully!')
        await loadAdminData()
      }
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.includes(searchTerm)
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>You don't have permission to access this page.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage users, investments, and withdrawals</p>
          </div>
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${stats.totalInvestments.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Active capital</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${stats.totalDeposits.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">All-time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingWithdrawals}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="withdrawals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          {/* Withdrawals Tab */}
          <TabsContent value="withdrawals">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
                <CardDescription>Approve or reject withdrawal requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {withdrawals.map((withdrawal) => (
                    <div key={withdrawal.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg gap-4">
                      <div className="flex-1">
                        <p className="font-semibold">
                          {withdrawal.user_profiles?.full_name || withdrawal.user_profiles?.username || 'User'}
                        </p>
                        <p className="text-sm text-gray-600">Amount: ${withdrawal.amount.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Wallet: {withdrawal.wallet_address}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(withdrawal.created_at).toLocaleString()}
                        </p>
                        {withdrawal.admin_notes && (
                          <p className="text-xs text-gray-500 mt-1">Notes: {withdrawal.admin_notes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            withdrawal.status === 'approved' ? 'default' :
                            withdrawal.status === 'rejected' ? 'destructive' :
                            withdrawal.status === 'completed' ? 'default' : 'secondary'
                          }
                        >
                          {withdrawal.status}
                        </Badge>
                        {withdrawal.status === 'pending' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" onClick={() => setSelectedWithdrawal(withdrawal)}>
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Review Withdrawal Request</DialogTitle>
                                <DialogDescription>
                                  Approve or reject this withdrawal request
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium">User:</p>
                                  <p className="text-sm text-gray-600">{withdrawal.user_profiles?.full_name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Amount:</p>
                                  <p className="text-sm text-gray-600">${withdrawal.amount.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Wallet Address:</p>
                                  <p className="text-sm text-gray-600 break-all">{withdrawal.wallet_address}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Admin Notes:</label>
                                  <Textarea
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="Add notes (optional)"
                                    className="mt-1"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    className="flex-1"
                                    onClick={() => handleWithdrawalAction(withdrawal.id, 'approve')}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => handleWithdrawalAction(withdrawal.id, 'reject')}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  ))}
                  {withdrawals.length === 0 && (
                    <div className="text-center py-12 text-gray-600">
                      No withdrawal requests
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
                <div className="flex gap-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg gap-4">
                      <div className="flex-1">
                        <p className="font-semibold">{user.full_name || 'No name'}</p>
                        <p className="text-sm text-gray-600">@{user.username || 'No username'}</p>
                        <p className="text-xs text-gray-500">Balance: ${user.total_balance?.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                          <Badge
                            variant={
                              user.kyc_status === 'approved' ? 'default' :
                              user.kyc_status === 'rejected' ? 'destructive' : 'secondary'
                            }
                          >
                            KYC: {user.kyc_status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateUserRole(user.id, user.role === 'admin' ? 'user' : 'admin')}
                          >
                            {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                          </Button>
                          {user.kyc_status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateKYCStatus(user.id, 'approved')}
                              >
                                Approve KYC
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateKYCStatus(user.id, 'rejected')}
                              >
                                Reject KYC
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments">
            <Card>
              <CardHeader>
                <CardTitle>All Investments</CardTitle>
                <CardDescription>Overview of all user investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg gap-4">
                      <div className="flex-1">
                        <p className="font-semibold">
                          {investment.user_profiles?.full_name || investment.user_profiles?.username}
                        </p>
                        <p className="text-sm text-gray-600">
                          Plan: {investment.trading_plans?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Started {new Date(investment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="text-xl font-bold text-blue-600">${investment.amount.toFixed(2)}</p>
                        <Badge
                          variant={
                            investment.status === 'active' ? 'default' :
                            investment.status === 'completed' ? 'default' : 'secondary'
                          }
                        >
                          {investment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>System-wide transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium capitalize">{transaction.type}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
                        <Badge
                          variant={
                            transaction.status === 'completed' ? 'default' :
                            transaction.status === 'failed' ? 'destructive' : 'secondary'
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
