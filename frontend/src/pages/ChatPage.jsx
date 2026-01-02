import React from 'react'
import {useChatStore} from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatList from '../components/ChatList'
import ContactList from '../components/ContactList'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import ChatContainer from '../components/ChatContainer'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder'


function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    // 🔒 PAGE HEIGHT LOCKED
    <div className="h-screen w-full max-w-6xl mx-auto">
      
      <BorderAnimatedContainer className="h-full flex">
        
        {/* LEFT SIDEBAR */}
        <div className="w-80 flex flex-col bg-slate-900/50">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT CHAT PANEL */}
        <div className="flex-1 flex flex-col bg-slate-900/50">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>

      </BorderAnimatedContainer>
    </div>
  );
}


export default ChatPage