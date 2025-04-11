import React from 'react'
import './cryptoCard.css';

const CryptoCard = ({image, name, price}) => {
  return (
    <div className='card'>
        <div className='card_image'>
            <img src={image} alt={name} />
        </div>
        <div className='cardInfo'>
            <h1>{name}</h1>
            <p>${price} </p>
        </div>
    </div>
  );
};

export default CryptoCard