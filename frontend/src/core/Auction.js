import React, {useEffect, useState} from 'react';
import Layout from './Layout';
import {listRelatedAuction, readAuction} from 'auction/api';
import CardBlock from 'components/Card/CardBlock';
import SingleAuction from 'components/Card/SingleAuction';
import GridItem from "../components/Grid/GridItem";

import styles from "assets/jss/material-kit-react/views/landingPageSections/itemStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer";

const useStyles = makeStyles(styles);

const Auction = props => {
    const classes = useStyles();

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        readAuction(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelatedAuction(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.auctionId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.title}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className={classes.section}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <div className={classes.title}>
                            {product && product.description &&
                            <SingleAuction product={product} showViewProductButton={false}/>}
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
            <div className={classes.section}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <div className={classes.title}>
                            <h2>Related products</h2>
                        </div>
                        <GridContainer>
                            {relatedProduct.map((product, i) => (
                                <GridItem xs={12} sm={12} md={4} key={i}>
                                    <CardBlock product={product}/>
                                </GridItem>
                            ))}
                        </GridContainer>
                        <hr/>
                    </GridItem>
                </GridContainer>
            </div>
        </Layout>
    );
};

export default Auction;
