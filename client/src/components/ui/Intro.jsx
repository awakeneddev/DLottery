import { Coins } from "lucide-react";

export const Intro = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-12">
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-sky-400/20 rounded-full"></div>
        <Coins className="w-16 h-16 text-sky-400 relative" />
      </div>
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mt-6">
        Blockchain Lottery
      </h1>
      <p className="text-gray-400 mt-2 text-center max-w-2xl">
        Participate in decentralized lotteries powered by blockchain technology.
        Transparent, secure, and provably fair.
      </p>
    </div>
  );
};
