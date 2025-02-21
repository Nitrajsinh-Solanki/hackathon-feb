// hackathon-feb\src\app\dashboard\page.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomQuizSection from "./CustomQuizSection";
import DashboardNavbar from "./DashboardNavbar";
import TopicCard from "./TopicCard";
import { mathTopics } from "@/utils/mathTopics";

export default function Dashboard() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      setIsLoading(false);
    } catch (error) {
      router.push('/login');
    }
  };

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "basic", name: "Basic" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  const filteredTopics =
    selectedCategory === "all"
      ? mathTopics
      : mathTopics.filter(
          (topic) =>
            topic.difficulty.toLowerCase() === selectedCategory.toLowerCase()
        );

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Mathematics Topics
            </h1>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedCategory === category.id
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map((topic, index) => (
              <TopicCard key={topic.id} {...topic} />
            ))}
          </div>

          <div className="mt-12">
            <CustomQuizSection />
          </div>
        </div>
      </main>
    </div>
  );
}
