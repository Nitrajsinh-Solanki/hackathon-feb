// hackathon-feb\src\app\dashboard\TopicCard.tsx

interface TopicCardProps {
    title: string
    description: string
    icon: string
    difficulty: string
  }
  
  export default function TopicCard({ title, description, icon, difficulty }: TopicCardProps) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-4xl">{icon}</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {difficulty}
              </span>
            </div>
          </div>
          
          <p className="mt-3 text-sm text-gray-500">
            {description}
          </p>
          
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              Start Practice
            </button>
          </div>
        </div>
      </div>
    )
  }
  