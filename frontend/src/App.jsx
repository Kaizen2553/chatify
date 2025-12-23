import React from 'react'
import {Route,Routes,Navigate} from 'react-router';
import ChatPage from './pages/ChatPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import PageLoader from './components/PageLoader.jsx'
import {Toaster} from 'react-hot-toast';


const App = () => {
  const {checkAuth,isCheckingAuth,authUser} = useAuthStore();
  
  useEffect(()=>{
    checkAuth()
  },[]);

  console.log({authUser});

  if(isCheckingAuth)return <PageLoader/>
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden
  bg-[#0c0f14] text-slate-200 relative">

   
  <Routes>
    <Route path="/" element={authUser ? <ChatPage />:<Navigate to={"/login"}/>} />
    <Route path="/login" element={!authUser ? <LoginPage />:<Navigate to={"/"}/>} />
    <Route path="/signup" element={!authUser ? <SignUpPage />:<Navigate to={"/"}/>} />
  </Routes>

  <Toaster/>
</div>

  )
}

export default App