import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth'
import { createAuction, getCategories } from './api';

// const { handle } = this.props.match.params
// const ViewAuction = () => {
//     const {
//         user: { _id, firstName, lastName, address, email }

//     } = isAuthenticated();
    
//     return (
//         <Layout title="ViewAuction"   description={`Hello ${firstName}!`} className="container-fluid">
//             <div className="row">
//             <div className="col-2"></div>
//                 <div className="col-9">
//                     hey
//                     {document.getElementById('id')}
//                 </div>
//             </div>
//         </Layout>
//     );

// };

class ViewAuction extends React.Component {
  
    componentDidMount () {
      const  handle  = this.props.match.params.id
  
   
    }
    render() {
        return ( <Layout title="ViewAuction"   description={`Hello !`} className="container-fluid">
                     <div className="row">
                     <div className="col-2"></div>
                         <div className="col-9">
                        
                         </div>
                     </div>
                 </Layout>
        )
  }

}
export default ViewAuction;