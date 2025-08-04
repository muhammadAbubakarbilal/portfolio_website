"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage: Message = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const chatbotApiUrl = import.meta.env.VITE_CHATBOT_API_URL;
      if (!chatbotApiUrl) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ API URL not set. Please set VITE_CHATBOT_API_URL." },
        ]);
        return;
      }

      const res = await fetch(`${chatbotApiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const botMessage: Message = {
        sender: "bot",
        text: data.response || "🤖 No response from AI.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Failed to connect to chatbot." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
      >
        💬 Chat
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 w-[370px] max-w-[95%] h-[400px] bg-white border border-gray-300 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-t-2xl">
              <h2 className="font-semibold text-lg">Chat with me</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold hover:text-pink-200"
              >
                ×
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line shadow ${
                    msg.sender === "user"
                      ? "ml-auto bg-blue-600 text-white rounded-br-none"
                      : "mr-auto bg-white text-gray-800 border rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Section */}
            <div className="p-4 border-t bg-white">
              <textarea
                rows={2}
                placeholder="Ask me anything..."
                className="w-full p-3 border border-gray-300 rounded-xl text-sm text-black bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleAsk}
                disabled={loading}
                className="mt-3 w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium py-2 rounded-xl hover:brightness-110 transition-all duration-200 disabled:opacity-60"
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
