import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { BlockChainContext } from "../../../context/blockchainContext";
import { LotteryCard } from "../../ui/card/LotteryCard/lotteryCard";

export const CardGrid = () => {
  const [lotteries, setLotteries] = useState([]);
  const { contractProvider } = useContext(BlockChainContext);

  useEffect(() => {
    const fetchLotteries = async () => {
    
      if (contractProvider) {
        try {
          const lotteryIds = await contractProvider.getAllLotteries();

          const lotteryData = await Promise.all(
            lotteryIds.map(async (id) => await contractProvider.lotteryDetails(id))
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
      }
    };

    fetchLotteries();
  }, [contractProvider]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {lotteries.map((lottery, i) => (
        <LotteryCard key={i} lottery={lottery} />
      ))}
    </div>
  );
};
