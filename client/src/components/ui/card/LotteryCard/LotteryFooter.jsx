export const LotteryFooter = ({ ticketPrice, isOpen, onBuy }) => {
    return (
      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-semibold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            ETH {ticketPrice}
          </span>
          <span className="text-sm text-gray-400 ml-1">per ticket</span>
        </div>
        <button
          onClick={onBuy}
          disabled={!isOpen}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-r from-sky-400 to-emerald-400 text-gray-900 hover:shadow-lg hover:shadow-sky-400/20"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          Buy Ticket
        </button>
      </div>
    );
  };