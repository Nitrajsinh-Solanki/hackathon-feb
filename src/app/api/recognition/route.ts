// hackathon-feb\src\app\api\recognition\route.ts







import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageBlob = formData.get('image') as Blob;
    
    if (!imageBlob || imageBlob.size === 0) {
      return NextResponse.json({
        recognized: 'No image data received',
        solution: 'Please draw something on the canvas first'
      });
    }

    const imageBytes = await imageBlob.arrayBuffer();
    const base64Image = Buffer.from(imageBytes).toString('base64');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Focus on the handwritten content in this image.
      1. First, describe exactly what you see written
      2. If it's a mathematical expression:
         - Identify the type (equation, arithmetic, algebra, calculus)
         - Show the complete solution with steps
      3. If it's text:
         - Provide the transcribed text
         - Give relevant mathematical context if applicable

      Format your response as:
      WRITTEN CONTENT: [exact transcription of what you see]
      ANALYSIS: [solution or explanation]
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Image
        }
      },
      { text: prompt }
    ]);

    const response = await result.response;
    const text = response.text();

    let recognizedContent = '';
    let analysis = '';

    if (text.includes('WRITTEN CONTENT:')) {
      recognizedContent = text.split('WRITTEN CONTENT:')[1].split('ANALYSIS:')[0].trim();
      analysis = text.split('ANALYSIS:')[1]?.trim() || 'Processing the content...';
    } else {
      recognizedContent = text;
      analysis = 'Write clearly for better recognition';
    }

    return NextResponse.json({
      recognized: recognizedContent,
      solution: analysis
    });

  } catch (error) {
    console.error('Recognition error:', error);
    return NextResponse.json({
      recognized: 'Recognition system active',
      solution: 'Write or draw on the canvas to begin'
    });
  }
}
