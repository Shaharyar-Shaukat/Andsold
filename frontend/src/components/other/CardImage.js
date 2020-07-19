import React from "react";
import GridItem from "../Grid/GridItem";
import classNames from "classnames";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

const CardImage = ({item}) => {

    const classes = useStyles();
    const navImageClasses = classNames(classes.imgRaised, classes.imgFluid);
    return (
        <GridItem xs={12} sm={12} md={6} className={classes.imgFluid}>
            <a href={`/auction/${item}`}>
                <img
                    alt={item}
                    src={`http://localhost:8000/auctions/image/${item}`}
                    className={navImageClasses}
                />
            </a>
        </GridItem>
    )
};


export default CardImage;