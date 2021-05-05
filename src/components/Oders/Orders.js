import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import PurchaseHistoryCard from '../PurchaseHistoryCard/PurchaseHistoryCard';
import './Orders.css'

const Orders = () => {
    const [loggedInUser] = useContext(UserContext);
    const [purchases, setPurchases] = useState([]);
    useEffect(() => {
        fetch(`https://vast-dawn-87234.herokuapp.com/purchases/${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setPurchases(data))
    }, [loggedInUser.email]);

    return (
        <div className="container">
            <div className="purchases-box">
                {
                    purchases.map(purchase => <PurchaseHistoryCard key = {purchase._id} purchase={purchase} />)
                }
            </div>
        </div>
    );
};

export default Orders;