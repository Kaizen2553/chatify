import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import image from "../assets/images.jpg";


const mouseClickSound = new Audio('/sounds/mouseclick.mp3');

function ProfileHeader() {
  const { logout, authUser, updateProfile,isUpdating } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({profileImg:base64Image})
    }

  
  };

  return (
    <div className="p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="relative">

            {/* Avatar */}
            <button
              className="size-14 rounded-full overflow-hidden relative group 
                         ring-2 ring-slate-700 hover:ring-slate-500 transition"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profileImg || image}
                alt="user"
                className="size-full object-cover"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/60 opacity-0 
                           group-hover:opacity-100 flex items-center 
                           justify-center transition-opacity"
              >
                {isUpdating? (
                  <span className="loading loading-spinner loading-sm"></span>
                ):(<span className="text-white text-xs font-medium">
                  Change
                </span>)}
                
              </div>
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-slate-100 font-semibold text-sm max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-emerald-400 text-xs">● Online</p>
          </div>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3">
          <button
            onClick={()=>{
              mouseClickSound.currentTime=0;
              mouseClickSound.play().catch((error)=>console.log('audio play failed',error));
              toggleSound();
            }}
            className="p-2 rounded-full hover:bg-slate-800 transition"
          >
            {isSoundEnabled ? (
              <Volume2Icon className="w-5 h-5 text-slate-300" />
            ) : (
              <VolumeOffIcon className="w-5 h-5 text-slate-400" />
            )}
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-full hover:bg-red-500/10 transition"
          >
            <LogOutIcon className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
