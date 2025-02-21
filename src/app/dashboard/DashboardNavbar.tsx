// hackathon-feb\src\app\dashboard\DashboardNavbar.tsx






'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function DashboardNavbar() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (response.ok) {
        router.push(data.redirect)
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
              Math Genius
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/handwriting"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Handwriting Recognition
            </Link>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Logout
            </button>

            <button className="p-2 rounded-full hover:bg-gray-100">
              <UserCircleIcon className="h-8 w-8 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
