import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoList from "./Components/CryptoList";
import Pagination from "./Components/Pagination";
import "./App.css";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoinData(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchCoin();
  }, []);

  const LastPostIndex = currentPage * postPerPage;
  const firstPostIndex = LastPostIndex - postPerPage;
  const currentPost = coinData.slice(firstPostIndex, LastPostIndex);

  return (
    <div className="app">
      <h1>Crypto Currency</h1>
      <CryptoList coinData={currentPost} />
      <Pagination 
      totalPosts={coinData.length} 
      postPerPage={postPerPage}
      setCurrentPage ={setCurrentPage} 
      />
    </div>
  );
};

export default App;
