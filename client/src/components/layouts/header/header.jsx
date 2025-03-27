import { Ticket } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IsConnectedContext } from "../../../context/isConnectedContext";
import { PrimaryButton, SecondaryButton } from "../../ui/button/button";

export const Header = () => {
  const { isConnected, isConnecting, connectWallet,disconnectWallet } =
    useContext(IsConnectedContext);
  return (
    <div className="flex justify-between items-center mb-8">
      {isConnected ? (
        <NavLink to="/create-lottery">
          <SecondaryButton
            label="Create Lottery"
            icon={<Ticket className="h-4 w-5 mr-2" />}
          />
        </NavLink>
      ) : (
        <SecondaryButton
          label="Create Lottery"
          icon={<Ticket className="h-4 w-5 mr-2" />}
        />
      )}
      <PrimaryButton
        onClick={isConnected ? disconnectWallet : connectWallet}
        label={isConnected ? "Disconnect Wallet" : "Connect Wallet"}
        isLoading={isConnecting}
      />{" "}
    </div>
  );
};
