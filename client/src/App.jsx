import { useContext } from "react";
import { CardGrid } from "./components/layouts/CardGrid/cardGrid";
import { Header } from "./components/layouts/header/header";
import { AlertMessage } from "./components/ui/alertMessage/alertMessage";
import { Intro } from "./components/ui/Intro";
import { IsConnectedContext } from "./context/isConnectedContext";
function App() {
  const { isWalletNotFound } = useContext(IsConnectedContext);

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-[#0f172a] to-[#0f172a] ">
      <div className="container mx-auto py-12">
        {/* Action Buttons */}
        <Header />

        {isWalletNotFound && <AlertMessage />}

        {/* Intro Section */}
        <Intro />
        <CardGrid />
      </div>
    </div>
  );
}

export default App;
