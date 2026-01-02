import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import { useEffect } from "react";
import {useRef} from 'react';
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {

  
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const scrollRef = useRef(null);

  useEffect(()=>{
     
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
      
  },[messages])

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);

  return (
    <div className="flex flex-col h-full bg-[#0b0e14]">
      {/* Header */}
      <ChatHeader />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isMe = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`
                      chat-bubble relative max-w-[75%]
                      ${
                        isMe
                          ? "bg-slate-900 text-slate-100"
                          : "bg-[#141821] text-slate-200"
                      }
                    `}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="shared"
                        className="rounded-lg h-48 object-cover mb-2"
                      />
                    )}

                    {msg.text && (
                      <p className="text-sm leading-relaxed">
                        {msg.text}
                      </p>
                    )}

                    <p className=" text-[11px] mt-1 text-slate-400 flex justify-end">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
             <div ref={scrollRef}/> 
             {/* wohin use hoga jahan container scrollable hai */}
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>


      {/* Input */}
      <div className="border-t border-white/5 bg-[#0b0e14]">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;
