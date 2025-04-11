import React, {useState, useEffect}from 'react';
import axios from "axios"
import CryptoList from "./Components/CryptoList"


const App = () => {
  const[coinData, setCoinData] = useState([]);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
         
        );
        setCoinData(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
  
    fetchCoin(); 
  }, []);


  return (
    <div className='app'>
      <h1>Crypto Currency</h1>
      <CryptoList coinData={coinData} />
      </div>
  )
}

export default App