import React, {useEffect, useState} from "react";
import SingleCardImage from "./SingleCardImage";
import {postBid} from "auction/api";
import {isAuthenticated} from "auth";


const SingleAuction = ({product}) => {

    const time = product.createdAt.substring(0, 10)

    const {accessToken} = isAuthenticated();

    const aid = window.location.href.substring(
        window.location.href.indexOf("ion/") + 4,
        window.location.href.length
    );

    let currentBid = product.price;

    function bidChange(newbid) {
        if (currentBid >= document.getElementById("newBid").value) {
            alert("make a higher bid");
        } else {
            //alert(aid)
            const data1 = {
                price: document.getElementById("newBid").value
            };
            postBid(String(aid), accessToken, data1).then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {

                    window.location.reload(false)
                    alert("Bid placed successfully!");
                }
            });
        }
    }


    let targetDate = new Date((new Date(time)).getTime() + (1 * 86400000));

    function CountdownTimer() {
        const calculateTimeLeft = () => {
            const difference = targetDate - new Date();

            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }

            return timeLeft;
        };

        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

        useEffect(() => {
            setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
        });

        const timerComponents = [];

        Object.keys(timeLeft).forEach(interval => {
            if (!timeLeft[interval]) {
                return;
            }

            timerComponents.push(
                <span>
          {timeLeft[interval]} {interval}{" "}
        </span>
            );
        });

        function AddBidding() {
            return (<div>
                <p className="black-8">
                    <b>Current Highest-Bid :</b> <big>€ {product.price}</big>
                </p>

                <big>{timerComponents}</big>
                <br/><br/>

                <input className='form-control'
                       type='number'
                       id='newBid'
                       placeholder="Bid Away!"
                       style={{margin: "auto", maxWidth: "200px"}}/>

                <button onClick={bidChange} className="btn btn-outline-warning mt-2 mb-2">
                    Bid
                </button>
            </div>);
        }

        const displayStatus=()=>{
            return (<div>

                    {!timerComponents.length ? <h2>Sold!!!</h2> : AddBidding()}
                </div>
            );
        }

        const notSignin=()=>{
            return (<div>
                    <p className="black-8">
                        <b>Current Highest-Bid :</b>  <big>€ {product.price}</big>
                    </p>
                    <h2>Please Signin to make a bid.</h2>
                </div>
            );
        }

        return (
            <div>
                {!isAuthenticated() ? notSignin()  : displayStatus()}
            </div>
        );
    }


    return (
        <div className="card ">
            <div className="card-header card-header-1 "><big>{product.title}</big></div>
            <div className="card-body">
                <SingleCardImage item={product._id}/>
                <br/>
                <p className="card-p  mt-2"><b>Description:</b> {product.description.substring(0, 100)} </p>
                <p className="black-9">
                    <b>Category:</b> {product.category && product.category.name}
                </p>
                <p className="black-8"><b>Added on:</b> {time}</p>
            </div>
            <div className="card-header card-header-2 "><big>Auction Status</big></div>
            <div className="card-body">
                {CountdownTimer()}
            </div>


        </div>
    );
};

export default SingleAuction;
