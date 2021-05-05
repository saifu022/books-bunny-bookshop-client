import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './AddProduct.css'
const axios = require('axios');

const AddProduct = (props) => {
    const [imageUrl, setimageUrl] = useState(null)
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        const bookData = {
            name: data.name,
            author: data.author,
            price: data.price,
            imageUrl: imageUrl
        }
        axios.post('https://vast-dawn-87234.herokuapp.com/addProduct',
            bookData)
            .then((response) => {
                props.setDisplayManageBooks('Manage Books')
                console.log('server side response', response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set('key', 'ae0576e43bf23a5c7569f4095351d11e')
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then((response) => {
                setimageUrl(response.data.data.url);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="product-panel">
            <div className="product-heading">
                <h3>Add a new book </h3>
            </div>
            <div className="product-table p-4">
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Book Name:</label>
                        <input name="name" type="text" ref={register} className="form-control" /> <br />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="author" className="form-label">Author:</label>
                        <input name="author" type="text" ref={register({ required: true })} className="form-control" /> <br />
                        {errors.author && <span>This field is required</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="price" className="form-label">Price:</label>
                        <input name="price" type="float" ref={register({ required: true })} className="form-control" /> <br />
                        {errors.price && <span>This field is required</span>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="cover" className="form-label">Upload a book cover photo:</label>
                        <input name="cover" type="file" onChange={handleImageUpload} className="form-control" /> <br />
                    </div>
                </div>
                <input type="submit" className="btn btn-primary" />
            </div>
            <div className="preview">
                {
                    imageUrl && <><img src={imageUrl} alt="Cover loading failed. Please Load Again" /> <p>preview</p></>
                }
            </div>
        </form>
    );
};

export default AddProduct;