import { AppStoreContext } from "context/AppStoreContext";
import { useContext } from "react";

export const useStore = () => useContext(AppStoreContext);
