import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import CardBlock from 'components/other/CardBlock';
import {getCategories, getFilteredAuctions} from "auction/api";
import Checkbox from 'components/other/Checkbox';
import {prices} from "components/other/PriceRange";
import RadioBox from "components/other/RadioBox";
import SearchBar from "../components/other/SearchBar";
import GridItem from "../components/Grid/GridItem";
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody";
import GridContainer from "../components/Grid/GridContainer";
import classNames from "classnames";
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import {black} from "color-name";

const useStyles = makeStyles(styles);


const LandPage = () => {
    const classes = useStyles();
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const navImageClasses = classNames(classes.imgRaised, classes.imgFluid);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredAuctions = newFilters => {
        // console.log(newFilters);
        getFilteredAuctions(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredAuctions(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredAuctions(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredAuctions(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >,
            <SearchBar/>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.title}>
                            <h4>Filter by categories</h4>
                            <ul>
                                <Checkbox
                                    categories={categories}
                                    handleFilters={filters =>
                                        handleFilters(filters, "category")
                                    }
                                />
                            </ul>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.title}>
                        <h4>Filter by price range</h4>
                        <div>
                            <RadioBox
                                prices={prices}
                                handleFilters={filters =>
                                    handleFilters(filters, "price")
                                }
                            />
                        </div>
                    </div>
                </GridItem>
            </GridContainer>

            <div className={classes.section}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                            {filteredResults.map((product, i) => (
                                <GridItem xs={12} sm={12} md={4} key={i}>
                                    <CardBlock product={product}/>
                                </GridItem>
                            ))}
                        </GridContainer>
                        <hr/>
                        {loadMoreButton()}
                    </GridItem>
                </GridContainer>
            </div>
        </Layout>
    );
};

export default LandPage;
