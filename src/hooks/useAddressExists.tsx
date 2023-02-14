import { useState, useCallback } from "react";
import { configKeplr, CYBER } from "../utils/config";

export function useAddressExists() {
  const [addressExists, setAddressExists] = useState(false);

  const initKeplr = useCallback(async () => {
    if (window.keplr) {
      await window.keplr.experimentalSuggestChain(configKeplr("bostrom"));
      await window.keplr.enable(CYBER.CHAIN_ID);
      setAddressExists(true);
    }
  }, []);
  initKeplr();

  return { addressExists, initKeplr };
}
