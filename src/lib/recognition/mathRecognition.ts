// hackathon-feb\src\lib\recognition\mathRecognition.ts


export interface RecognitionResult {
    recognized: string;
    solution: string;
  }
  
  export async function recognizeMathExpression(imageData: Blob): Promise<RecognitionResult> {
    const formData = new FormData();
    formData.append('image', imageData);
  
    try {
      const response = await fetch('/api/recognition', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      return {
        recognized: data.recognized || '',
        solution: data.solution || ''
      };
    } catch (error) {
      console.error('Math recognition failed:', error);
      return {
        recognized: 'Recognition system ready',
        solution: 'Draw your expression to get started'
      };
    }
  }
  
  export function formatMathExpression(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\^(\d+)/g, '^($1)')
      .replace(/sqrt/g, '√')
      .trim();
  }
  