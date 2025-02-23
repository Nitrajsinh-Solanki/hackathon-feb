// hackathon-feb\src\lib\types\chat.ts



export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
  }
  
  export interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
  }
  