// hackathon-feb\src\app\quiz\history\page.tsx

'use client';
import React, { useEffect, useState } from 'react';
import QuizHistory from '@/components/quiz/QuizHistory';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // First fetch user data once
  useEffect(() => {
    const getUser = async () => {
      const userResponse = await fetch('/api/user/current');
      const userData = await userResponse.json();
      setUserId(userData.userId);
    };
    getUser();
  }, []);

  // Then fetch history when we have userId
  useEffect(() => {
    if (userId) {
      const fetchHistory = async () => {
        try {
          const response = await fetch(`/api/quiz/history?userId=${userId}`);
          const data = await response.json();
          setHistory(data);
        } catch (error) {
          console.error('Error fetching history:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [userId]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return <QuizHistory history={history} />;
}
