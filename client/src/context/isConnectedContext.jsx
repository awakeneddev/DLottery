import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const IsConnectedContext = createContext();

const IsConnectedProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(() => {
    return localStorage.getItem("isConnected") === "true";
  });
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (isConnected) {
      localStorage.setItem("isConnected", "true");
    } else {
      localStorage.removeItem("isConnected");
    }
  }, [isConnected]);

  const connectWallet = async () => {
    setIsConnecting(true);
    if (!window.ethereum) {
      setIsConnecting(false);
      toast.error("Wallet not found. Please install MetaMask.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      if (_walletAddress) {
        setIsConnected(true);
        toast.success("Wallet Connected Successfully")
      }
    } catch (err) {
      toast.error("Failed to connect wallet");
      console.log(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    localStorage.removeItem("isConnected");
    toast.info("Wallet disconnected.");
  };

  return (
    <IsConnectedContext.Provider
      value={{ isConnected, isConnecting, connectWallet, disconnectWallet }}
    >
      {children}
    </IsConnectedContext.Provider>
  );
};
export { IsConnectedContext, IsConnectedProvider };
