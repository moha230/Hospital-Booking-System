import { createContext } from "react";
import { doctors } from "../assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbols = "€"; //

  const value = {
    doctors,
    currencySymbols,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
