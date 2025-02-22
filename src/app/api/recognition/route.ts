// hackathon-feb\src\app\api\recognition\route.ts













import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

    const base64Image = Buffer.from(await imageBlob.arrayBuffer()).toString('base64');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are a mathematical expression recognition AI. Your goal is to:
            1. Accurately extract the handwritten mathematical expression from the provided image.
            2. Solve the expression step-by-step.
            3. If it is an integral, identify limits and compute the definite integral if applicable.
            4. Ensure precision in recognizing numbers, symbols, limits, and operations including calculus, algebra, and equations.
            5. Format the result like this:
            
            - **Recognized Expression:** (write the correct mathematical expression)
            - **Solution:** (step-by-step breakdown of the solution)
          `
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Recognize and solve this handwritten mathematical integral."
            },
            {
              type: "image_url",
              image_url: { url: `data:image/png;base64,${base64Image}` }
            }
          ]
        }
      ],
      max_tokens: 1200,
      temperature: 0.1
    });

    const result = response.choices?.[0]?.message?.content || 'No response from AI';
    const [expression, ...solutionParts] = result.split('\n\n') || [];

    return NextResponse.json({
      recognized: expression || 'No expression detected',
      solution: solutionParts.join('\n\n') || 'Unable to solve',
      debug: {
        imageSize: imageBlob.size,
        model: 'gpt-4o',
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
