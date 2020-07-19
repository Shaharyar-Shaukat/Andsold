import React from "react";

const SingleCardImage = ({item}) => (
    <div className="product-img ">
        <img
            src={`http://localhost:8000/auctions/image/${item}`}
            alt={item}
            className="mb-3 SingleAutionPhoto"
            style={{ maxHeight: "500px", maxWidth: "500px" }}
        />
    </div>
);

export default SingleCardImage;