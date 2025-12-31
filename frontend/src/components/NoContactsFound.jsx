import { MessageCircleIcon, UserPlusIcon, ArrowRightIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFoundSkeleton() {
  const { setActiveTab } = useChatStore();

  return (
    <div
      className="flex flex-col items-center justify-center h-full 
                 text-center p-6 animate-pulse"
    >
      {/* Main icon */}
      <div
        className="size-20 rounded-full bg-slate-800 
                   flex items-center justify-center mb-6"
      >
        <MessageCircleIcon className="w-10 h-10 text-slate-600" />
      </div>

      {/* Title */}
      <div className="h-4 w-44 bg-slate-800 rounded mb-4" />

      {/* Subtitle */}
      <div className="space-y-2 mb-6">
        <div className="h-3 w-64 bg-slate-700 rounded" />
        <div className="h-3 w-52 bg-slate-700 rounded mx-auto" />
      </div>

      {/* Action button */}
      <button
        onClick={() => setActiveTab("contacts")}
        className="flex items-center gap-2 px-5 py-2.5 
                   rounded-full bg-slate-800 hover:bg-slate-700
                   text-slate-200 text-sm font-medium 
                   transition animate-none"
      >
        <UserPlusIcon className="w-4 h-4" />
        No contacts found!!!
        <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

export default NoChatsFoundSkeleton;
