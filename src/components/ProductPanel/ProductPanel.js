import React, { useEffect, useState } from 'react';
import ProductLstItem from '../ProductListItem/ProductLstItem';
import './ProductPanel.css'

const ProductPanel = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://vast-dawn-87234.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    const spinnerLoading = <div className="spinner">
        <div className="spinner-border text-info " role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;

    const deleteProduct = (id) => {
        const url = `https://vast-dawn-87234.herokuapp.com/deleteProduct/${id}`;
        fetch(url, { method: 'DELETE' })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setProducts(products.filter(product => (product._id !== id)));
                }
            })
    }

    return (
        <div className="product-panel">
            <div className="product-heading">
                <h3>Manage Books</h3>
            </div>
            <div className="product-table">
                {
                    (products.length === 0) && spinnerLoading
                }
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Price</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {products.map(product => {
                            return <ProductLstItem key={product._id}
                                product={product}
                                deleteProduct={deleteProduct} />
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ProductPanel;