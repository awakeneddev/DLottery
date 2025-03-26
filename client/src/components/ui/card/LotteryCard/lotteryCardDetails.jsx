import { DollarSign, Ticket, Timer, User } from "lucide-react";

const Details = ({ label, content, icon }) => {
  return (
    <div className="flex items-center text-gray-300">
      {icon}
      <span className="text-sm">
        {label}: {content}
      </span>
    </div>
  );
};

export const LotteryDetails = ({ endTime, maxTicket, participants, totalPrize }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="space-y-4">
      <Details
        content={formatDate(endTime)}
        icon={<Timer className="w-5 h-5 mr-3 text-sky-400" />}
        label={"Closes"}
      />

      <Details
        content={maxTicket}
        icon={<Ticket className="w-5 h-5 mr-3 text-sky-400" />}
        label={"Tickets"}
      />
      <Details
        content={`${participants.length} / ${maxTicket}`}
        icon={<User className="w-5 h-5 mr-3 text-sky-400" />}
        label={"Participants"}
      />
      <Details
        content={totalPrize.toLocaleString()}
        icon={<DollarSign className="w-5 h-5 mr-3 text-sky-400" />}
        label={"Prize Pool: ETH "}
      />
    </div>
  );
};
