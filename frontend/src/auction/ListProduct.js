import React, {useEffect, useState} from 'react';
import {isAuthenticated} from '../auth';
import {createAuction, getCategories, getUser, sendMail} from './api';
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Parallax from "../components/Parallax/Parallax";
import classNames from "classnames";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import profile from "../assets/img/avatar.png";

import styles from "../assets/jss/material-kit-react/views/profilePage.js";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const ListProduct = () => {

    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    const {user, accessToken} = isAuthenticated();

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
        loading,
        error,
        createdProduct,
        formData
    } = values;


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
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
        setValues({...values, [name]: value});
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: '', loading: true});

        createAuction(user._id, accessToken, formData).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
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
                const MailData = {"title": title, "price": price, "description": description}
                getUser(user._id, accessToken).then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        var emails = data.map(d => d.email + " , ")
                        var message = {
                            "list": String(emails),
                            "data": MailData
                        }
                        sendMail(user._id, accessToken, message).then(data => {
                            if (data.error) {
                                alert(data.error)
                            } else {
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
                <input onChange={handleChange('title')} type="text" className="form-control" value={title}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" min="1" className="form-control" value={price}/>
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
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
                </label>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
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
        <div>
            <Header
                color="transparent"
                brand="AndSold"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
            />
            <Parallax small filter image={require("../assets/img/login.jpg")}/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={profile} alt="..." className={imageClasses}/>
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>Create Auction</h3>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            {showLoading()}
                            {showSuccess()}
                            {showError()}
                            {AuctionForm()}
                        </div>
                    </div>
                </div>
                ,
            </div>
        </div>
    );

};


export default ListProduct;