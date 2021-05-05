import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';
import './Checkout.css';
const axios = require('axios');

const Checkout = () => {
    const { id } = useParams();
    const [loggedInUser] = useContext(UserContext);
    const [product, setProduct] = useState([]);
    let history = useHistory();
    useEffect(() => {
        fetch(`https://vast-dawn-87234.herokuapp.com/product/id/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);
    const {name, imageUrl, price} = product;
    let newPurchase = {...product};
    const date = new Date();
    newPurchase.date= date.toLocaleString();
    newPurchase.userName = loggedInUser.name;
    newPurchase.userEmail = loggedInUser.email;
    newPurchase.productID = newPurchase._id
    delete newPurchase._id;

    const handleCheckout = newPurchase => {
        axios.post('https://vast-dawn-87234.herokuapp.com/checkout',
        newPurchase)
            .then((response) => {
                alert('Your Purchase is Complete')
                history.push('/home');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const spinnerLoading = <div className="spinner">
        <div className="spinner-border text-info " role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;
    
    return (
        <div className="checkout">
            <div className="checkout-heading">
                <h3>Checkout</h3>
            </div>
            <div className="checkout-content">
                <div className="checkout-table">
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Description</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col">
                                    <img src={imageUrl} alt={name} className="checkout-img"/> <br />
                                    {name}
                                </th>
                                <th scope="col">1</th>
                                <th scope="col">$ {price}</th>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th scope="col"> Total </th>
                                <th scope="col"></th>
                                <th scope="col">$ {price}</th>
                            </tr>
                        </tfoot>
                        {(product.length === 0) && spinnerLoading}
                    </table>
                </div>
            </div>
            <div className="checkout-footer">
                <button className="btn btn-primary" onClick={()=> handleCheckout(newPurchase)}>Checkout</button>
            </div>
        </div>
    );
};

export default Checkout;