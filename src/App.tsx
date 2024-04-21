import { Box, Container, Grid, Typography } from '@mui/material'
import InputAmount from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import React, { useContext, useEffect, useState } from 'react'
import { CurrencyContext, CurrencyContextType } from './context/CurrencyContext'

function App() {
const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
} = useContext<CurrencyContextType>(CurrencyContext)

const [resultCurrency, setResultCurrency] = useState<number>(0);
const codeFromCurrency: string = fromCurrency.split(" ")[1];
const codeToCurrency: string = toCurrency.split(" ")[1];

console.log(resultCurrency);


useEffect(() => {
  if (firstAmount) {
    fetch(`https://api.freecurrencyapi.com/v1/latest?base_currency=${codeFromCurrency}&currencies=${codeToCurrency}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": "fca_live_7bw9v9fcK9Yh9BclgyiQhP7UBjfCtKUfCgmU0X4y"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setResultCurrency(data.data[codeToCurrency]);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }
}, [firstAmount, fromCurrency, toCurrency]);

  const boxStyles: React.CSSProperties = {
    background: "#fdfdfd",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
    position: "relative",
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{marginBottom: "3rem", fontSize: "30px", fontWeight: "500"}}>Effortless Currency Conversions for You</Typography>
      <Grid container spacing={2}>
        <InputAmount/>
        <SelectCountry value= {fromCurrency} setValue={setFromCurrency} label="From"/>
        <SwitchCurrency/>
        <SelectCountry value= {toCurrency} setValue={setToCurrency} label="To"/>
      </Grid>

      {firstAmount ? (
  <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
    <Typography sx={{fontSize: "18px"}}>{firstAmount} {fromCurrency} = </Typography>
    <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold" }}>
      {(parseFloat(firstAmount) * resultCurrency).toFixed(2)} {toCurrency}
    </Typography>
  </Box>
) : ""}
    </Container>
  )
}

export default App
