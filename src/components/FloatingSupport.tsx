"use client";

import {
  Bot,
  ChevronDown,
  Headphones,
  LoaderCircle,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  success: boolean;
  message: string;
}

const suggestedQuestions = [
  "What subscriptions are available?",
  "How long does delivery take?",
  "How does the warranty work?",
];

const createId = () => {
  if (
    typeof crypto !== "undefined" &&
    "randomUUID" in crypto
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
};

const FloatingSupport = () => {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: createId(),
      role: "assistant",
      content:
        "Hi! I’m the PrimeFlix assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const whatsappNumber = "919773834796";

  const whatsappMessage =
    "Hello, I need help with a PrimeFlix subscription.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (isChatOpen) {
      setIsSupportOpen(false);

      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isChatOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsChatOpen(false);
        setIsSupportOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const sendMessage = async (message: string) => {
    const cleanMessage = message.trim();

    if (!cleanMessage || loading) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: cleanMessage,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: cleanMessage,
        }),
      });

      const data = (await response.json()) as ChatResponse;

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to contact the PrimeFlix assistant.",
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: createId(),
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
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    await sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <motion.button
            type="button"
            aria-label="Close chatbot"
            onClick={() => setIsChatOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 bg-black/55 backdrop-blur-sm sm:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-heading"
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.97,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed inset-x-3 bottom-[calc(5.75rem+env(safe-area-inset-bottom))]
              z-80 flex h-[min(650px,calc(100dvh-8rem))]
              flex-col overflow-hidden rounded-3xl border border-white/10
              bg-[#130D21] text-white shadow-2xl shadow-black/50
              sm:inset-x-auto sm:bottom-24 sm:right-5 sm:h-155 sm:w-97.5
            "
          >
            <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative grid size-10 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-violet-500 to-purple-700 shadow-lg shadow-purple-950/30">
                  <Bot className="size-5" />

                  <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#1A1029] bg-emerald-400" />
                </div>

                <div className="min-w-0">
                  <h2
                    id="chatbot-heading"
                    className="truncate text-sm font-semibold sm:text-base"
                  >
                    PrimeFlix Assistant
                  </h2>

                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/45">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Online and ready to help
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chatbot"
                className="grid size-9 cursor-pointer shrink-0 place-items-center rounded-xl text-white/50 transition hover:bg-white/8 hover:text-white"
              >
                <ChevronDown className="size-5 sm:hidden" />
                <X className="hidden size-5 sm:block" />
              </button>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={[
                      "flex",
                      isUser
                        ? "justify-end"
                        : "justify-start",
                    ].join(" ")}
                  >
                    {!isUser && (
                      <div className="mr-2 mt-1 grid size-7 shrink-0 place-items-center rounded-lg bg-purple-400/10 text-purple-300">
                        <Bot className="size-3.5" />
                      </div>
                    )}

                    <div
                      className={[
                        "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6",
                        isUser
                          ? "rounded-br-md bg-linear-to-br from-violet-500 to-purple-600 text-white"
                          : "rounded-bl-md border border-white/8 bg-white/5.5 text-white/80",
                      ].join(" ")}
                    >
                      <p className="whitespace-pre-wrap wrap-break-words">
                        {message.content}
                      </p>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="mr-2 mt-1 grid size-7 place-items-center rounded-lg bg-purple-400/10 text-purple-300">
                    <Bot className="size-3.5" />
                  </div>

                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/8 bg-white/5.5 px-4 py-3">
                    <span className="size-1.5 animate-bounce rounded-full bg-white/50" />
                    <span className="size-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:120ms]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:240ms]" />
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="pt-1">
                  <p className="mb-2 text-xs font-medium text-white/35">
                    You can ask:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => sendMessage(question)}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-left text-xs text-white/55 transition hover:border-purple-400/30 hover:bg-purple-400/10 hover:text-purple-100"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-white/2.5 p-3 sm:p-4"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/15 p-1.5 transition focus-within:border-purple-400/50 focus-within:ring-4 focus-within:ring-purple-400/8">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  maxLength={1000}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="min-h-10 min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-violet-500 to-purple-600 text-white shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </button>
              </div>

              <p className="mt-2 text-center text-[10px] text-white/25">
                Responses may occasionally be inaccurate.
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
      <div
        className="
          fixed right-3 z-60
          bottom-[calc(5.25rem+env(safe-area-inset-bottom))]
          sm:bottom-6 sm:right-5
        "
      >
        <AnimatePresence>
          {isSupportOpen && !isChatOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 8,
                scale: 0.95,
              }}
              transition={{ duration: 0.2 }}
              className="mb-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#171022]/98 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
            >
              <p className="px-3 pb-2 pt-1 text-xs font-medium text-white/35">
                How can we help?
              </p>

              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/7"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-purple-400/10 text-purple-300">
                  <MessageCircle className="size-5" />
                </span>

                <span>
                  <span className="block text-sm font-semibold text-white">
                    Chat with us
                  </span>

                  <span className="mt-0.5 block text-xs text-white/35">
                    Ask about plans
                  </span>
                </span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsSupportOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/7"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-[#25D366]">
                  <FaWhatsapp className="size-5" />
                </span>

                <span>
                  <span className="block text-sm font-semibold text-white">
                    WhatsApp
                  </span>

                  <span className="mt-0.5 block text-xs text-white/35">
                    Talk to support
                  </span>
                </span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-end gap-2">
          {/* <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact PrimeFlix on WhatsApp"
            className="hidden size-12 items-center justify-center rounded-full border border-white/10 bg-[#25D366] text-white shadow-xl shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#20bd5a] sm:flex"
          >
            <FaWhatsapp className="size-5" />
          </a> */}

          <button
            type="button"
            onClick={() => {
              if (isChatOpen) {
                setIsChatOpen(false);
                return;
              }

              setIsSupportOpen((current) => !current);
            }}
            aria-expanded={isSupportOpen || isChatOpen}
            aria-label={
              isChatOpen
                ? "Close customer support"
                : "Open customer support"
            }
            className="group flex h-13 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-linear-to-r from-violet-600 to-purple-700 px-4 text-white shadow-xl shadow-purple-950/35 transition hover:-translate-y-0.5 hover:shadow-2xl sm:size-14 sm:justify-center sm:px-0"
          >
            {isChatOpen || isSupportOpen ? (
              <X className="size-5" />
            ) : (
              <>
                <Headphones className="size-5" />

                {/* <span className="text-sm font-semibold sm:hidden">
                  Help
                </span> */}
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingSupport;