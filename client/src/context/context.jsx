import { createContext, useState } from "react";

const ConnectionContext = createContext();

const ConnectionProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ConnectionContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </ConnectionContext.Provider>
  );
};
export { ConnectionProvider, ConnectionContext };