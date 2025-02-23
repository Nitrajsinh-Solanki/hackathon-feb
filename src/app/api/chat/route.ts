// hackathon-feb\src\app\api\chat\route.ts


import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a friendly math tutor. Respond in a conversational way without using markdown formatting or bullet points.
      Keep explanations brief and direct. For calculations, simply show the steps in plain text.
      
      For example, if someone asks "what is 4 + 4?", respond like this:
      "Let me help you with that! 4 plus 4 equals 8. It's a simple addition where we combine the two numbers."
      
      Here's the student's question: ${message}
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 200,
      }
    });

    const response = await result.response;
    const text = response.text();

    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/```/g, '')
      .replace(/\n\n/g, ' ')
      .trim();

    return NextResponse.json({ response: cleanText });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}
