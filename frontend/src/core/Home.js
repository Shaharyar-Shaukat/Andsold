import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

import ProductSection from "core/Sections/ProductSection.js";
import ItemSection from "core/Sections/ItemSection.js";
import { isAuthenticated} from "auth";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function Home(props) {
    const classes = useStyles();
    const { ...rest } = props;
    return (
        <div>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="AndSold"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax filter image={require("../assets/img/login.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Broaden your Garage Sale Audience</h1>
                            <h4>
                                Each year, millions of americans throw away unused items or sell them for cheap on garage sales.
                                Make more of your stuff by selling them to the people that really appreciate their value.
                            </h4>
                            <br />
                            {!isAuthenticated() && (
                                <Button
                                    color="danger"
                                    size="lg"
                                    href="/signup"
                                    rel="noopener noreferrer"
                                >
                                    <i className="MuiButtonBase-root" />
                                    Register now
                                </Button>
                            )}
                            {isAuthenticated() && (
                                <Button
                                    color="danger"
                                    size="lg"
                                    href="/auctions"
                                    rel="noopener noreferrer"
                                >
                                    <i className="MuiButtonBase-root" />
                                    Start Exploring
                                </Button>
                            )}
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <ProductSection />
                    <ItemSection />
                </div>
            </div>
        </div>
    );
}
