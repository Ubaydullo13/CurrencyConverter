import { createContext, useState, ReactNode } from "react"

interface CurrencyContextType {
    fromCurrency: string;
    setFromCurrency: (currency: string) => void;
    toCurrency: string;
    setToCurrency: (currency: string) => void;
    firstAmount: string;
    setFirstAmount: (amount: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

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