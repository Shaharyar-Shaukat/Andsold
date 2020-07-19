import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { LocalShipping, ShoppingCart } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk product</h2>
          <h5 className={classes.description}>
            AndSold: Make more of your things! AndSold is a platforms for people seeking the curiosities of conventional
            garage sales, all while saving the time, effort and risk of going outside. Sellers and potential buyers get
            connected by a fast and secure way of making second-hand sales.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Bid on your favorite items"
              description="It's just like a garage sale. But Online."
              icon={ShoppingCart}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Pay Securely"
              description="Use PayPal for easy, painless and refundable payment!"
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Everything at your doorstep"
              description="Don't ever again think about how you get that new sofa in your car!"
              icon={LocalShipping}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
