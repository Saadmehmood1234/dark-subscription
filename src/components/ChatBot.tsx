"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  success: boolean;
  message: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hi! I’m the Primeflix assistant. How can I help you with our premium subscription offers?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();

    if (!message || loading) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = (await response.json()) as ChatResponse;

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to contact the Primeflix assistant."
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed right-5 bottom-5 z-50">
      {isOpen && (
        <section className="absolute right-0 bottom-18 flex h-137.5 w-[calc(100vw-2.5rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#130d25] text-white shadow-2xl">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#1f1538] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-violet-600">
                <Bot className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">Primeflix Assistant</h2>

                <p className="text-xs text-white/60">
                  Ask about subscriptions and offers
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-violet-600 px-4 py-3 text-sm text-white"
                    : "mr-auto max-w-[85%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm text-white"
                }
              >
                <p className="whitespace-pre-wrap leading-6">
                  {message.content}
                </p>
              </div>
            ))}

            {loading && (
              <div className="mr-auto flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3">
                <span className="size-2 animate-bounce rounded-full bg-white/60" />
                <span className="size-2 animate-bounce rounded-full bg-white/60 [animation-delay:150ms]" />
                <span className="size-2 animate-bounce rounded-full bg-white/60 [animation-delay:300ms]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-white/10 bg-[#1f1538] p-4"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={1000}
              placeholder="Ask about Primeflix..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-violet-500 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex size-11 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="size-5" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close Primeflix chatbot" : "Open Primeflix chatbot"}
        className="flex size-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition hover:scale-105 hover:bg-violet-500"
      >
        {isOpen ? (
          <X className="size-6" />
        ) : (
          <MessageCircle className="size-6" />
        )}
      </button>
    </div>
  );
}