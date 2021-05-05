import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://vast-dawn-87234.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    const shuffleArray = (array) => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    const shuffledProducts = shuffleArray(products);
    const spinnerLoading = <div className="spinner">
        <div className="spinner-border text-info " role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center">
                <div className="input-group search-bar">
                    <input type="text" className="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon"/>
                    <div className="input-group-text btn-primary" id="btnGroupAddon">Search</div>
                </div>
            </div>
            <div className="products-container">
                {
                    (shuffledProducts.length === 0) && spinnerLoading
                }
                {
                    products.map(book => {
                        return <ProductCard key={book._id} book={book} />
                    })
                }
            </div>
        </div>
    );
};

export default Home;