import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import avatar from "../images/avtar.png";
import { isAuthenticated } from "../auth";
import { Redirect } from 'react-router-dom';
import { read, update, updateUser, readName } from './apiUser'

const Profile = ({ match }) => {
    const [val, setval] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        password: '',
        premium: false,
        error: false,//default vlaues
        success: false
    })

    let suscipion = false

    const { accessToken } = isAuthenticated()


    const { firstName, lastName, address, email, password, premium, error, success } = val

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



    const handleSuscribe = name => event => {
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
                    <input onChange={handleSuscribe('premium')} checked={premium} type="checkbox" class="custom-control-input" id="customSwitches" />
                    <label class="custom-control-label" for="customSwitches">Suscipion</label>
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
        <Layout
            title="AndSold"
            description="Update Profile"
            className=''>

            <h2 className='md-4'>Profile Update</h2>
            {profileUpdate(premium, firstName, lastName, address, email)}

            {names()}

        </Layout>
    )
};




export default Profile