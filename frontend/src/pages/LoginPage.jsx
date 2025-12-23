import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  LoaderIcon,
} from "lucide-react";
function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-black">
      {/* 🔒 size fixed exactly to box */}
      <div className="relative w-full max-w-3xl md:h-[520px] h-[460px] overflow-hidden">
        {/* ✨ animated border stays, but clipped */}
        <BorderAnimatedContainer>
          <div
            className="w-full h-full flex flex-col md:flex-row 
                      bg-[#0b0e14] rounded-xl overflow-hidden
                      shadow-none"
          >
            {/* Left Section */}
            <div
              className="md:w-1/2 p-8 flex items-center justify-center
                        border-r border-white/5"
            >
              <div className="w-full max-w-sm">
                {/* Header */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-11 h-11 mx-auto text-slate-500 mb-3" />
                  <h2 className="text-xl font-semibold text-slate-200 mb-1 tracking-tight">
                    Login to your Account
                  </h2>
                  <p className="text-sm text-slate-400">Login</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block mb-2 text-xs uppercase tracking-wider text-slate-400">
                      Email
                    </label>

                    <div className="relative">
                      <MailIcon className="auth-input-icon text-slate-500" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email123@email.com"
                        className="
                      w-full rounded-md
                      bg-[#05070b]
                      text-slate-200
                      placeholder:text-slate-600
                      px-10 py-2.5
                      text-sm
                      border border-white/5
                      focus:outline-none
                      focus:border-slate-500/40
                      focus:ring-1 focus:ring-slate-500/20
                      transition
                    "
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-xs uppercase tracking-wider text-slate-400">
                      Password
                    </label>

                    <div className="relative">
                      <LockIcon className="auth-input-icon text-slate-500" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="enter password"
                        className="
                      w-full rounded-md
                      bg-[#05070b]
                      text-slate-200
                      placeholder:text-slate-600
                      px-10 py-2.5
                      text-sm
                      border border-white/5
                      focus:outline-none
                      focus:border-slate-500/40
                      focus:ring-1 focus:ring-slate-500/20
                      transition
                    "
                      />
                    </div>
                  </div>

                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              </div>
            </div>
            <div className="flex items-center justify-center md:flex md:w-1/2 bg-[#05070b] ">
              <lord-icon
                src="https://cdn.lordicon.com/txuhvtae.json"
                trigger="hover"
                stroke="bold"
                style={{width:"400px",height:"400px"}}
              ></lord-icon>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
