// hackathon-feb\src\app\dashboard\DashboardNavbar.tsx



"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserCircleIcon, PencilIcon, ChatBubbleLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ChatInterface from "@/components/chat/ChatInterface";
import { useState, useEffect } from "react";

export default function DashboardNavbar() {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/current');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        router.push(data.redirect);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="text-2xl font-bold text-indigo-600"
              >
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
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                Math Assistant
              </button>

              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Sidebar */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsProfileOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
            <div className="h-full flex flex-col py-6">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Profile</h2>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="rounded-md text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 px-4 flex-1">
                <div className="flex items-center space-x-3 mb-6">
                  <UserCircleIcon className="h-12 w-12 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-96 z-40">
          <ChatInterface onClose={() => setIsChatOpen(false)}/>
        </div>
      )}
    </>
  );
}
