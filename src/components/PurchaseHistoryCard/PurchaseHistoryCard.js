import React from 'react';
import { Link } from 'react-router-dom';
import './PurchaseHistoryCard.css'



// console.log(newPurchase.date.toLocaleString())

const PurchaseHistoryCard = (props) => {
    const { date, name, imageUrl, author, price, productID } = props.purchase;

    return (
        <div className="card purchase-card m-5">
            <h5 className="card-header">Order date: {date}</h5>
            <div className="card-body">
                <img src={imageUrl} alt="" />
                <h5 className="card-title">{name}</h5>
                <p className="card-text">by - {author} <br /> Total - ${price}</p>
                <Link to={`/buyProduct/${productID}`} className="btn btn-primary">Buy Again</Link>
            </div>
        </div>
    );
};

export default PurchaseHistoryCard;