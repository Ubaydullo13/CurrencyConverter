import { Autocomplete, Grid, Skeleton, TextField } from '@mui/material'
import useFetch from '../hooks/useFetch'

const SelectCountry = (props: { value: string, setValue: (value: string) => void, label: string }) => {

const {value, setValue, label} = props;

const [data, loading, error] = useFetch("https://restcountries.com/v3.1/all");

if(loading) {
    return (
        <Grid item xs={12} md={3}>
         <Skeleton variant='rounded' height={60}/>
    </Grid>
    )
}

if(error) {
    return "Something went wrong!"
}

const dataFilter = data.filter(item => "currencies" in item);
const dataCountries = dataFilter.map(item => {
    return `${item.flag} ${Object.keys(item.currencies)[0]} - ${item.name.common}` 
});

// console.log(dataCountries);



  return (
    <Grid item xs={12} md={3}>
        <Autocomplete 
        value={value}
        disableClearable
        onChange={(event, newValue) =>{
            setValue(newValue);
        }}
        options={dataCountries}
        renderInput={(params) => <TextField {...params} label={label}/>}/>
    </Grid>
  )
}

export default SelectCountry