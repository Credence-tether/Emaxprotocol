"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, Calendar } from 'lucide-react'

interface Investment {
  id: string
  amount: number
  current_value: number
  profit: number
  status: 'active' | 'completed' | 'paused'
  created_at: string
  trading_plan: {
    name: string
    profit_percentage: number
    duration_days: number
  }
}

interface InvestmentCardProps {
  investment: Investment
  showUserInfo?: boolean
  userInfo?: {
    full_name: string
    username: string
  }
}

export function InvestmentCard({ investment, showUserInfo, userInfo }: InvestmentCardProps) {
  const profitPercentage = (investment.profit / investment.amount) * 100
  const isProfitable = investment.profit >= 0

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{investment.trading_plan.name}</CardTitle>
            {showUserInfo && userInfo && (
              <CardDescription className="mt-1">
                {userInfo.full_name || userInfo.username}
              </CardDescription>
            )}
          </div>
          <Badge
            variant={
              investment.status === 'active' ? 'default' :
              investment.status === 'completed' ? 'default' : 'secondary'
            }
          >
            {investment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Initial Amount</p>
            <p className="text-xl font-bold">${investment.amount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Value</p>
            <p className="text-xl font-bold text-blue-600">${investment.current_value.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600">Profit</p>
            <p className={`font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {isProfitable ? '+' : ''}{profitPercentage.toFixed(2)}%
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-4 w-4 ${isProfitable ? 'text-green-600' : 'text-red-600'}`} />
            <p className={`font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {isProfitable ? '+' : ''} ${investment.profit.toFixed(2)}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Progress</p>
          <Progress value={Math.min((profitPercentage / investment.trading_plan.profit_percentage) * 100, 100)} />
          <p className="text-xs text-gray-500 mt-1">
            Target: {investment.trading_plan.profit_percentage}% over {investment.trading_plan.duration_days} days
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          Started {new Date(investment.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}
