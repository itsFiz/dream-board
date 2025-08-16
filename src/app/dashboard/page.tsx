'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Target, 
  TrendingUp, 
  Calendar, 
  BarChart3,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

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
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const stats = [
    {
      title: 'Active Dreams',
      value: '12',
      change: '+2 this month',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Value',
      value: '$45,000',
      change: '+$5,000 this month',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Timeline Goals',
      value: '8',
      change: 'On track',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Progress Score',
      value: '78%',
      change: '+5% this week',
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const recentDreams = [
    {
      id: '1',
      title: 'New Car',
      category: 'Transportation',
      cost: '$25,000',
      deadline: '2025',
      progress: 60,
      emoji: '🚗'
    },
    {
      id: '2',
      title: 'Vacation to Japan',
      category: 'Travel',
      cost: '$5,000',
      deadline: '2024',
      progress: 80,
      emoji: '✈️'
    },
    {
      id: '3',
      title: 'Emergency Fund',
      category: 'Financial',
      cost: '$10,000',
      deadline: '2024',
      progress: 45,
      emoji: '💰'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session.user?.name || 'Dreamer'}! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here&apos;s what&apos;s happening with your dreams and goals today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/dreamboards/new">
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Dream Board</span>
              </Button>
            </Link>
            <Link href="/dreams/new">
              <Button variant="outline" className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Add New Dream</span>
              </Button>
            </Link>
            <Link href="/income/new">
              <Button variant="outline" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Add Income Stream</span>
              </Button>
            </Link>
            <Link href="/timeline">
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>View Timeline</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Dreams */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Dreams</h2>
              <Link href="/dreamboards" className="text-sm text-purple-600 hover:text-purple-500">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentDreams.map((dream) => (
                <div key={dream.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{dream.emoji}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{dream.title}</h3>
                      <p className="text-sm text-gray-500">{dream.category} • {dream.deadline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{dream.cost}</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${dream.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{dream.progress}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivation Section */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Today&apos;s Motivation</h2>
            </div>
            <div className="space-y-4">
              <blockquote className="text-gray-700 italic">
                &quot;The future belongs to those who believe in the beauty of their dreams.&quot;
              </blockquote>
              <p className="text-sm text-gray-600">
                You&apos;re making great progress! Keep pushing forward and remember why you started.
              </p>
              <div className="pt-4">
                <Link href="/analytics">
                  <Button variant="outline" size="sm" className="w-full">
                    View Your Progress
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Updated progress on &quot;New Car&quot; dream</span>
              <span className="text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Added new income stream: &quot;Freelance Design&quot;</span>
              <span className="text-gray-400">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Created new dream board: &quot;Career Goals&quot;</span>
              <span className="text-gray-400">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
