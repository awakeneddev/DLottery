import React from 'react';
import { Calendar, Timer, Ticket, DollarSign } from 'lucide-react';

const LotteryCard = ({ lottery, onBuyTicket }) => {
  const isActive = new Date() >= lottery.registrationOpenDate && new Date() <= lottery.registrationCloseDate;
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20';
      case 'closed':
        return 'bg-red-400/10 text-red-400 border border-red-400/20';
      case 'open':
        return 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20';
      case 'completed':
        return 'bg-gray-400/10 text-gray-400 border border-gray-400/20';
      default:
        return 'bg-gray-400/10 text-gray-400 border border-gray-400/20';
    }
  };

  console.log(new Date() >= lottery.registrationOpenDate,lottery.id)
  console.log(new Date() <= lottery.registrationCloseDate,lottery.id)


  return (
    <div className="card-gradient rounded-2xl border border-sky-400/10 p-6 glow backdrop-blur-xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            {lottery.name}
          </h3>
          <p className="text-gray-400 mt-1">{lottery.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lottery.status)}`}>
          {lottery.status.charAt(0).toUpperCase() + lottery.status.slice(1)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-gray-300">
          <Calendar className="w-5 h-5 mr-3 text-sky-400" />
          <span className="text-sm">Opens: {formatDate(lottery.registrationOpenDate)}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Timer className="w-5 h-5 mr-3 text-sky-400" />
          <span className="text-sm">Closes: {formatDate(lottery.registrationCloseDate)}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Ticket className="w-5 h-5 mr-3 text-sky-400" />
          <span className="text-sm">Tickets: {lottery.soldTickets}/{lottery.totalTickets}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <DollarSign className="w-5 h-5 mr-3 text-sky-400" />
          <span className="text-sm">Prize Pool: ETH ${lottery.prizePool.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-semibold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            ETH {lottery.ticketPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 ml-1">per ticket</span>
        </div>
        <button
          onClick={() => onBuyTicket(lottery.id)}
          disabled={!isActive}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-r from-sky-400 to-emerald-400 text-gray-900 hover:shadow-lg hover:shadow-sky-400/20'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default LotteryCard;
