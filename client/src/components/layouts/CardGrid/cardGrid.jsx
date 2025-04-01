import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { BlockChainContext } from "../../../context/blockchainContext";
import CONTRACT_ABI from "../../../data/contracts.json";
import { LotteryCard } from "../../ui/card/LotteryCard/lotteryCard";
import { LotteryCardSkeleton } from "../../ui/skeleton/lotteryCardSkeleton";
export const CardGrid = () => {
  const [lotteries, setLotteries] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { contractProvider } = useContext(BlockChainContext);

  useEffect(() => {
    const fetchLotteries = async () => {
      setIsFetching(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contractAddress = import.meta.env.VITE_PROXY_ADDRESS;
        const abi = CONTRACT_ABI;
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const lotteryIds = await contract.getAllLotteries();

        const lotteryData = await Promise.all(
          lotteryIds.map(async (id) => await contract.lotteryDetail(id))
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
      } finally {
        setIsFetching(false);
      }
    };

    fetchLotteries();
  }, [contractProvider]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {isFetching
        ? // Show skeleton loaders while data is fetching
          Array.from({ length: 3 }).map((_, i) => (
            <LotteryCardSkeleton key={i} />
          ))
        : // Show actual lottery cards when data is available
          lotteries.map((lottery, i) => (
            <LotteryCard key={i} lottery={lottery} />
          ))}
    </div>
  );
};
