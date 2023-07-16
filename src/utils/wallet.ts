import { fromBech32 } from "@cosmjs/encoding";

export const validateAddress = (address: string, prefix: string) => {
  try {
    fromBech32(prefix + address);
    return true;
  } catch (e) {
    return false;
  }
};
