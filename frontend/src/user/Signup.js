import React, { useState } from 'react';
import Layout from "../core/Layout";
import { Link } from 'react-router-dom';
import { signup } from '../auth';

const Signup = () => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { firstName, lastName, address, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ firstName, lastName, address, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    firstName: '',
                    lastName: '',
                    address: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };


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
                <label className="text-muted">Address</label>
                <input onChange={handleChange('address')} type="text" className="form-control" value={address} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
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
    return (
        <Layout
            title="SignUp"
            description="SignUp to AndSold" className="container col-md-6 offset-md-3">
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {JSON.stringify(values)}

        </Layout>
    );
};

export default Signup;