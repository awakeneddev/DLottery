import { ethers } from "ethers";
import { useState } from "react";
import { toast } from "react-toastify";
import CONTRACT_ABI from "../../../../data/contracts.json";
import LotteryCardFormation from "./LotteryCardFormation";
export const LotteryCard = ({ lottery }) => {
  const [isBuying, setIsBuying] = useState(false);

  const buyTicket = async (id) => {
    setIsBuying(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractAddress = import.meta.env.VITE_PROXY_ADDRESS;
      const abi = CONTRACT_ABI;

      const contract = new ethers.Contract(contractAddress, abi, signer);

      // getting user balance
      const balance = await provider.getBalance(signer.address);
      const ticketPrice = ethers.parseEther(lottery.ticketPrice.toString());

      if (balance < ticketPrice) {
        toast.error("Insufficient balance");
        setIsBuying(false);
        return;
      }

      const tx = await contract.buyTicket(id, {
        value: ethers.parseEther(lottery.ticketPrice.toString()),
      });
      toast.info("Transaction is in progress.");
      await tx.wait();
      toast.success(`Ticket has been bought for ${lottery.name}`);
      setIsBuying(false);
    } catch (err) {
      toast.error("Transaction failed.");
      console.log("buying transaction error : ", err);
      setIsBuying(false);
    }
  };

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
        isBuying={isBuying}
      />
    </LotteryCardFormation>
  );
};
