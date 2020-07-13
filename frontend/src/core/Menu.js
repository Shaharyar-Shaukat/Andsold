import React from 'react';
import {Link,withRouter} from 'react-router-dom'

const actch = (history,path) =>{
    if(history.location.pathname == path){
        return {color : '#ff9900'}
    }    
    else{
        return {color : '#ffffff'}
    }
};


const Menu = ({history}) => (
    <div>
        <ul className='nav nav-tabs bg-primary'>
            <li className = 'nav-item'>
                <Link className ='nav-link' style = {actch(history,'/')} to='/'>Home</Link>
            </li>
            <li className = 'nav-item'>
                <Link className ='nav-link' style = {actch(history,'/signin')} to='/signin'>Signin</Link>
            </li>
            <li className = 'nav-item'>
                <Link className ='nav-link' style = {actch(history,'/signup')} to='/signup'>Signup</Link>
            </li>
        </ul>
    </div>
)

export default withRouter(Menu);