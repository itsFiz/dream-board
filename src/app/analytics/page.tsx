'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Target,
  Calendar,
  DollarSign,
  BarChart3,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUp
} from 'lucide-react'
import Link from 'next/link'

interface Dream {
  id: string
  title: string
  category: string
  estimatedCost: number
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
  priorityLevel: 'low' | 'medium' | 'high'
  deadlineYear: number
  deadlineMonth: number
}

interface IncomeStream {
  id: string
  name: string
  amount: number
  frequency: 'weekly' | 'monthly' | 'yearly'
  growthPercentage: number
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Mock data - replace with actual API call
  const [dreams] = useState<Dream[]>([
    { id: '1', title: 'New Electric Car', category: 'Transportation', estimatedCost: 45000, status: 'planning', priorityLevel: 'high', deadlineYear: 2025, deadlineMonth: 6 },
    { id: '2', title: 'Vacation to Japan', category: 'Travel', estimatedCost: 8000, status: 'planning', priorityLevel: 'medium', deadlineYear: 2024, deadlineMonth: 12 },
    { id: '3', title: 'Emergency Fund', category: 'Financial', estimatedCost: 15000, status: 'in_progress', priorityLevel: 'high', deadlineYear: 2024, deadlineMonth: 12 },
    { id: '4', title: 'MBA Degree', category: 'Education', estimatedCost: 60000, status: 'planning', priorityLevel: 'medium', deadlineYear: 2026, deadlineMonth: 5 },
    { id: '5', title: 'Buy House', category: 'Home', estimatedCost: 300000, status: 'planning', priorityLevel: 'high', deadlineYear: 2027, deadlineMonth: 8 },
    { id: '6', title: 'New Laptop', category: 'Technology', estimatedCost: 2000, status: 'completed', priorityLevel: 'low', deadlineYear: 2024, deadlineMonth: 3 },
  ])

  const [incomeStreams] = useState<IncomeStream[]>([
    { id: '1', name: 'Full-time Job', amount: 6500, frequency: 'monthly', growthPercentage: 5 },
    { id: '2', name: 'Freelance Design', amount: 1500, frequency: 'monthly', growthPercentage: 10 },
    { id: '3', name: 'Investment Dividends', amount: 500, frequency: 'monthly', growthPercentage: 8 },
  ])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your analytics...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Calculate statistics
  const totalDreams = dreams.length
  const completedDreams = dreams.filter(d => d.status === 'completed').length
  const inProgressDreams = dreams.filter(d => d.status === 'in_progress').length
  const planningDreams = dreams.filter(d => d.status === 'planning').length
  const onHoldDreams = dreams.filter(d => d.status === 'on_hold').length

  const totalValue = dreams.reduce((sum, dream) => sum + dream.estimatedCost, 0)
  const completedValue = dreams.filter(d => d.status === 'completed').reduce((sum, dream) => sum + dream.estimatedCost, 0)
  const inProgressValue = dreams.filter(d => d.status === 'in_progress').reduce((sum, dream) => sum + dream.estimatedCost, 0)
  const planningValue = dreams.filter(d => d.status === 'planning').reduce((sum, dream) => sum + dream.estimatedCost, 0)

  const completionRate = totalDreams > 0 ? (completedDreams / totalDreams) * 100 : 0
  const progressRate = totalDreams > 0 ? ((completedDreams + inProgressDreams) / totalDreams) * 100 : 0

  const monthlyIncome = incomeStreams.reduce((sum, stream) => {
    if (stream.frequency === 'weekly') return sum + (stream.amount * 4.33)
    if (stream.frequency === 'monthly') return sum + stream.amount
    if (stream.frequency === 'yearly') return sum + (stream.amount / 12)
    return sum
  }, 0)

  const annualIncome = monthlyIncome * 12
  const projectedIncome = annualIncome * (1 + (incomeStreams.reduce((sum, stream) => sum + stream.growthPercentage, 0) / incomeStreams.length / 100))

  // Category breakdown
  const categoryBreakdown = dreams.reduce((acc, dream) => {
    acc[dream.category] = (acc[dream.category] || 0) + dream.estimatedCost
    return acc
  }, {} as Record<string, number>)

