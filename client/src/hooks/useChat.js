import { useState, useCallback, useRef } from 'react';
import { createSession, sendMessage, notifyLead } from '../utils/api';

export function useChat() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [brief, setBrief] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const leadInfoRef = useRef({});
  const notifiedRef = useRef(false);

  const initSession = useCallback(async (leadInfo) => {
    setError(null);
    setIsLoading(true);
    try {
      const { sessionId: sid } = await createSession();
      setSessionId(sid);
      leadInfoRef.current = leadInfo;

      // Send init trigger to get Claude's opening message
      const res = await sendMessage(sid, '__INIT__', leadInfo);
      setMessages([{ role: 'assistant', content: res.message, id: Date.now() }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const send = useCallback(async (text) => {
    if (!sessionId || isLoading) return;
    setError(null);

    const userMsg = { role: 'user', content: text, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await sendMessage(sessionId, text, leadInfoRef.current);

      const assistantMsg = { role: 'assistant', content: res.message, id: Date.now() + 1 };
      setMessages((prev) => [...prev, assistantMsg]);

      if (res.brief) {
        setBrief(res.brief);

        // Auto-notify once when brief is generated
        if (!notifiedRef.current) {
          notifiedRef.current = true;
          notifyLead({
            leadInfo: leadInfoRef.current,
            transcript: [...messages, userMsg, assistantMsg],
            brief: res.brief,
            sessionId,
          }).catch((e) => console.warn('[notify] Failed to send lead email:', e.message));
        }
      }
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I'm having a moment of technical difficulty — please try sending your message again.", id: Date.now() + 1, isError: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isLoading, messages]);

  const updateLeadInfo = useCallback((info) => {
    leadInfoRef.current = { ...leadInfoRef.current, ...info };
  }, []);

  const reset = useCallback(() => {
    setSessionId(null);
    setMessages([]);
    setBrief(null);
    setError(null);
    setIsLoading(false);
    leadInfoRef.current = {};
    notifiedRef.current = false;
  }, []);

  return {
    sessionId,
    messages,
    brief,
    isLoading,
    error,
    leadInfo: leadInfoRef.current,
    initSession,
    send,
    updateLeadInfo,
    reset,
  };
}
