import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser'
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

const Profile = ({ match }) => {

    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    const [val, setval] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        premium: false,
        error: false,//default vlaues
        success: false
    })

    const { accessToken } = isAuthenticated()


    const { firstName, lastName, address, email, premium, error, success } = val

    const init = (uid) => {
        read(uid, accessToken).then(data => {
            if (data.error) {
                setval({ ...val, error: true })
            } else {
                setval({ ...val, firstName: data.firstName, lastName: data.lastName, address: data.address, premium: data.premium, email: data.email, success: true })
                //alert(`Flag${premium}`)
            }
        })
    }

    useEffect(() => {
        init(match.params.userid)
    }, [])



    const handleSubscribe = name => event => {
        setval({ ...val, error: false, [name]: !premium })
    };


    const handleChange = name => event => {
        setval({ ...val, error: false, [name]: event.target.value });
    };

    const redirectUser = (success) => {
        alert(`Update is successful. `)
        return <Redirect to="/" />;
    };
    const clickSubmit = (event) => {
        event.preventDefault()
        update(match.params.userid, accessToken, { premium, firstName, lastName, address, email }).then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setval({ ...val, firstName: data.firstName, email: data.email, address: data.address, lastName: data.lastName, success: true })
                })
                redirectUser(success)
                //alert(`Action is ${success}`)
            }
        })
    }


    const profileUpdate = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">First Name</label>
                    <input onChange={handleChange('firstName')} type="text" className="form-control" value={firstName} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Last Name</label>
                    <input onChange={handleChange('lastName')} type="text" className="form-control" value={lastName} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Address</label>
                    <input onChange={handleChange('address')} type="text" className="form-control" value={address} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
                </div>

                <div class="custom-control custom-switch">
                    <input onChange={handleSubscribe('premium')} checked={premium} type="checkbox" class="custom-control-input" id="customSwitches" />
                    <label class="custom-control-label" for="customSwitches">Subscription</label>
                </div>
                <br />

                <button onClick={clickSubmit} className="btn btn-primary">
                    Submit
                </button>
            </form>
        )
    }

    const names = () => {
        read(match.params.userid, accessToken).then(data => {
            if (data.error) {
                console.log("ERROR IN FETCH")
                return -999;
            } else {
                //alert("flags")
                return (<div>{JSON.stringify(data)} </div>)

                //alert(`Flag${premium}`)
            }
        })
    }

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
                                        <h3 className={classes.title}>Update Profile</h3>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            {profileUpdate(premium, firstName, lastName, address, email)}
                            {names()}
                        </div>
                    </div>
                </div>,
            </div>
        </div>
    )
};




export default Profile