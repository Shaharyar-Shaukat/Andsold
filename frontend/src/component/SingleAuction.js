import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CardImage from './CardImage'
import SingleCardImage from './SingleCardImage'


// class SingleAuction extends Component {
//     constructor(product){

//     }
//     state = { 
//         product: this.props.product
//      }
//     render() { 
//         return (


//             <div className="card ">
//                 <div className="card-header card-header-1 ">{product.title}</div>
//                 <div className="card-body">
//                     <SingleCardImage item={product._id} />
//                     <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
//                     <p className="black-9">Category: {product.category && product.category.name}</p>
//                     <p className="black-8">Added on :  {product.createdAt}</p>
//                     <p className="black-8">Current Highest-Bid : <b> € {product.price}</b></p>
//                     <br />
                    
//                     <input onChange={bidChange} className="black-8" type="text" className="form-control" style={{ maxWidth: "200px" }} />
//                     <button className="btn btn-outline-warning mt-2 mb-2">
//                             Bid
//                     </button>
//                 </div>
//             </div>
    
//         );
//     }
// }
 
//export default SingleAuction;




const SingleAuction = ({ product }) => {
    const [data, setData] = useState({
        product: ""
    });
    const handleChange = id => event => {
        setData({ ...data, [id]: 5});
        //setValues({ ...values, error: false, [name]: event.target.value });
    };
    // const handleBidChange = (NewBid) => {
    //    alert(NewBid)
    // };
    const currentBid=product.price;
    function bidChange(newbid){
        alert(newbid)
    }
    

    return (


        <div className="card ">
            <div className="card-header card-header-1 ">{product.title}</div>
            <div className="card-body">
                <SingleCardImage item={product._id} />
                <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
                <p className="black-9">Category: {product.category && product.category.name}</p>
                <p className="black-8">Added on :  {product.createdAt}</p>
                <p className="black-8">Current Highest-Bid : <b> € {product.price}</b></p>
                <br />
                
                <input onBlur={bidChange} className="black-8" type="text" id="newBid" className="form-control" style={{ maxWidth: "200px" }} />
                <button className="btn btn-outline-warning mt-2 mb-2">
                        Bid
                </button>
            </div>
        </div>

    );
};

export default SingleAuction;