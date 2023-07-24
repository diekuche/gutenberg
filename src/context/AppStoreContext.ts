import { QueryCache } from "classes/QueryCache";
import { createContext } from "react";

export const AppStoreContext = createContext<QueryCache>(new QueryCache({
  prefix: "gutenberg",
}));
