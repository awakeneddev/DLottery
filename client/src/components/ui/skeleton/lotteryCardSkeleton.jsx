export const LotteryCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-gradient-to-r from-sky-400/2 to-emerald-400/20 px-4 py-16  rounded-xl shadow-md">
      {/* Header */}
      <div className="h-6 bg-sky-300/40 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-sky-300/40 rounded w-1/2 mb-4"></div>

      {/* Details */}
      <div className="h-4 bg-sky-300/40 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-sky-300/40 rounded w-4/6 mb-2"></div>
      <div className="h-4 bg-sky-300/40 rounded w-3/6 mb-4"></div>

      {/* Footer (Button Placeholder) */}
      <div className="h-10 bg-sky-300/40 rounded w-full"></div>
    </div>
  );
};
