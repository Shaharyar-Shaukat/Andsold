import React, {useState, useEffect} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import {getAuctions} from 'auction/api';

import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";

import styles from "../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";


const useStyles = makeStyles(styles);

export default function ItemSection() {
    const classes = useStyles();

    const [auctionsByPrice, setAuctionsByPrice] = useState([]);
    const [auctionsByArrival, setAuctionsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const navImageClasses = classNames(classes.imgRaised, classes.imgFluid);

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
        <div className={classes.section}>
            <h2 className={classes.title}>Latest Items</h2>
            <div>
                <GridContainer>
                    {auctionsByArrival.map((auction, i) => (
                        <GridItem xs={12} sm={12} md={4} key={i}>
                            <Card plain>
                                <GridItem xs={12} sm={12} md={6} className={classes.imgFluid}>
                                    <img
                                        alt={auction._id}
                                        src={`http://localhost:8000/auctions/image/${auction._id}`}
                                        className={navImageClasses}
                                    />
                                </GridItem>
                                <h4 className={classes.cardTitle}>
                                    {auction.title}
                                    <br/>
                                    <small className={classes.smallTitle}>€ {auction.price}</small>
                                </h4>
                                <CardBody>
                                    <p className={classes.description}>
                                        {auction.description.substring(0, 100)}
                                    </p>
                                </CardBody>
                            </Card>
                        </GridItem>
                    ))}
                </GridContainer>
            </div>
        </div>
    );
}
