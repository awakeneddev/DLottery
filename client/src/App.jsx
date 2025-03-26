import { useContext, useEffect } from "react";
import { ConnectionContext } from "./context/context";

function App() {
  const { isConnected, setIsConnected } = useContext(ConnectionContext);

  console.log("connection : ",isConnected)
  useEffect(() => {
    setIsConnected(true)
  },[])
  console.log("connection : ",isConnected)
  return (
    <div className="bg-red-400 h-screen ">
      <p className="text-white">{import.meta.env.VITE_CONTRACT_ADDRESS}</p>
    </div>
  );
}

export default App;
