import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DreamBoardLogo } from '@/components/ui/logo'
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Target,
      title: 'Visual Goal Planning',
      description: 'Create beautiful dream boards with drag-and-drop functionality to visualize your life goals.'
    },
    {
      icon: TrendingUp,
      title: 'Financial Integration',
      description: 'Track income streams and analyze affordability to make your dreams financially feasible.'
    },
    {
      icon: Calendar,
      title: 'Timeline Planning',
      description: 'Plan your goals across multi-year timelines with monthly granularity for detailed planning.'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your progress with comprehensive analytics and milestone celebrations.'
    }
  ]

  const benefits = [
    'Transform abstract goals into actionable plans',
    'Understand the financial requirements of your dreams',
    'Track income growth and optimize your financial strategy',
    'Visualize your future with beautiful, interactive timelines',
    'Stay motivated with progress tracking and achievements'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <DreamBoardLogo className="h-20 w-20" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Visualize Your Dreams,
            <span className="text-purple-600 block">Plan Your Future</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            DreamBoard combines goal-setting with financial planning to help you visualize, 
            plan, and track your personal goals and financial aspirations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Achieve Your Dreams
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to make goal planning intuitive, 
              financial planning accessible, and progress tracking motivating.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose DreamBoard?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Unlike traditional goal-tracking apps, DreamBoard provides a comprehensive 
                approach that combines visual planning with financial intelligence.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Your Dream Timeline</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">New Car</span>
                    <span className="text-sm text-purple-600">2025 • $25,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Vacation</span>
                    <span className="text-sm text-blue-600">2024 • $5,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Emergency Fund</span>
                    <span className="text-sm text-green-600">2024 • $10,000</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Income</span>
                    <span className="font-medium">$6,500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Planning Your Dreams?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who are already achieving their goals with DreamBoard.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Create Your First Dream Board
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