  const priorityBreakdown = dreams.reduce((acc, dream) => {
    acc[dream.priorityLevel] = (acc[dream.priorityLevel] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="mt-2 text-gray-600">
            Track your progress and gain insights into your financial goals
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{completionRate.toFixed(1)}%</p>
                <div className="flex items-center text-sm text-green-600">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +{progressRate.toFixed(1)}% progress
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
                <div className="flex items-center text-sm text-blue-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  ${completedValue.toLocaleString()} achieved
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Dreams</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressDreams + planningDreams}</p>
                <div className="flex items-center text-sm text-purple-600">
                  <Activity className="w-4 h-4 mr-1" />
                  {planningDreams} in planning
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">${monthlyIncome.toLocaleString()}</p>
                <div className="flex items-center text-sm text-green-600">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +{((projectedIncome - annualIncome) / annualIncome * 100).toFixed(1)}% projected
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Dream Status Breakdown */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dream Status Overview</h3>
            <div className="space-y-4">
                             <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <CheckCircle className="w-5 h-5 text-green-600" />
                   <span className="text-gray-800 font-medium">Completed</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="font-medium text-gray-900">{completedDreams}</span>
                   <span className="text-sm text-gray-600">({completionRate.toFixed(1)}%)</span>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <Clock className="w-5 h-5 text-blue-600" />
                   <span className="text-gray-800 font-medium">In Progress</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="font-medium text-gray-900">{inProgressDreams}</span>
                   <span className="text-sm text-gray-600">({((inProgressDreams / totalDreams) * 100).toFixed(1)}%)</span>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <Target className="w-5 h-5 text-purple-600" />
                   <span className="text-gray-800 font-medium">Planning</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="font-medium text-gray-900">{planningDreams}</span>
                   <span className="text-sm text-gray-600">({((planningDreams / totalDreams) * 100).toFixed(1)}%)</span>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <AlertCircle className="w-5 h-5 text-yellow-600" />
                   <span className="text-gray-800 font-medium">On Hold</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="font-medium text-gray-900">{onHoldDreams}</span>
                   <span className="text-sm text-gray-600">({((onHoldDreams / totalDreams) * 100).toFixed(1)}%)</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Financial Progress */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Total Goal Value</span>
                  <span className="font-medium">${totalValue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium">${completedValue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(completedValue / totalValue) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">In Progress</span>
                  <span className="font-medium">${inProgressValue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(inProgressValue / totalValue) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Planning</span>
                  <span className="font-medium">${planningValue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(planningValue / totalValue) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category and Priority Analysis */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Category Breakdown */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals by Category</h3>
            <div className="space-y-3">
              {Object.entries(categoryBreakdown)
                .sort(([,a], [,b]) => b - a)
                .map(([category, value]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-700">{category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${(value / totalValue) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        ${value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Priority Breakdown */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals by Priority</h3>
            <div className="space-y-3">
              {Object.entries(priorityBreakdown)
                .sort(([a], [b]) => {
                  const priorityOrder = { high: 3, medium: 2, low: 1 }
                  return priorityOrder[b as keyof typeof priorityOrder] - priorityOrder[a as keyof typeof priorityOrder]
                })
                .map(([priority, count]) => (
                  <div key={priority} className="flex items-center justify-between">
                    <span className="text-gray-700 capitalize">{priority}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            priority === 'high' ? 'bg-red-500' :
                            priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(count / totalDreams) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Income Analysis */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Stream Analysis</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {incomeStreams.map((stream) => (
              <div key={stream.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{stream.name}</h4>
                  <span className="text-sm text-gray-500 capitalize">{stream.frequency}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ${stream.amount.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +{stream.growthPercentage}% growth
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-purple-900">Projected Annual Income</h4>
                <p className="text-sm text-purple-600">Based on current growth rates</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-900">
                  ${projectedIncome.toLocaleString()}
                </div>
                <div className="text-sm text-purple-600">
                  vs ${annualIncome.toLocaleString()} current
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/dreams/new">
              <Button>
                <Target className="w-4 h-4 mr-2" />
                Add New Goal
              </Button>
            </Link>
            <Link href="/income/new">
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Add Income Stream
              </Button>
            </Link>
            <Link href="/timeline">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                View Timeline
              </Button>
            </Link>
            <Link href="/dreamboards">
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Manage Dream Boards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
