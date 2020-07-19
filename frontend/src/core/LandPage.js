import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import CardBlock from 'components/Card/CardBlock';
import {getCategories, getFilteredAuctions} from "auction/api";
import Checkbox from 'components/CustomInput/Checkbox';
import RadioBox from "components/CustomInput/RadioBox";
import SearchBar from "../components/CustomInput/SearchBar";
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import styles from "assets/jss/material-kit-react/views/landingPageSections/itemStyle.js";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(styles);


const LandPage = () => {
    const prices = [
        {
            _id: 0,
            name: "Any",
            array: []
        },
        {
            _id: 1,
            name: "€0 to €9",
            array: [0, 9]
        },
        {
            _id: 2,
            name: "€10 to €19",
            array: [10, 19]
        },
        {
            _id: 3,
            name: "€20 to €49",
            array: [20, 49]
        },
        {
            _id: 4,
            name: "€50 to €99",
            array: [50, 99]
        },
        {
            _id: 5,
            name: "More than €100",
            array: [100, 499]
        }
    ];

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
