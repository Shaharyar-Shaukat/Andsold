import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import avatar from "../images/avtar.png";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";


const Dashboard = () => {


    const {
        user: { _id, firstName, lastName, address, email }
    } = isAuthenticated();

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{firstName}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{address}</li>
                </ul>
            </div>
        );
    };

    const userLinks = () => {
        return (
            <div className="card">
                 <img src={avatar} max-width="100%" height="200"></img>
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };
    return (
        <Layout title="Dashboard"   description={`Hello ${firstName}!`} className="container-fluid">
            <div className="row">
            <div className="col-2">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                </div>
            </div>
        </Layout>
    );

};


export default Dashboard;
