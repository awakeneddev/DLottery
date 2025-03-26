export const LotteryHeader = ({ name, description, isOpen }) => {
    const getStatusColor = (status) => {
      return status
        ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
        : "bg-red-400/10 text-red-400 border border-red-400/20";
    };
    return (
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            {name}
          </h3>
          <p className="text-gray-400 mt-1">{description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(isOpen)}`}>
          {isOpen ? "Active" : "Closed"}
        </span>
      </div>
    );
  };