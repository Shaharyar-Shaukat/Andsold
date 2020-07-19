import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CardImage from './CardImage'
import GridItem from "../Grid/GridItem";
import CardBody from "../Card/CardBody";
import Card from "../Card/Card";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(styles);


const CardBlock = ({ product }) => {
    const classes = useStyles();

    const [data, setData] = useState({
        id: ""
    });
    const handleChange = id => event => {
        setData({ ...data, [id]: 5});
    };

    return (
        <Card plain>
            <CardImage item={product._id} />

            <h4 className={classes.cardTitle}>
                {product.title}
                <br/>
                <small className={classes.smallTitle}>€ {product.price}</small>
            </h4>
            <CardBody>
                <p className={classes.description}>
                    {product.description.substring(0, 100)}
                </p>
            </CardBody>
            <br />
            <Link to={`/auction/${product._id}`}>
                <button className="btn btn-outline-primary mt-2 mb-2">
                    View Auction
                </button>
            </Link>
        </Card>
    );
};

export default CardBlock;