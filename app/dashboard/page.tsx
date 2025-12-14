'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Wallet, CreditCard, FileText, Settings, AlertCircle, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase, getCurrentUser, getUserProfile, signOut } from '@/lib/supabase'
import { Alert, AlertDescription } from '@/components/ui/alert'

type UserProfile = {
  id: string
  email: string
  full_name: string | null
  balance: number
  total_invested: number
  total_profit: number
  kyc_status: 'pending' | 'approved' | 'rejected'
  referral_code: string | null
}

type Investment = {
  id: string
  plan_name: string
  amount: number
  daily_return: number
  status: 'active' | 'completed' | 'cancelled'
  start_date: string
  end_date: string
  created_at: string
}

type Transaction = {
  id: string
  type: 'deposit' | 'withdrawal' | 'profit'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  description: string
  created_at: string
}

export default function DashboardHome() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [investments, setInvestments] = useState<Investment[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [chartData, setChartData] = useState<Array<{ day: string; value: number }>>([])

  useEffect(() => {
    loadDashboardData()
    
    // Set up real-time subscriptions
    const user = getCurrentUser()
    if (!user || !supabase) return

    const investmentsChannel = (supabase as any)
      .channel('investments_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'user_investments', filter: `user_id=eq.${user}` },
        () => loadDashboardData()
      )
      .subscribe()

    const transactionsChannel = (supabase as any)
      .channel('transactions_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user}` },
        () => loadDashboardData()
      )
      .subscribe()

    const profileChannel = (supabase as any)
      .channel('profile_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'user_profiles', filter: `id=eq.${user}` },
        () => loadDashboardData()
      )
      .subscribe()

    return () => {
      investmentsChannel.unsubscribe()
      transactionsChannel.unsubscribe()
      profileChannel.unsubscribe()
    }
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const user = await getCurrentUser()
      
      console.log('Current user:', user)
      
      if (!user) {
        console.log('No user found, redirecting to login')
        router.push('/login')
        return
      }

      // Load user profile
      console.log('Fetching user profile...')
      const profileResult = await getUserProfile()
      console.log('Profile result:', profileResult)
      
      if (profileResult?.data) {
        console.log('Profile data found:', profileResult.data)
        setProfile(profileResult.data as UserProfile)
      } else {
        console.error('No profile data:', profileResult)
      }

      if (!supabase) {
        console.error('Supabase client not available')
        return
      }

      // Load investments
      const { data: investmentsData } = await (supabase as any)
        .from('user_investments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (investmentsData) setInvestments(investmentsData)

      // Load transactions for chart (last 7 days)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      
      const { data: transactionsData } = await (supabase as any)
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: true })
      
      if (transactionsData && profileResult?.data) {
        setTransactions(transactionsData)
        generateChartData(transactionsData, profileResult.data as UserProfile)
      }

    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateChartData = (txns: Transaction[], prof: UserProfile) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const chartPoints: Array<{ day: string; value: number }> = []
    
    // Generate last 5 days of data
    for (let i = 4; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayName = days[date.getDay()]
      
      // Calculate cumulative balance up to this day
      const dayTransactions = txns.filter(t => {
        const txDate = new Date(t.created_at)
        return txDate <= date && t.status === 'completed'
      })
      
      const dayBalance = prof?.balance || 0
      const totalChange = dayTransactions.reduce((sum, tx) => {
        if (tx.type === 'deposit' || tx.type === 'profit') return sum + tx.amount
        if (tx.type === 'withdrawal') return sum - tx.amount
        return sum
      }, 0)
      
      chartPoints.push({
        day: dayName,
        value: Math.max(0, dayBalance - totalChange + (totalChange * (i / 5)))
      })
    }
    
    setChartData(chartPoints)
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1B33] to-[#1E3A8A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1B33] to-[#1E3A8A] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6">
          <Alert className="bg-red-900/50 border-red-500">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-white">
              <strong>Unable to load your profile.</strong>
              <br />
              This usually means your database tables haven't been set up yet.
            </AlertDescription>
          </Alert>
          
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Setup Required</h2>
            <p className="text-gray-300">
              To use the dashboard, you need to set up your Supabase database tables. Follow these steps:
            </p>
            
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Go to your Supabase project dashboard</li>
              <li>Navigate to SQL Editor</li>
              <li>Copy and run the SQL from <code className="bg-black/30 px-2 py-1 rounded">SUPABASE_SETUP.md</code></li>
              <li>Refresh this page</li>
            </ol>
            
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Refresh Page
              </Button>
              <Button 
                onClick={() => router.push('/login')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const kycStatus = profile.kyc_status === 'approved' ? 'Verified' : 
                     profile.kyc_status === 'pending' ? 'Pending' : 'Not Verified'
  const activeInvestmentsCount = investments.filter(i => i.status === 'active').length
  const avgDailyROI = investments.length > 0 
    ? investments.reduce((sum, inv) => sum + inv.daily_return, 0) / investments.length 
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1B33] to-[#1E3A8A] text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-wide">Emax Protocol Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            KYC: <span className={`font-semibold ${
              profile.kyc_status === 'approved' ? 'text-green-400' :
              profile.kyc_status === 'pending' ? 'text-yellow-400' : 'text-red-400'
            }`}>{kycStatus}</span>
          </div>
          <Button 
            variant="secondary" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {profile.kyc_status === 'pending' && (
        <Alert className="mb-6 bg-yellow-900/50 border-yellow-500">
          <AlertCircle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-white">
            Your KYC verification is pending. Some features may be limited until approved.
          </AlertDescription>
        </Alert>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Wallet className="w-8 h-8 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-300">Portfolio Balance</p>
                  <p className="text-xl font-bold">${profile.balance.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <CreditCard className="w-8 h-8 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-300">Active Investments</p>
                  <p className="text-xl font-bold">{activeInvestmentsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <FileText className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-300">ROI (Daily Avg)</p>
                  <p className="text-xl font-bold">{avgDailyROI.toFixed(2)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 backdrop-blur-xl border-none p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-cyan-300">Portfolio Growth (Last 5 Days)</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="day" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: '#0B1B33', borderRadius: '8px', border: 'none' }} />
                <Line type="monotone" dataKey="value" stroke="#00C2FF" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-gray-400">
              No transaction data available yet
            </div>
          )}
        </Card>

        {/* Recent Transactions */}
        {transactions.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-none p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-cyan-300">Recent Transactions</h2>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((txn) => (
                <div key={txn.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      txn.type === 'deposit' ? 'bg-cyan-500/20' :
                      txn.type === 'withdrawal' ? 'bg-orange-500/20' : 'bg-green-500/20'
                    }`}>
                      {txn.type === 'deposit' ? '↓' : txn.type === 'withdrawal' ? '↑' : '★'}
                    </div>
                    <div>
                      <p className="font-medium">{txn.description}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(txn.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      txn.type === 'deposit' || txn.type === 'profit' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {txn.type === 'deposit' || txn.type === 'profit' ? '+' : '-'}
                      ${txn.amount.toLocaleString()}
                    </p>
                    <p className={`text-xs ${
                      txn.status === 'completed' ? 'text-green-400' :
                      txn.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {txn.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Active Investments */}
        {investments.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-none p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-cyan-300">Active Investments</h2>
            <div className="space-y-3">
              {investments.filter(i => i.status === 'active').slice(0, 3).map((inv) => (
                <div key={inv.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{inv.plan_name}</h3>
                    <span className="text-green-400 text-sm">+{inv.daily_return}%/day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Amount: ${inv.amount.toLocaleString()}</span>
                    <span className="text-gray-400">
                      Ends: {new Date(inv.end_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Button 
            className="bg-cyan-500 hover:bg-cyan-600 text-white flex items-center space-x-2"
            onClick={() => router.push('/deposit')}
          >
            <Wallet className="w-5 h-5" /> 
            <span>Deposit Funds</span>
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
            onClick={() => router.push('/withdraw')}
          >
            <CreditCard className="w-5 h-5" /> 
            <span>Withdraw</span>
          </Button>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-2"
            onClick={() => router.push('/trading-plans')}
          >
            <Settings className="w-5 h-5" /> 
            <span>Browse Plans</span>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
