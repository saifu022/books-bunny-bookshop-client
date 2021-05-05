import React from 'react';
import { useHistory } from 'react-router-dom';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

const ProductCard = (props) => {
    const { imageUrl, name, author, price, _id } = props.book;
    let history = useHistory();
    const handleBuyNow = (id) => {
        history.push(`/buyProduct/${id}`);
    }
    return (
        <div className="m-5">
            <div className="card" style={{ width: '18rem' }}>
                <div className="image-box">
                    <img src={imageUrl} className="card-img-top" alt={name} />
                </div>
                <div className="card-body-cover">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">Author: <strong>{author}</strong></p>
                        <div className="d-flex align-items-center justify-content-between ">
                            <h4 className="price-text">$ {price}</h4>
                            <button className="btn btn-primary" onClick={() => handleBuyNow(_id)}>Buy Now! <FontAwesomeIcon icon={faCartArrowDown} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;