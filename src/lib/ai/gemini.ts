// hackathon-feb\src\lib\ai\gemini.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { mathTopics } from '@/utils/mathTopics';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateQuestion(
  topic: string,
  subtopic: string | null,
  difficulty: string,
  previousQuestion?: string
) {
  const topicData = mathTopics.find(t => t.title === topic);
  const actualSubtopic = subtopic || topicData?.subtopics[Math.floor(Math.random() * topicData?.subtopics.length)];

  const prompt = `Create a ${difficulty} level mathematics question for ${topic}, specifically about ${actualSubtopic}.
    ${previousQuestion ? `Previous question was: ${previousQuestion}. Create a different but related question.` : ''}
    
    Return only a valid JSON object with this exact structure:
    {
      "topic": "${topic}",
      "subtopic": "${actualSubtopic}",
      "difficulty": "${difficulty}",
      "question": "your question here",
      "options": ["first option", "second option", "third option", "fourth option"],
      "correctAnswer": "exact text of correct option",
      "explanation": "step-by-step solution"
    }`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Clean the response text
    const cleanedText = text
  .replace(/```json\n|\n```|```/g, '')
  .replace(/\\n/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
    const parsedData = JSON.parse(cleanedText);
    parsedData.subtopic = parsedData.subtopic || actualSubtopic;
    const validatedData = {
      topic: parsedData.topic || topic,
      subtopic: parsedData.subtopic || actualSubtopic,
      difficulty: parsedData.difficulty || difficulty,
      question: parsedData.question,
      options: parsedData.options || [],
      correctAnswer: parsedData.correctAnswer,
      explanation: parsedData.explanation || ''
    };
    // Validate required fields
    if (!parsedData.subtopic || !parsedData.topic || !parsedData.difficulty) {
      throw new Error('Missing required fields in generated question');
    }
    
    return validatedData;
  } catch (error) {
    console.error('Error generating question:', error);
    // Return a default question as fallback
    return {
      topic,
      subtopic,
      difficulty,
      question: `Basic ${topic} question about ${subtopic}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
      explanation: "Default explanation"
    };
  }
}
