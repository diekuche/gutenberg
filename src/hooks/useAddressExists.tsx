import { useState, useCallback } from "react";
import { configKeplr, CYBER } from "../utils/config";

export function useAddressExists() {
  const [addressExists, setAddressExists] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const initKeplr = useCallback(async () => {
    if (!isConnecting) {
      setIsConnecting(true);
      if (window.keplr) {
        await window.keplr.experimentalSuggestChain(configKeplr("bostrom"));
        await window.keplr.enable(CYBER.CHAIN_ID);
        setAddressExists(true);
      }
      setIsConnecting(false);
    }
  }, [isConnecting]);

  initKeplr();

  return { addressExists, initKeplr, setAddressExists };
}
