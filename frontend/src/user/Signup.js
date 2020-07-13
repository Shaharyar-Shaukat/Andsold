
import React,{useState} from 'react'
import Layout from '../core/Layout'
import {API} from '../Config'


const Signup = () =>{

    const [val,setVal] = useState({
        name : '',
        email : '',
        password : '',
        error : '',
        success : false
    })

    const {name,email,password} = val

    const handleChange = name => event => {
        setVal({...val, error :false, [name] : event.target.value})
        console.log(`${API}`)
    }

    const submit = (event) =>{
        event.preventDefault()
        signup({name:name,email:email,password:password})
    }

    const signup = (user) =>{
        fetch('http://localhost:8000/signup',{//URL = backend api url replace
            method:'POST',
            headers:{
                Accept:'applicaiton/json',
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
            
        })
        .then(respose => {
            return respose.json
        })
        .catch(err => {
            console.log(err)
        })
    }

    const signupForm = () =>( <form>
            <div className='form-group'>
                <label className='test-muted'>Name</label>
                <input onChange={handleChange('name')} type='text' className='form-control'/>
            </div>

            <div className='form-group'>
                <label className='test-muted'>E-mail</label>
                <input onChange={handleChange('email')} type='email' className='form-control'/>
            </div>

            <div className='form-group'>
                <label className='test-muted'>Password</label>
                <input onChange={handleChange('password')} type='Password' className='form-control'/>
            </div>

            <button onClick={submit} className='btn btn-primary'>
                Submit
            </button>
        </form>
    )
    return(<Layout title='Signup Page' description = 'The place to resell for a new start!' className='container col-md-8 offset-md-2'>
        {signupForm()}
        <p>TEST</p>
        {JSON.stringify(val)}
        </Layout>)
};
export default Signup;