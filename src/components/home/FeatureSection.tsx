// hackathon-feb\src\components\home\FeatureSection.tsx

export default function FeatureSection() {
    const features = [
      {
        title: "AI-Generated Questions",
        description: "Unique questions generated based on your performance and learning needs.",
        icon: "🤖",
      },
      {
        title: "Adaptive Learning",
        description: "System adapts to your skill level and provides personalized practice.",
        icon: "📈",
      },
      {
        title: "Real-time Feedback",
        description: "Get instant feedback and detailed solutions for every question.",
        icon: "⚡",
      },
      {
        title: "Progress Tracking",
        description: "Track your improvement and identify areas that need more practice.",
        icon: "📊",
      },
    ]
  
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose MathGenius AI?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Experience the future of mathematics learning
            </p>
          </div>
  
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="pt-6"
                >
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg text-4xl">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  