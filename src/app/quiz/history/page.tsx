// hackathon-feb\src\app\quiz\history\page.tsx


'use client';

import React, { useEffect, useState } from 'react';
import QuizHistory from '@/components/quiz/QuizHistory';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const userResponse = await fetch('/api/user/current');
      const userData = await userResponse.json();
      
      if (!userData.userId) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`/api/quiz/history?userId=${userData.userId}`);
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return <QuizHistory history={history} />;
}
