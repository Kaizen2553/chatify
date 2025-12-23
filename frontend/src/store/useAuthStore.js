import {create}  from 'zustand';
import {axiosInstance} from '../lib/axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    
   authUser:null,
   isCheckingAuth:true,
   isSigningUp:false,
   isLoggingIn:false,
   isLoggingOut:false,

   checkAuth: async()=>{

        try{
           const res  = await axiosInstance.get('/auth/check');
           set({authUser:res.data})
        }catch(error){
            console.log("error in auth check",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false})
        }

   },

   signup : async(data) => {
      
     // await data.json();
      set({isSigningUp:true});
      try{
         const res = await axiosInstance.post("/auth/signup",data);
         set({authUser:res.data});
         toast.success("account created successfully");
         //todo notification 
      }catch(error){
         toast.error(error.response.data.message);
      }finally{
        set({isSigningUp:false});
      }
   },

   login: async(data) => {
      set({isLoggingIn:true})
      try{
         const res = await axiosInstance.post('/auth/login',data);
         set({authUser:res.data});
         toast.success("log in successfull");
      }catch(error){
         toast.error(error.response.data.message);
      }finally{
         set({isLoggingIn:false});
      }
   },

   logout: async () => {
   
      try{
         const res = await axiosInstance.post('/auth/logout');
         set({authUser:null})
         toast.success('logout successfull');
      }catch(error){
         toast.error(error.response.data.message);
      }
   }

}))