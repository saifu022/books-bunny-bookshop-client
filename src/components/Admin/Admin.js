import React, { useState } from 'react';
import AddProduct from '../AddProduct/AddProduct';
import ProductPanel from '../ProductPanel/ProductPanel';
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faPuzzlePiece, faPlus } from '@fortawesome/free-solid-svg-icons'

const Admin = () => {
    const [displayManageBooks, setDisplayManageBooks] = useState('Manage Books')
    const handleDisplay = (e) => {
        setDisplayManageBooks(e);
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="admin-panel p-5 m-2">
                <div className="admin-navbar p-5">
                    <h2>Admin Control <span className="admin-icon"><FontAwesomeIcon icon={faUsersCog} /></span> </h2> <br /> <br />
                    <h3 onClick={() => handleDisplay('Manage Books')}> <span className="icon"><FontAwesomeIcon icon={faPuzzlePiece} /></span> Manage Books</h3>
                    <h3 onClick={() => handleDisplay('')}> <span className="icon"><FontAwesomeIcon icon={faPlus} /></span> Add Books</h3>
                </div>
                <div className="admin-content border">
                    {displayManageBooks ? <ProductPanel /> : <AddProduct setDisplayManageBooks={setDisplayManageBooks} />}
                </div>
            </div>
        </div>
    );
};

export default Admin;