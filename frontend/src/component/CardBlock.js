import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CardImage from './CardImage'


const CardBlock = ({ product }) => {
    return (


        <div className="card ">
            <div className="card-header card-header-1 ">{product.title}</div>
            <div className="card-body">
                <CardImage item={product._id} />
                <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
                <p className="card-p black-10">€ {product.price}</p>
                <p className="black-9">Category: {product.category && product.category.name}</p>
                <p className="black-8">Added on : {product.timestamps}</p>
                <br />
            
                    <Link className="btn btn-outline-primary mt-2 mb-2" to={`/ViewAuction?id=${product._id}`}>
                        View Auction
                    </Link>
              
                <button className="btn btn-outline-warning mt-2 mb-2">
                        Bid
                </button>
            </div>
        </div>

    );
};

export default CardBlock;