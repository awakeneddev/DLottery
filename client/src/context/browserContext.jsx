import { createContext, useEffect, useState } from "react";

export const BrowserContext = createContext();

export const BrowserProvider = ({ children }) => {
  const [browser, setBrowser] = useState("Unknown");

  const detectBrowser = async () => {
    if (navigator.userAgentData) {
      const { brands } = await navigator.userAgentData.getHighEntropyValues([
        "brands",
      ]);
      setBrowser(brands[0].brand);
    } else {
      setBrowser(getBrowser());
    }
  };

  const getBrowser = () => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Edg")) return "Edge"; // Microsoft Edge
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg"))
      return "Chrome";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
      return "Safari";
    if (userAgent.includes("Opera") || userAgent.includes("OPR"))
      return "Opera";
    if (userAgent.includes("MSIE") || userAgent.includes("Trident"))
      return "Internet Explorer";

    return "Unknown Browser";
  };

  useEffect(() => {
    detectBrowser();
  }, []);

  return (
    <BrowserContext.Provider value={{ browser }}>
      {children}
    </BrowserContext.Provider>
  );
};
