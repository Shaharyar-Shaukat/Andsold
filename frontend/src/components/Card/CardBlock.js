import React from 'react';
import {Link} from 'react-router-dom';
import CardImage from './CardImage'
import CardBody from "./CardBody";
import Card from "./Card";

import styles from "assets/jss/material-kit-react/views/landingPageSections/itemStyle.js";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(styles);


const CardBlock = ({product}) => {
    const classes = useStyles();

    return (
        <Card plain>
            <CardImage item={product._id}/>

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
            <br/>
            <Link to={`/auction/${product._id}`}>
                <button className="btn btn-outline-primary mt-2 mb-2">
                    View Auction
                </button>
            </Link>
        </Card>
    );
};

export default CardBlock;