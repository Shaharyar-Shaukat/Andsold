<<<<<<< HEAD
import React from 'react'
import Menu from './Menu'


const Layout = ({title='AndSold', description='The only auciton platform for you!', className ,children}) => (
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
=======
import React from "react";
import Menu from "./Menu";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
        <div>
            <Menu />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    );
>>>>>>> upstream/dev-shaukat

export default Layout;