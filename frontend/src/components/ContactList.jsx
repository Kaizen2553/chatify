import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UsersLoadingSkeletion";
import NoContactsFound from "./NoContactsFound";
import image from '../assets/images.jpg'

function ContactList() {
  const {
    getAllContacts,
    allContacts,
    isUsersLoading,
    setSelectedUser,
    selectedUser,
  } = useChatStore();

  useEffect(() => {
    getAllContacts();
  },[getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (allContacts.length === 0) return <NoContactsFound />;

  return (
    <div className="flex flex-col gap-2 bg-[#0b0e14] p-3 rounded-xl">
      {allContacts.map((contact) => {
        const isActive = selectedUser?._id === contact._id;

        return (
          <div
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
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
                  src={contact.profileImg || image}
                  alt={contact.fullName}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-200 truncate">
                {contact.fullName}
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

export default ContactList;
