// hackathon-feb\src\utils\canvasUtils.ts



export function drawOnCanvas(
    clientX: number,
    clientY: number,
    context: CanvasRenderingContext2D,
    isStarting: boolean
  ) {
    const rect = context.canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
  
    if (isStarting) {
      context.beginPath();
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
      context.stroke();
    }
  }
  
  export function clearCanvas(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  export function setCanvasProperties(
    context: CanvasRenderingContext2D,
    color: string = '#000000',
    lineWidth: number = 2
  ) {
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';
  }
  
  export function resizeCanvas(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    setCanvasProperties(context);
  }
  
  export async function getCanvasImage(
    canvas: HTMLCanvasElement
  ): Promise<Blob> {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });
  }
  