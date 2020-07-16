<<<<<<< HEAD
import React,{useState} from 'react'
import Layout from '../core/Layout'
import { Mailer } from 'nodemailer-react'
import {Link, Redirect} from 'react-router-dom';
import {signin, authenticate} from '../auth'
import { API } from '../Config';


const Signin = () =>{

    const [val,setVal] = useState({
        email : '',
        password : '',
        error : '',
        loading : false,
        redirectToReferer : false,
    })

    const {email,password,loading,error,redirectToReferer} = val

    const handleChange = name => event => {
        setVal({...val, error :false, [name] : event.target.value})
    }

    const submit = (event) =>{
        event.preventDefault()
        setVal({ ...val, error: false,loading:true });
        signin({email,password}).then(data =>{
            if (data.error){
                setVal({...val, error: data.error,loading:false})
            }else{
                authenticate(data, () => {
                    setVal({...val,loading:false,redirectToReferer:true})
                })
            }
        })
    }

    const showerr = () =>(
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
    )

    const showsuccess = () =>(
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    )

    

    const signinForm = () =>( <form>
           
            <div className='form-group'>
                <label className='test-muted'>E-mail</label>
                <input onChange={handleChange('email')} type='email' className='form-control' value={email}/>
            </div>

            <div className='form-group'>
                <label className='test-muted'>Password</label>
                <input onChange={handleChange('password')} type='Password' className='form-control' value={password} />
            </div>

            <button onClick={submit} className='btn btn-primary'>
                Submit
            </button>
        </form>
    )

    const showload =() =>
    loading &&(
        <div className="alert alert-info">
            <h2>Loading . . .</h2> 
        </div>
    )

    const redirectUser=()=>{
        if(redirectToReferer){
            return <Redirect to='/'></Redirect>;
        }
    }

    return(<Layout title='Signin' description = 'The place to resell for a new start!' className='container col-md-8 offset-md-2'>
        {showload()}
        {showerr()}
        {signinForm()}
        {redirectUser()}        
        </Layout>)
};
=======
import React, { useState } from 'react';
import Layout from "../core/Layout";
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false,
        redirectToReferrer: false
    });

    const { email, password, success, error, redirectToReferrer } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, success: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };


    const signInForm = () => (
        <form>

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

    const showLoading = () =>
        success && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }

    };
    return (
        <Layout
            title="SignIn"
            description="SignIn to AndSold" className="container col-md-6 offset-md-3">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
            {JSON.stringify(values)}

        </Layout>
    );
};

>>>>>>> upstream/dev-shaukat
export default Signin;