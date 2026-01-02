import React, { useEffect } from "react";
import image from "../assets/images.jpg";
import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setSelectedUser]);

  return (
    <div
      className="
        flex items-center justify-between
        h-[72px] px-6
        bg-[#0b0e14]
        border-b border-white/5
      "
    >
      {/* Left: User Info */}
      <div className="flex items-center gap-3">
        <div className="avatar online">
          <div className="w-11 rounded-full ring-1 ring-white/10">
            <img
              src={selectedUser.profileImg || image}
              alt={selectedUser.fullName}
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-medium text-slate-200 truncate">
            {selectedUser.fullName}
          </h3>
          <p className="text-xs text-emerald-400">online</p>
        </div>
      </div>

      {/* Right: Close */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-md hover:bg-white/5 transition"
      >
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200" />
      </button>
    </div>
  );
}

export default ChatHeader;
