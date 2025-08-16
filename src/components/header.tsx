'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { DreamBoardLogo } from '@/components/ui/logo'
import { UserMenu } from '@/components/ui/user-menu'

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <DreamBoardLogo className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">DreamBoard</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/dreamboards" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dream Boards
            </Link>
            <Link 
              href="/timeline" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Timeline
            </Link>
            <Link 
              href="/analytics" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Analytics
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session?.user ? (
              <UserMenu user={session.user} onSignOut={() => signOut()} />
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
