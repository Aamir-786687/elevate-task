import React from "react";
import "./cryptoList.css";
import CryptoCard from "./CryptoCard"; 

const CryptoList = ({ coinData }) => {
  return (
    <div className="cryptoList">
      {coinData.map((coin, index) => {
        return (
          <CryptoCard
            key={index}
            image={coin.image}
            name={coin.name}
            price={coin.current_price}
          />
        );
      })}
    </div>
  );
};

export default CryptoList;
