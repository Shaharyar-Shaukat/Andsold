import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import {Apps, CloudDownload, Person} from "@material-ui/icons";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import {signout, isAuthenticated} from "auth";
import { useHistory } from "react-router-dom";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const history = useHistory();
    const classes = useStyles();
    return (
        <List className={classes.list}>
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
                <Button
                    href="/dashboard"
                    color="transparent"
                    className={classes.navLink}
                > <Person className={classes.icons}/>Profile
                </Button>
            </ListItem>
        </List>
    );
}
