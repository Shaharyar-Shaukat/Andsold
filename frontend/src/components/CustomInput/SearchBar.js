import React, {useEffect, useState} from "react";
import {getCategories, listBySearchBox} from "auction/api";
import CardBlock from "components/Card/CardBlock";

const SearchBar = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const {categories, category, search, results, searched} = data;

    const loadCategoriesFromDB = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({...data, categories: data});
            }
        });
    };

    useEffect(() => {
        loadCategoriesFromDB();
    }, []);

    const searchAuctions = () => {
        if (search) {
            listBySearchBox({search: search || undefined, category: category}).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({...data, results: response, searched: true});
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchAuctions();
    };

    const handleChange = name => event => {
        setData({...data, [name]: event.target.value, searched: false});
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedAuctions = (results = []) => {
        return (
            <div>
                <h2 className="mt-3 mb-4">
                    {searchMessage(searched, results)}
                </h2>

                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-3 mb-4">
                            <CardBlock key={i} product={product}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{border: "none"}}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
            <div className="container-fluid mb-3">
                {searchedAuctions(results)}
            </div>
        </div>
    );
};

export default SearchBar;
