import React from "react";

const CardImage = ({item}) => (
    <div className="product-img">
        <img
            src={`http://localhost:8000/auctions/image/${item}`}
            alt={item}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);


export default CardImage;