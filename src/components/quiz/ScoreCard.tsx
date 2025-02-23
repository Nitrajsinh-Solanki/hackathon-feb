// hackathon-feb\src\components\quiz\ScoreCard.tsx

import React from "react";
import { Question } from "@/lib/types/quiz";
import { useRouter } from "next/navigation";

interface ScoreCardProps {
  questions: Question[];
  answers: {
    questionId: number;
    selectedAnswer: string;
    isCorrect: boolean;
  }[];
}

export default function ScoreCard({ questions, answers }: ScoreCardProps) {
  const router = useRouter();
  const totalQuestions = questions.length;
  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-indigo-800">
            Quiz Complete!
          </h2>
          <div className="text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            {percentage}%
          </div>
          <p className="text-xl mt-4 text-gray-700">
            You got {correctAnswers} out of {totalQuestions} questions correct
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Question Review
          </h3>
          {questions.map((question, index) => {
            const answer = answers.find((a) => a?.questionId === index) || {
              selectedAnswer: "Not answered",
              isCorrect: false,
            };

            return (
              <div
                key={index}
                className={`p-6 rounded-xl border ${
                  answer.isCorrect
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <p className="font-medium text-lg mb-3">{question.question}</p>
                <p
                  className={`text-base ${
                    answer.isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  Your answer: {answer.selectedAnswer}
                </p>
                <p className="text-base text-indigo-700">
                  Correct answer: {question.correctAnswer}
                </p>
                <div className="mt-3 text-base text-gray-700">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-6 pt-4">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transform transition-all hover:scale-[1.02]"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/quiz/history")}
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 text-lg font-semibold rounded-lg hover:bg-indigo-50 transform transition-all hover:scale-[1.02]"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
}
