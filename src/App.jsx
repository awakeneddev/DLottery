import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import LotteryCard from './components/lotteryCard';

function App() {
  const [lotteries] = useState([
    {
      id: '1',
      name: 'Mega Jackpot',
      description: 'Win big with our largest prize pool ever!',
      ticketPrice: 0.1,
      registrationOpenDate: new Date('2025-03-15T00:00:00'),
      registrationCloseDate: new Date('2025-04-15T00:00:00'),
      prizePool: 100000,
      totalTickets: 1000,
      soldTickets: 456,
      status: 'open'
    },
    {
      id: '2',
      name: 'Lucky Draw',
      description: 'Weekly lottery with guaranteed winners',
      ticketPrice: 0.05,
      registrationOpenDate: new Date('2025-03-18T00:00:00'),
      registrationCloseDate: new Date('2025-03-24T00:00:00'),
      prizePool: 50000,
      totalTickets: 500,
      soldTickets: 123,
      status: 'open'
    },
    {
      id: '3',
      name: 'Premium Lottery',
      description: 'Exclusive lottery with higher winning chances',
      ticketPrice: 0.2,
      registrationOpenDate: new Date('2024-03-20T00:00:00'),
      registrationCloseDate: new Date('2024-04-20T00:00:00'),
      prizePool: 200000,
      totalTickets: 2000,
      soldTickets: 789,
      status: 'completed'
    }
  ]);

  const handleBuyTicket = (lotteryId) => {
    console.log(`Buying ticket for lottery ${lotteryId}`);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-[#0f172a] to-[#0f172a]">
      <div className="container mx-auto px-4 py-12">
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

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lotteries.map((lottery) => (
              <LotteryCard
                key={lottery.id}
                lottery={lottery}
                onBuyTicket={handleBuyTicket}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
