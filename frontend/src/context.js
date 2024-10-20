import React from "react";
import { createContext } from "react";

export const initialValue = {
  userData: null,
  isLoading: true,
}

export const Context = createContext(initialValue);
export const useContext = React.useContext;