import { Ticket } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "./components/ui/button/button";
import { LotteryCard } from "./components/ui/card/LotteryCard";
import { Intro } from "./components/ui/Intro";
import { LOTTERIES } from "./data";

function App() {
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-[#0f172a] to-[#0f172a] ">
      <div className="container mx-auto py-12">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <SecondaryButton
            label="Create Lottery"
            icon={<Ticket className="h-4 w-5 mr-2" />}
          />
          <PrimaryButton label="Buy Ticket" />{" "}
        </div>

        {/* Intro Section */}
        <Intro />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOTTERIES.map((lottery, i) => (
            <LotteryCard key={i} lottery={lottery} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
