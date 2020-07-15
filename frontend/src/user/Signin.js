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
export default Signin;