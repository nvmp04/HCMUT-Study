import React, { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export default function AIchatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [unread, setUnread] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    if (!input.trim()) return;
    const id = String(Date.now());
    const text = input.trim();
    setMessages((m) => [...m, { id, from: "user", text }]);
    setInput("");

    try {
      const res = await puter.ai.chat(text);
      const reply = res.message.content;
      setMessages((m) => [...m, { id: id + "-ai", from: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { id: id + "-error", from: "bot", text: "Lỗi khi gọi Puter AI." }]);
    }
  }

  function clearChat() {
    setMessages([]);
    setUnread(0);
  }

  return (
    <div className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10">
      {open && (
        <div className="w-[320px] md:w-[380px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
          <div className="flex items-center justify-between px-3 py-2 bg-blue-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#014181] rounded-xl text-white">
                <MessageSquare size={18} />
              </div>
              <div>
                <div className="font-semibold text-sm">AI Chatbot</div>
                <div className="text-xs text-muted-foreground">Trợ lý sẵn sàng</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMinimized((v) => !v)}
                className="p-2 rounded-lg hover:bg-black/5"
              >
                {minimized ? "Mở" : "Rút"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-black/5"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!minimized && (
            <div className="flex flex-col h-[360px] md:h-[420px] bg-white">
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.length === 0 && (
                  <div className="text-center text-sm text-neutral-500 mt-8">
                    Chào! Gửi câu hỏi để bắt đầu cuộc trò chuyện.
                  </div>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                    <div
                      className={
                        "max-w-[80%] px-3 py-2 rounded-xl text-sm " +
                        (m.from === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-gray-100 text-neutral-900 rounded-bl-none")
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-100">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                    placeholder="Gõ tin nhắn..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:brightness-110"
                  >
                    <Send size={14} />
                    <span className="hidden sm:inline">Gửi</span>
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                  <button onClick={clearChat} className="underline">
                    Xóa chat
                  </button>
                  <div>{messages.length} tin nhắn</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!open && (
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl ring-1 ring-black/6 bg-[#014181] text-white hover:scale-105 transition-transform"
          title="Mở AI Chatbot"
        >
          <MessageSquare size={20} />

          {unread > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-[10px] font-semibold rounded-full bg-red-500 shadow-sm">
              {unread}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
