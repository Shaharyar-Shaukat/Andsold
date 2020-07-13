import React from 'react'
import Menu from './Menu'


const Signup = ({title='AndSold', description='The only auciton platform for you!', className ,children}) => (
    <div>
        <Menu />
        <div className = "jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>
            {children}
        </div>
    </div>
);

export default Signup;