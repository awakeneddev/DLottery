import { Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./components/ui/button/button";
import { LotteryCard } from "./components/ui/card/LotteryCard/lotteryCard";
import { Intro } from "./components/ui/Intro";
import {ethers} from "ethers"
import CONTRACT_ABI from "./data/contracts.json";
function App() {
  const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    const fetchLotteries = async () => {
      try {
        const contractAddress = import.meta.env.VITE_PROXY_ADDRESS;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

        const lotteryIds = await contract.getAllLotteries();
        const lotteryData = await Promise.all(
          lotteryIds.map(async (id) => await contract.lotteryDetails(id))
        );

        setLotteries(
          lotteryData.map((v, i) => ({
            id: i + 1,
            owner: v[0],
            name: v[1],
            description: v[2],
            ticketPrice: ethers.formatEther(v[3]),
            totalPrize: ethers.formatEther(v[4]),
            participants: v[5],
            isOpen: v[6],
            endTime: new Date(Number(v[7]) * 1000).toLocaleString(),
            maxTicket: Number(v[8]),
          }))
        );
      } catch (error) {
        console.error("Error fetching lotteries:", error);
      }
    };

    fetchLotteries();
  }, []);
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-[#0f172a] to-[#0f172a] ">
      <div className="container mx-auto py-12">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <NavLink to="/create-lottery">
            <SecondaryButton
              label="Create Lottery"
              icon={<Ticket className="h-4 w-5 mr-2" />}
            />
          </NavLink>
          <PrimaryButton label="Connect Wallet" />{" "}
        </div>

        {/* Intro Section */}
        <Intro />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lotteries.map((lottery, i) => (
            <LotteryCard key={i} lottery={lottery} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
