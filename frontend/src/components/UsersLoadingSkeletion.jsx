function UserLoadingSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      
      {/* Profile header skeleton */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="size-14 rounded-full bg-slate-800" />

        {/* Name + status */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-slate-800 rounded" />
          <div className="h-3 w-20 bg-slate-700 rounded" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-800 my-2" />

      {/* List skeleton */}
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-slate-800" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 bg-slate-800 rounded" />
              <div className="h-3 w-1/3 bg-slate-700 rounded" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default UserLoadingSkeleton;
