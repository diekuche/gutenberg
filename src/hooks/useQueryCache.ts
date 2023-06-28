import { createContext, useContext } from "react";
import { QueryCache } from "../utils/QueryCache";

export const QueryCacheContext = createContext(new QueryCache({}));
export const useQueryCache = () => useContext(QueryCacheContext);
