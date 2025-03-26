import { LotteryDetails } from "./lotteryCardDetails";
import { LotteryHeader } from "./lotteryCardHeader";
import { LotteryFooter } from "./LotteryFooter";

const LotteryCardFormation = ({ children }) => {
  return (
    <div className="card-gradient rounded-2xl border border-sky-400/10 p-6 glow backdrop-blur-xl">
      {children}
    </div>
  );
};
LotteryCardFormation.Header = LotteryHeader;
LotteryCardFormation.Details = LotteryDetails;
LotteryCardFormation.Footer = LotteryFooter;

export default LotteryCardFormation;