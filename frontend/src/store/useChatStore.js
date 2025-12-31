import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set,get)=>({
    allContacts:[],
    chats:[],
    messages:[],
    activeTab:"",
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isSoundEnabled:JSON.parse(localStorage.getItem("isSoundEnabled"))===true,


    toggleSound: ()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled);
        set({isSoundEnabled:!get().isSoundEnabled});
    },

    setActiveTab: (tab) => {
        set({activeTab:tab});
    },

    setSelectedUser: (selectedUser) => {
        set({selectedUser});
    },

    getAllContacts: async() => {
         set({isUsersLoading:true});
         try {
            const contacts = await axiosInstance.get('/message/contacts');
            set({allContacts:contacts.data});
           //toast.success('all contacts fetched');
         } catch (error) {
            console.log("error in getAllContacts in useChatStore");
           // toast.error(error.response.data.message);
         }finally{
            set({isUsersLoading:false});
         }
    },

    getMyChatPartners: async() => {
          set({isUsersLoading:true});
          try {
            const chatPartners = await axiosInstance.get('/message/chats')
            set({chats:chatPartners.data});
           // toast.success('chat partners fetched successfully');
          } catch (error) {
            toast.error(error.response.data.message);
            console.log("error in getMychatPartners");
          }finally{
            set({isUsersLoading:false});
          }
    }


}))