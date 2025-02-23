// hackathon-feb\src\components\chat\ChatInterface.tsx




'use client';
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ChatMessage as ChatMessageType } from '@/lib/types/chat';
import { XMarkIcon } from '@heroicons/react/24/outline';


interface ChatInterfaceProps {
    onClose: () => void;
  }

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    const newMessage: ChatMessageType = { role: 'user', content };
    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response }
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="p-5 text-xl font-semibold text-black bg-gray-200 rounded-t-lg text-center">
        Math Genius AI Chat 🤖
        <button 
          onClick={onClose}
          className="absolute right-4 top-[5%] transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-300 transition-colors bg-red-600 text-gray-900 font-bold "
        >
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 italic">Ask me anything about Math!</p>
        )}
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="animate-pulse">Thinking</span>
            <span className="animate-pulse">.</span>
            <span className="animate-pulse">.</span>
            <span className="animate-pulse">.</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-5 border-t bg-gray-50 rounded-b-lg">
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
