import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createAuction, getCategories, getUser, sendMail } from './api';



const ListProduct = () => {

    const { user, accessToken } = isAuthenticated();

    const [values, setValues] = useState({
        title: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        title,
        description,
        price,
        categories,
        category,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    // Runs when component mount any time there change in the state
    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    var MailData ="ITEM DETAILS :"

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createAuction(user._id, accessToken, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    title: '',
                    description: '',
                    photo: '',
                    price: '',
                    loading: false,
                    createdProduct: data.name
                });
                const MailData ={"title": title,"price":price,"description" : description}
                getUser(user._id, accessToken).then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        var emails = data.map(d => d.email+" , ")
                        var message ={
                            "list": String(emails),
                            "data": MailData
                        }
                         sendMail(user._id, accessToken,message).then(data=>{
                             if(data.error){
                                 alert(data.error)
                             }else{
                                 alert("Auction is live!!")
                             }
                         })
                    }
                });
            }
        });
    };

    const AuctionForm = () => (
        <form className="mb-3" onSubmit={onSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={handleChange('title')} type="text" className="form-control" value={title} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>                
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="List Product" description={`Hello ${user.firstName}, List a new product for auction?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {AuctionForm()}
                </div>
            </div>
        </Layout>
    );

};


export default ListProduct;