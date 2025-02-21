// hackathon-feb\src\components\common\Navbar.tsx

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              MathGenius AI
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
