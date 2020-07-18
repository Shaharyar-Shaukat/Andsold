import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getAuctions } from '../auction/api';
import CardBlock from '../component/CardBlock';

const Home = () => {

    const [auctionsByPrice, setAuctionsByPrice] = useState([]);
    const [auctionsByArrival, setAuctionsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadAuctionsByPrice = () => {
        getAuctions('price').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setAuctionsByPrice(data);
            }
        });
    };


    const loadAuctionsByArrival = () => {
        getAuctions('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setAuctionsByArrival(data);
            }
        });
    };

    // Run the above method , when component mount or change state 
    useEffect(() => {
        loadAuctionsByPrice();
        loadAuctionsByArrival();
    }, []);


    return (
        <Layout
            title="Andsold"
            description="Andsold Auction site"
            className="container-fluid"
        >
            {JSON.stringify(auctionsByArrival)}
            <hr />
            {JSON.stringify(auctionsByPrice)}
            <h2 className="mb-4">New Auctions</h2>
            <div className="row">
                {auctionsByArrival.map((auction, i) => (
                    <div key={i} className="col-3 mb-4">
                        <CardBlock product={auction} />
                            
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Price</h2>
            <div className="row">
                {auctionsByPrice.map((auction, i) => (
                    <div key={i} className="col-4 mb-3">
                        <CardBlock product={auction} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
