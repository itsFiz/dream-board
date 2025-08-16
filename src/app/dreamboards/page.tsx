'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Search, 
  Grid3X3,
  List,
  MoreVertical,
  Eye,
  Edit,
  Share2
} from 'lucide-react'
import Link from 'next/link'

interface DreamBoard {
  id: string
  title: string
  description?: string
  isPublic: boolean
  createdAt: string
  dreams: Array<{
    id: string
    title: string
    emoji: string
    estimatedCost: number
    status: string
  }>
  incomeStreams: Array<{
    id: string
    name: string
    amount: number
  }>
}

export default function DreamBoardsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPublic, setFilterPublic] = useState<'all' | 'public' | 'private'>('all')

  // Mock data - replace with actual API call
  const [dreamboards] = useState<DreamBoard[]>([
    {
      id: '1',
      title: 'My Life Goals',
      description: 'A collection of my most important life goals and dreams',
      isPublic: false,
      createdAt: '2024-01-15',
      dreams: [
        { id: '1', title: 'New Electric Car', emoji: '🚗', estimatedCost: 45000, status: 'planning' },
        { id: '2', title: 'Vacation to Japan', emoji: '✈️', estimatedCost: 8000, status: 'planning' },
        { id: '3', title: 'Emergency Fund', emoji: '💰', estimatedCost: 15000, status: 'in_progress' }
      ],
      incomeStreams: [
        { id: '1', name: 'Full-time Job', amount: 6500 },
        { id: '2', name: 'Freelance Design', amount: 1500 }
      ]
    },
    {
      id: '2',
      title: 'Career Aspirations',
      description: 'Professional development and career advancement goals',
      isPublic: true,
      createdAt: '2024-02-01',
      dreams: [
        { id: '4', title: 'MBA Degree', emoji: '🎓', estimatedCost: 60000, status: 'planning' },
        { id: '5', title: 'Start Business', emoji: '💼', estimatedCost: 25000, status: 'planning' }
      ],
      incomeStreams: [
        { id: '3', name: 'Salary', amount: 8000 }
      ]
    },
    {
      id: '3',
      title: 'Home & Family',
      description: 'Dreams related to home ownership and family life',
      isPublic: false,
      createdAt: '2024-01-20',
      dreams: [
        { id: '6', title: 'Buy House', emoji: '🏠', estimatedCost: 300000, status: 'planning' },
        { id: '7', title: 'Family Vacation', emoji: '👨‍👩‍👧‍👦', estimatedCost: 12000, status: 'planning' }
      ],
      incomeStreams: [
        { id: '4', name: 'Combined Income', amount: 10000 }
      ]
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
          <p className="mt-4 text-gray-600">Loading your dream boards...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const filteredDreamboards = dreamboards.filter(board => {
    const matchesSearch = board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         board.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterPublic === 'all' || 
                         (filterPublic === 'public' && board.isPublic) ||
                         (filterPublic === 'private' && !board.isPublic)
    
    return matchesSearch && matchesFilter
  })

  const totalDreams = dreamboards.reduce((sum, board) => sum + board.dreams.length, 0)
  const totalValue = dreamboards.reduce((sum, board) => 
    sum + board.dreams.reduce((boardSum, dream) => boardSum + dream.estimatedCost, 0), 0
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dream Boards</h1>
            <p className="mt-2 text-gray-600">
              Organize and track your life goals and financial dreams
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/dreamboards/new">
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Dream Board</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Total Dream Boards</h3>
            <p className="text-2xl font-bold text-gray-900">{dreamboards.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Total Dreams</h3>
            <p className="text-2xl font-bold text-gray-900">{totalDreams}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search dream boards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={filterPublic}
                onChange={(e) => setFilterPublic(e.target.value as 'all' | 'public' | 'private')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Boards</option>
                <option value="public">Public Only</option>
                <option value="private">Private Only</option>
              </select>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-400'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dream Boards Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDreamboards.map((board) => (
              <div key={board.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{board.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{board.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full border ${
                          board.isPublic 
                            ? 'bg-green-200 text-green-800 border-green-300' 
                            : 'bg-gray-200 text-gray-800 border-gray-300'
                        }`}>
                          {board.isPublic ? 'Public' : 'Private'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(board.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Dreams:</span>
                      <span className="font-medium">{board.dreams.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Income Streams:</span>
                      <span className="font-medium">{board.incomeStreams.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total Value:</span>
                      <span className="font-medium">
                        ${board.dreams.reduce((sum, dream) => sum + dream.estimatedCost, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <Link href={`/dreamboards/${board.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <Share2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dream Board
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dreams
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDreamboards.map((board) => (
                    <tr key={board.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{board.title}</div>
                          <div className="text-sm text-gray-500">{board.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {board.dreams.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${board.dreams.reduce((sum, dream) => sum + dream.estimatedCost, 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full border ${
                          board.isPublic 
                            ? 'bg-green-200 text-green-800 border-green-300' 
                            : 'bg-gray-200 text-gray-800 border-gray-300'
                        }`}>
                          {board.isPublic ? 'Public' : 'Private'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link href={`/dreamboards/${board.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredDreamboards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No dream boards found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterPublic !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first dream board'
              }
            </p>
            {!searchTerm && filterPublic === 'all' && (
              <Link href="/dreamboards/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Dream Board
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
