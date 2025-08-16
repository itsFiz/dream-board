'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Target,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { getMonthName, formatCurrency, getPriorityColor, getStatusColor } from '@/lib/utils'

interface Dream {
  id: string
  title: string
  description?: string
  emoji: string
  estimatedCost: number
  deadlineYear: number
  deadlineMonth: number
  priorityLevel: 'low' | 'medium' | 'high'
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
  category: string
}

export default function TimelinePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())


  // Mock data - replace with actual API call
  const [dreams] = useState<Dream[]>([
    {
      id: '1',
      title: 'New Electric Car',
      description: 'Tesla Model 3 or similar',
      emoji: '🚗',
      estimatedCost: 45000,
      deadlineYear: 2025,
      deadlineMonth: 6,
      priorityLevel: 'high',
      status: 'planning',
      category: 'Transportation'
    },
    {
      id: '2',
      title: 'Vacation to Japan',
      description: 'Two-week trip to Tokyo, Kyoto, and Osaka',
      emoji: '✈️',
      estimatedCost: 8000,
      deadlineYear: 2024,
      deadlineMonth: 12,
      priorityLevel: 'medium',
      status: 'planning',
      category: 'Travel'
    },
    {
      id: '3',
      title: 'Emergency Fund',
      description: 'Build a 6-month emergency fund',
      emoji: '💰',
      estimatedCost: 15000,
      deadlineYear: 2024,
      deadlineMonth: 12,
      priorityLevel: 'high',
      status: 'in_progress',
      category: 'Financial'
    },
    {
      id: '4',
      title: 'MBA Degree',
      description: 'Complete MBA program',
      emoji: '🎓',
      estimatedCost: 60000,
      deadlineYear: 2026,
      deadlineMonth: 5,
      priorityLevel: 'medium',
      status: 'planning',
      category: 'Education'
    },
    {
      id: '5',
      title: 'Buy House',
      description: 'First home purchase',
      emoji: '🏠',
      estimatedCost: 300000,
      deadlineYear: 2027,
      deadlineMonth: 8,
      priorityLevel: 'high',
      status: 'planning',
      category: 'Home'
    }
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
          <p className="mt-4 text-gray-600">Loading your timeline...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const years = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2, currentYear + 3]
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  const getDreamsForMonth = (year: number, month: number) => {
    return dreams.filter(dream => 
      dream.deadlineYear === year && dream.deadlineMonth === month
    )
  }

  const getTotalValueForMonth = (year: number, month: number) => {
    const monthDreams = getDreamsForMonth(year, month)
    return monthDreams.reduce((sum, dream) => sum + dream.estimatedCost, 0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'on_hold':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <Target className="w-4 h-4 text-purple-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Timeline</h1>
            <p className="mt-2 text-gray-600">
              Visualize your dreams and goals across time
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setCurrentYear(currentYear - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentYear(new Date().getFullYear())}
            >
              {new Date().getFullYear()}
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentYear(currentYear + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Link href="/dreams/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Dream
              </Button>
            </Link>
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {currentYear} Timeline
            </h2>
            <div className="flex space-x-2">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setCurrentYear(year)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    year === currentYear
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Header Row */}
              <div className="grid grid-cols-13 bg-gray-50 border-b border-gray-200">
                <div className="p-4 font-medium text-gray-900 min-w-[200px]">Category</div>
                {months.map(month => (
                  <div key={month} className="p-4 text-center font-medium text-gray-900 min-w-[120px]">
                    {getMonthName(month)}
                  </div>
                ))}
              </div>

              {/* Timeline Rows */}
              {years.map(year => (
                <div key={year} className="border-b border-gray-200 last:border-b-0">
                  {/* Year Header */}
                  <div className="grid grid-cols-13 bg-purple-50">
                    <div className="p-3 font-semibold text-purple-900 min-w-[200px]">
                      {year}
                    </div>
                    {months.map(month => (
                      <div key={month} className="p-3 text-center text-sm text-purple-700 min-w-[120px]">
                        {getTotalValueForMonth(year, month) > 0 && (
                          <div className="text-xs">
                            ${getTotalValueForMonth(year, month).toLocaleString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Dreams for this year */}
                  {dreams.filter(dream => dream.deadlineYear === year).map(dream => (
                    <div key={dream.id} className="grid grid-cols-13 border-t border-gray-100 hover:bg-gray-50">
                      <div className="p-3 min-w-[200px]">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{dream.emoji}</span>
                          <div>
                            <div className="font-medium text-gray-900">{dream.title}</div>
                            <div className="text-sm text-gray-500">{dream.category}</div>
                                                       <div className="flex items-center space-x-2 mt-1">
                             <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(dream.priorityLevel)}`}>
                               {dream.priorityLevel}
                             </span>
                             <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(dream.status)}`}>
                               {dream.status.replace('_', ' ')}
                             </span>
                           </div>
                          </div>
                        </div>
                      </div>
                      {months.map(month => (
                        <div key={month} className="p-3 text-center min-w-[120px]">
                          {dream.deadlineMonth === month && (
                            <div className="bg-purple-100 rounded-lg p-2 border border-purple-200">
                              <div className="text-sm font-medium text-purple-900">
                                {formatCurrency(dream.estimatedCost)}
                              </div>
                              <div className="text-xs text-purple-600">
                                {getStatusIcon(dream.status)}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Dreams</p>
                <p className="text-2xl font-bold text-gray-900">{dreams.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${dreams.reduce((sum, dream) => sum + dream.estimatedCost, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Timeline Span</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...dreams.map(d => d.deadlineYear)) - Math.min(...dreams.map(d => d.deadlineYear)) + 1} years
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dreams.filter(d => d.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/dreams/new">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add New Dream
              </Button>
            </Link>
            <Link href="/dreamboards">
              <Button variant="outline">
                <Target className="w-4 h-4 mr-2" />
                View Dream Boards
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
