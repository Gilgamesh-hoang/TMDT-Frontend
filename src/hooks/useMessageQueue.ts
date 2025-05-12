import { useEffect, useRef, useState } from "react";

export const useMessageQueue = ({ timeout = 8000 }) => {
  const [messageQueue, setMessageQueue] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const messageSetRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (currentMessage === null && messageQueue.length > 0) {
      setCurrentMessage(messageQueue[0]);
      setMessageQueue((prev) => prev.slice(1));
    }
  }, [currentMessage, messageQueue]);
  useEffect(() => {
    if (currentMessage === null) return;
    const timer = setTimeout(() => {
      messageSetRef.current.delete(currentMessage);
      setCurrentMessage(null);
    }, timeout);
    return () => clearTimeout(timer);
  }, [currentMessage, timeout]);
  const addMessage = (message: string) => {
    if (!messageSetRef.current.has(message)) {
      messageSetRef.current.add(message);
      setMessageQueue((prev) => [...prev, message]);
    }
  };
  return {
    currentMessage,
    addMessage,
  };
};
