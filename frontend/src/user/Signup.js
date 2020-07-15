import React,{useState} from 'react'
import Layout from '../core/Layout'
import { Mailer } from 'nodemailer-react'
import {Link} from 'react-router-dom';
import {signup} from '../auth'

var nodemailer = require('nodemailer');
var id=require('./conf.json')
const Signup = () =>{

    const [val,setVal] = useState({
        name : '',
        email : '',
        password : '',
        error : '',
        success : false
    })

    const {name,email,password,success,error} = val

    const handleChange = name => event => {
        setVal({...val, error :false, [name] : event.target.value})
    }

    const submit = (event) =>{
        event.preventDefault()
        setVal({ ...val, error: false });
        signup({name,email,password}).then(data =>{
            if (data.error){
                setVal({...val, error: data.error,success:false})
            }else{
                setVal({...val,name:'',email:'',password:'', error:'',success:true})
            }
        })
    }

    const showerr = () =>(
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
    )

    const showsuccess = () =>(
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    )

    

    const signupForm = () =>( <form>
            <div className='form-group'>
                <label className='test-muted'>Name</label>
                <input onChange={handleChange('name')} type='text' className='form-control' value={name} />
            </div>

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
    return(<Layout title='Signup Page' description = 'The place to resell for a new start!' className='container col-md-8 offset-md-2'>
        {showsuccess()}
        {showerr()}
        {signupForm()}
                
        </Layout>)
};
export default Signup;