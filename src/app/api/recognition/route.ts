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

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
      Analyze this handwritten mathematical expression and:
      1. Extract the exact mathematical expression
      2. Solve it step-by-step
      3. For integrals, identify limits and compute if applicable
      4. Format the response as:
      
      - **Recognized Expression:** (write the expression)
      - **Solution:** (step-by-step solution)
    `;

    const imageParts = [
      {
        inlineData: {
          data: Buffer.from(await imageBlob.arrayBuffer()).toString('base64'),
          mimeType: 'image/png'
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    const [expression, ...solutionParts] = text.split('\n\n') || [];

    return NextResponse.json({
      recognized: expression || 'No expression detected',
      solution: solutionParts.join('\n\n') || 'Unable to solve',
      debug: {
        imageSize: imageBlob.size,
        model: 'gemini-1.5-pro',
        apiStatus: response ? "Success" : "Failed"
      }
    });

  } catch (error) {
    console.error('Recognition error:', error);
    return NextResponse.json({
      recognized: 'Recognition failed',
      solution: 'Try again with clearer handwriting',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
