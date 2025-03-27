import { useContext } from "react";
import { BrowserContext } from "../../../context/browserContext";

export const AlertMessage = () => {
  const { browser } = useContext(BrowserContext);
  const metaMaskUrl =
    browser === "Chromium"
      ? "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
      : browser === "Firefox"
      ? "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
      : browser === "Chrome"
      ? ""
      : "";

  return (
    <div className="flex items-center justify-center">
      <div className="bg-yellow-400/20  rounded-md mb-8 py-2 px-12 text-center">
        <p className="text-white">
          <span className="mr-2 text-yellow-300">Alert !</span>Please install Wallet to view
          lottery
        </p>
        {metaMaskUrl ? (
          <a
            className=" underline text-blue-400"
            href={metaMaskUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Install MetaMask here..
          </a>
        ) : (
          <p className="text-yellow-300">
            MetaMask link is not available for your browser.
          </p>
        )}
      </div>
    </div>
  );
};
