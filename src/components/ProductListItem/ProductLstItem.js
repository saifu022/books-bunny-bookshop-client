import React from 'react';
import './ProductListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ProductLstItem = (props) => {
    return (
        <tr>
            <td className="align-middle">{props.product.name}</td>
            <td className="align-middle">{props.product.author}</td>
            <td className="align-middle">$ {props.product.price}</td>
            <td className="align-middle">
                <button type="button" className="btn btn-primary" onClick={() => props.deleteProduct(props.product._id)}>
                    <span className="icon"><FontAwesomeIcon icon={faTrashAlt} /></span> Del
                </button></td>
        </tr>
    );
};

export default ProductLstItem;