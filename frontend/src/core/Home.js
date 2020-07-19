import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {getAuctions,getUser} from '../auction/api';
import CardBlock from '../component/CardBlock';
import { isAuthenticated } from '../auth';

// const getAuctions = (sortBy) => {
//     return fetch(`http://localhost:8000/auctions/list?sortBy=${sortBy}&order=desc&limit=8`, {
//         method: "GET"
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };
import SearchBar from '../component/SearchBar';

const Home = () => {

    const { user, accessToken } = isAuthenticated();
    const [auctionsByPrice, setAuctionsByPrice] = useState([]);
    const [auctionsByArrival, setAuctionsByArrival] = useState([]);
    const [userData, setuserData] = useState([]);
    const [error, setError] = useState(false);

     const loadUsers = ()=>{
         getUser(user, accessToken).then(data => {
             if (data.error) {   
                 setError(data.error);
             } else {
                var emails = data.map(d => d.email+" , ")
                 setuserData(emails);
             }
         });
     }
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
        loadUsers();
    }, []);


    return (
        <Layout
            title="Andsold"
            description="Andsold Auction site"
            className="container-fluid"
        >
              <SearchBar />
            <h2 className="mb-4">New Auctions</h2>
            <div className="row">
                {auctionsByArrival.map((auction, i) => (
                    <div key={i} className="col-2 mb-4">
                        <CardBlock product={auction} />
                            
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Price</h2>
            <div className="row">
                {auctionsByPrice.map((auction, i) => (
                    <div key={i} className="col-2 mb-4">
                        <CardBlock product={auction} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
