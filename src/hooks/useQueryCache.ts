import { createContext, useContext } from "react";
import { QueryCache } from "classes/QueryCache";

export const QueryCacheContext = createContext(new QueryCache({}));
export const useQueryCache = () => useContext(QueryCacheContext);
