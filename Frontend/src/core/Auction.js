import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { readAuction, listRelatedAuction } from '../auction/api';
import CardBlock from '../component/CardBlock';
import SingleAuction from '../component/SingleAuction';


const Auction = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        readAuction(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products.
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
            <div className="row">
                <div className="col-8">
                    {product && product.description && <SingleAuction product={product} showViewProductButton={false} />}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <SingleAuction product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Auction;
