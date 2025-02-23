// hackathon-feb\src\components\quiz\ScoreCard.tsx


import React from "react";
import { Question } from "@/lib/types/quiz";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

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
  const [saved, setSaved] = useState(false);
  const [saveAttempted, setSaveAttempted] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("Quiz Results", 105, 15, { align: "center" });

    // Score Summary
    doc.setFontSize(14);
    doc.text(`Score: ${percentage}%`, 20, 25);
    doc.text(`Correct Answers: ${correctAnswers}/${totalQuestions}`, 20, 35);

    // Table Headers
    let yPos = 50;
    doc.setFontSize(12);
    doc.text("Q#", 20, yPos);
    doc.text("Question", 30, yPos);
    doc.text("Your Answer", 110, yPos);
    doc.text("Correct Answer", 150, yPos);

    yPos += 10;
    doc.line(20, yPos, 190, yPos); // Horizontal line separator
    yPos += 5;

    // Table Data
    questions.forEach((question, index) => {
      const answer = answers.find((a) => a?.questionId === index) || {
        selectedAnswer: "Not answered",
        isCorrect: false,
      };

      doc.text(`${index + 1}`, 20, yPos);
      const questionText = doc.splitTextToSize(question.question, 70);
      doc.text(questionText, 30, yPos);

      const userAnswer = doc.splitTextToSize(answer.selectedAnswer, 30);
      doc.text(userAnswer, 110, yPos);

      const correctAnswer = doc.splitTextToSize(question.correctAnswer, 30);
      doc.text(correctAnswer, 150, yPos);

      yPos += Math.max(questionText.length, userAnswer.length, correctAnswer.length) * 6 + 5;

      // Explanation (Optional)
      if (question.explanation) {
        const explanationText = doc.splitTextToSize(`Explanation: ${question.explanation}`, 170);
        doc.text(explanationText, 30, yPos);
        yPos += explanationText.length * 6 + 5;
      }

      // Add a line between rows
      doc.line(20, yPos, 190, yPos);
      yPos += 5;

      // Add a new page if needed
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });

    // Save the PDF
    doc.save(`quiz-results-${Date.now()}.pdf`);
  };

  useEffect(() => {
    if (!saveAttempted) {
      const saveQuizResults = async () => {
        try {
          const userResponse = await fetch("/api/user/current");
          const userData = await userResponse.json();

          const quizData = {
            userId: userData.userId,
            topic: questions[0].topic,
            subtopic: questions[0].subtopic,
            difficulty: questions[0].difficulty,
            questions: questions.map((q, index) => ({
              question: q.question,
              userAnswer: answers[index]?.selectedAnswer || "Not answered",
              correctAnswer: q.correctAnswer,
              isCorrect: answers[index]?.isCorrect || false,
              explanation: q.explanation,
            })),
            score: correctAnswers,
            totalQuestions,
            percentage,
            timeTaken: Date.now(),
            completedAt: new Date(),
          };

          const response = await fetch("/api/quiz/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quizData),
          });

          if (response.ok) {
            setSaved(true);
          }
        } catch (error) {
          console.error("Error saving quiz history:", error);
        }
        setSaveAttempted(true);
      };

      saveQuizResults();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">Quiz Complete!</h2>
          <div className="text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            {percentage}%
          </div>
          <p className="text-xl mt-4 text-black">
            You got {correctAnswers} out of {totalQuestions} questions correct
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-black">Question Review</h3>
          {questions.map((question, index) => {
            const answer = answers.find((a) => a?.questionId === index) || {
              selectedAnswer: "Not answered",
              isCorrect: false,
            };

            return (
              <div
                key={index}
                className={`p-6 rounded-xl border ${
                  answer.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <p className="font-medium text-lg mb-3 text-black">{question.question}</p>
                <p className={`text-base ${answer.isCorrect ? "text-green-700" : "text-red-700"}`}>
                  Your answer: {answer.selectedAnswer}
                </p>
                <p className="text-base text-indigo-700">Correct answer: {question.correctAnswer}</p>
                <div className="mt-3 text-base text-black">
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
            onClick={generatePDF}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-green-700 hover:to-teal-700 transform transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
