import { useSelector } from "react-redux";

import { RootState } from "../store.ts";

const useTokenSelector = () =>
  useSelector((state: RootState) => state.tokenData);

export { useTokenSelector };
