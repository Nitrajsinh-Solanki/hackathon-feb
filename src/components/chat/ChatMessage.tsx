// hackathon-feb\src\components\chat\ChatMessage.tsx


import React from 'react';
import { ChatMessage as ChatMessageType } from '@/lib/types/chat';

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${
        isUser ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
