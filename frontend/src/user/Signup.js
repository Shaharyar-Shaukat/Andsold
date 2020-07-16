import React, { useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName:'',
        email: '',
        address:'',
=======
import Layout from "../core/Layout";
import { Link } from 'react-router-dom';
import { signup } from '../auth';

const Signup = () => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
>>>>>>> upstream/dev-shaukat
        password: '',
        error: '',
        success: false
    });

<<<<<<< HEAD
    const { firstName,lastName, email, address, password, success, error } = values;
=======
    const { firstName, lastName, address, email, password, success, error } = values;
>>>>>>> upstream/dev-shaukat

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
<<<<<<< HEAD
        signup({ firstName,lastName, email,address, password }).then(data => {
=======
        signup({ firstName, lastName, address, email, password }).then(data => {
>>>>>>> upstream/dev-shaukat
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    firstName: '',
<<<<<<< HEAD
                    lastName:'',
                    email: '',
                    password: '',
                    address:'',
=======
                    lastName: '',
                    address: '',
                    email: '',
                    password: '',
>>>>>>> upstream/dev-shaukat
                    error: '',
                    success: true
                });
            }
        });
    };

<<<<<<< HEAD
=======

>>>>>>> upstream/dev-shaukat
    const signUpForm = () => (
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
<<<<<<< HEAD
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Address</label>
                <input onChange={handleChange('address')} type="text" className="form-control" value={address} />
=======
                <label className="text-muted">Address</label>
                <input onChange={handleChange('address')} type="text" className="form-control" value={address} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
>>>>>>> upstream/dev-shaukat
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );
<<<<<<< HEAD

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
=======
    return (
        <Layout
            title="SignUp"
            description="SignUp to AndSold" className="container col-md-6 offset-md-3">
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {JSON.stringify(values)}

>>>>>>> upstream/dev-shaukat
        </Layout>
    );
};

<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> upstream/dev-shaukat
