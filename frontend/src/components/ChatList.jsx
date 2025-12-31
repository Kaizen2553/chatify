import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UsersLoadingSkeletion";
import NoChatsFoundSkeleton from "./NoChatsFoundSkeleton";
import image from '../assets/images.jpg'

function ChatList() {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
    selectedUser,
  } = useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFoundSkeleton />;

  return (
    <div className="flex flex-col gap-2 bg-[#0b0e14] p-3 rounded-xl">
      {chats.map((chat) => {
        const isActive = selectedUser?._id === chat._id;

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={`
              flex items-center gap-3 p-3 rounded-lg cursor-pointer
              transition-all duration-200
              ${
                isActive
                  ? "bg-cyan-500/15 ring-1 ring-cyan-500/30"
                  : "hover:bg-white/5"
              }
            `}
          >
            {/* Avatar */}
            <div className="avatar online">
              <div className="size-11 rounded-full ring-1 ring-white/10">
                <img
                  src={chat.profileImg || image}
                  alt={chat.fullName}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-200 truncate">
                {chat.fullName}
              </h4>
              <p className="text-xs text-slate-400 truncate">
                Tap to chat
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
