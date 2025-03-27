import { ethers } from "ethers";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { BlockChainContext } from "../../../../context/blockchainContext";
import { IsConnectedContext } from "../../../../context/isConnectedContext";
import LotteryCardFormation from "./LotteryCardFormation";
export const LotteryCard = ({ lottery }) => {
  const { isConnected } = useContext(IsConnectedContext);
  const { provider, contractSigner } = useContext(BlockChainContext);
  const [isBuying, setIsBuying] = useState(false);

  const buyTicket = async (id) => {
    if (!isConnected) {
      toast.warning("Connect your wallet first");
      return;
    }
    setIsBuying(true);

    if (contractSigner) {
      try {
        // getting user balance
        const balance = await provider.getBalance(signer.address);
        const ticketPrice = ethers.parseEther(lottery.ticketPrice.toString());

        if (balance < ticketPrice) {
          toast.error("Insufficient balance");
          setIsBuying(false);
          return;
        }

        const tx = await contractSigner.buyTicket(id, {
          value: ethers.parseEther(lottery.ticketPrice.toString()),
        });
        toast.info("Transaction is in progress.");
        await tx.wait();
        toast.success(`Ticket has been bought for ${lottery.name}`);
      } catch (err) {
        toast.error("Transaction failed.");
        console.log("buying transaction error : ", err);
      } finally {
        setIsBuying(false);
      }
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
