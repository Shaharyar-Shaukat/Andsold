import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import CustomInput from "../components/CustomInput/CustomInput.js";

import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import image from "../assets/img/login.jpg";
import {signin, authenticate} from '../auth';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Signin(props) {

    const history = useHistory();
    let state = {
        email: '',
        password: '',
        error: '',
        success: false
    };

    const handleChange = (e, actualName) => {
        const {value} = e.currentTarget;
        state[actualName] = value;
    };

    const clickSubmit = event => {
        event.preventDefault();
        state.error = false
        state.success = true
        signin({email: state.email, password: state.password}).then(data => {
            if (data.error) {
                state.error = data.error
                state.success = false
            } else {
                authenticate(data, () => {
                    history.push("/auctions")
                });
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: state.error ? '' : 'none'}}>
            {state.error}
        </div>
    );

    const showLoading = () =>
        state.success && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const {...rest} = props;
    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="AndSold"
                rightLinks={<HeaderLinks/>}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Login</h4>
                                    </CardHeader>
                                    <p className={classes.divider}>And Start Bidding</p>
                                    <CardBody>
                                        <CustomInput
                                            labelText="Email..."
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: (event) => handleChange(event, "email"),
                                                type: "email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor}/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="password"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: (event) => handleChange(event, "password"),
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button onClick={clickSubmit} simple color="primary" size="lg">
                                            Get started
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}
