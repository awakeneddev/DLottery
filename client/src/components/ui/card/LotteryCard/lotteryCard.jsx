import LotteryCardFormation from "./LotteryCardFormation";

export const LotteryCard = ({ lottery }) => {
  return (
    <LotteryCardFormation>
      <LotteryCardFormation.Header
        name={lottery.name}
        description={lottery.description}
        isOpen={lottery.isOpen}
      />
      <LotteryCardFormation.Details
        endTime={lottery.endTime}
        maxTicket={lottery.maxTicket}
        participants={lottery.participants}
        totalPrize={lottery.totalPrize}
      />
      <LotteryCardFormation.Footer
        ticketPrice={lottery.ticketPrice}
        isOpen={lottery.isOpen}
        onBuy={() => buyTicket(lottery.id)}
      />
    </LotteryCardFormation>
  );
};
