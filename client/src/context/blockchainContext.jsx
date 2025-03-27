import { ethers } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import CONTRACT_ABI from "../data/contracts.json";
import { IsConnectedContext } from "./isConnectedContext";

export const BlockChainContext = createContext();

export const BlockChainProvider = ({ children }) => {
  const { isConnected } = useContext(IsConnectedContext);
  const [isWalletNotFound, setIsWalletNotFound] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contractProvider, setContractProvider] = useState(null);
  const [contractSigner, setContractSigner] = useState(null);

  // initializing blockchain
  const initBlockchain = useCallback(async () => {
    if (!window.ethereum) {
        setIsWalletNotFound(true)
    } ;

    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      setIsWalletNotFound(false);
      await _provider.send("eth_requestAccounts", []);
      const _signer = await _provider.getSigner();
      const contractAddress = import.meta.env.VITE_PROXY_ADDRESS;
      const _contractProvider = new ethers.Contract(
        contractAddress,
        CONTRACT_ABI,
        _provider
      );
      const _contractSigner = new ethers.Contract(
        contractAddress,
        CONTRACT_ABI,
        _signer
      );

      setProvider(_provider);
      setSigner(_signer);
      setContractProvider(_contractProvider);
      setContractSigner(_contractSigner);
    } catch (err) {
      console.log(err);
      toast.warning("Blockchain initialization failed");
    }
  }, []);

  useEffect(() => {
    initBlockchain();
  }, [isConnected]);

  return (
    <BlockChainContext.Provider
      value={{
        provider,
        signer,
        contractProvider,
        contractSigner,
        isWalletNotFound,
      }}
    >
      {children}
    </BlockChainContext.Provider>
  );
};
