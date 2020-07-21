import React from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Header from "../components/Header/Header.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Parallax from "../components/Parallax/Parallax.js";
import profile from "../assets/img/avatar.png";
import styles from "../assets/jss/material-kit-react/views/profilePage.js";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {

    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const {
        user: {_id, firstName, lastName, address, email}
    } = isAuthenticated();

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group" style={{listStyleType: 'none'}}>
                    <li className="list-group-item">Name : {firstName + " " + lastName}</li>
                    <li className="list-group-item">Email : {email}</li>
                    <li className="list-group-item">Address : {address}</li>
                </ul>
            </div>
        );
    };

    const userLinks = () => {
        return (
            <div className="card">
                <ul className="list-group" style={{listStyleType: 'none'}}>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/create/auction`}>
                            Create Auction
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/wishlist/${_id}`}>
                            My WishList
                        </Link>
                    </li>

                    <li className="list-group-item">
                        <Link className="nav-link" to={`/bids/${_id}`}>
                            My Bids
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/order/${_id}`}>
                            My Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

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
                {...rest}
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
                                        <h3 className={classes.title}>Hello {firstName}</h3>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            {userInfo()}
                            {userLinks()}
                        </div>
                    </div>
                </div>
                ,
            </div>
        </div>
    );
}
