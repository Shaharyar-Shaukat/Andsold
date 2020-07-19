import React from "react";
import {Link, useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Person, Search} from "@material-ui/icons";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import {isAuthenticated, signout} from "auth";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const history = useHistory();
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    href="/auctions"
                    color="transparent"
                    className={classes.navLink}
                > <Search className={classes.icons}/>Explore
                </Button>
            </ListItem>
            {!isAuthenticated() && (
                <ListItem className={classes.listItem}>
                    <Button
                        href="/signin"
                        color="transparent"
                        className={classes.navLink}
                    > Signin
                    </Button>
                </ListItem>
            )}
            {!isAuthenticated() && (
                <ListItem className={classes.listItem}>
                    <Button
                        href="/signup"
                        color="transparent"
                        className={classes.navLink}
                    > Signup
                    </Button>
                </ListItem>
            )}
            {isAuthenticated() && (
                <ListItem className={classes.listItem}>
                    <Button
                        href="/"
                        color="transparent"
                        className={classes.navLink}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    > Signout
                    </Button>
                </ListItem>
            )}
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText="User"
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonIcon={Person}
                    dropdownList={[
                        <Link to="/dashboard" className={classes.dropdownLink}>
                            User Dashboard
                        </Link>,
                        <Link to="/create/auction" className={classes.dropdownLink}>
                            Create Auction
                        </Link>,
                        <Link to="/create/category" className={classes.dropdownLink}>
                            Create Category
                        </Link>
                    ]}
                />
            </ListItem>
        </List>
    );
}
