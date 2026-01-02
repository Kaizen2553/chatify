import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const contacts = await axiosInstance.get("/message/contacts");
      set({ allContacts: contacts.data });
      //toast.success('all contacts fetched');
    } catch (error) {
      console.log("error in getAllContacts in useChatStore");
      // toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const chatPartners = await axiosInstance.get("/message/chats");
      set({ chats: chatPartners.data });
      // toast.success('chat partners fetched successfully');
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in getMychatPartners");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const messages = await axiosInstance.get(`/message/${userId}`);
      set({ messages: messages.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in getMessagesByUserId");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (message) => {
    set({ isSendingMessage: true });

    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: message.text,
      image: message.image,
      createdAt: Date.now(),
      isTemp: true,
    };

    // ✅ 1. Optimistic update (IMMEDIATE UI UPDATE)
    set((state) => ({
      messages: [...state.messages, optimisticMessage],
    }));

    try {
      // 2. Send to backend
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        message
      );

      const savedMessage = res.data;

      // ✅ 3. Replace temp message with real one
      set((state) => ({
        messages: state.messages.map((m) =>
          m._id === tempId ? savedMessage : m
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");

      // ❌ rollback optimistic message
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== tempId),
      }));
    } finally {
      set({ isSendingMessage: false });
    }
  },
}));
