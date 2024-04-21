import { createContext, Dispatch, ReactNode, SetStateAction, useState} from "react"

export interface CurrencyContextType {
  fromCurrency: string;
  setFromCurrency: Dispatch<SetStateAction<string>>;
  toCurrency: string;
  setToCurrency: Dispatch<SetStateAction<string>>;
  firstAmount: string;
  setFirstAmount: Dispatch<SetStateAction<string>>;
}


export const CurrencyContext = createContext<CurrencyContextType>({
  fromCurrency: "",
  setFromCurrency: () => {},
  toCurrency: "",
  setToCurrency: () => {},
  firstAmount: "",
  setFirstAmount: () => {},
});

interface CurrencyProviderProps {
  children: ReactNode;
}



const CurrencyProvider = ({children}): CurrencyProviderProps => {
    const [fromCurrency, setFromCurrency] = useState<string>("🇺🇸 USD - United States");
    const [toCurrency, setToCurrency] = useState<string>("🇦🇺 AUD - Australia");
    const [firstAmount, setFirstAmount] = useState<string>("");  
    const value: CurrencyContextType = {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        firstAmount,
        setFirstAmount
    };
  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  )
}

export default CurrencyProvider