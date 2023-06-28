import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { createContext } from "react";

export const PersistQueryClientContext = createContext<QueryClient | undefined>(undefined);

export const usePersistantQueryClient = () => useQueryClient({
  context: PersistQueryClientContext,
});
