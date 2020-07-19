import React from "react";
import "../styles.css"
import HeaderLinks from "../components/Header/HeaderLinks";
import Header from "../components/Header/Header";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/landingPage";
import Parallax from "../components/Parallax/Parallax";
import classNames from "classnames";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";


const useStyles = makeStyles(styles);
export default function Layout({
                                   title = "Title",
                                   description = "Description",
                                   className,
                                   children
                               }) {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    return (
        <div>
            <Header
                color="transparent"
                brand="AndSold"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
            />
            <Parallax filter image={require("../assets/img/login.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>{title}</h1>
                            <h4>
                                {description}
                            </h4>
                            <br/>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={className}>{children}</div>
                </div>
            </div>
        </div>
    )
}
