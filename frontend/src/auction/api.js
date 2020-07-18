export const createCategory = (userId, token, category) => {
    return fetch(`http://localhost:8000/categories/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export const getUser = (id,token) =>{
    return fetch(`http://localhost:8000/users/list/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));    
};

export const sendMail = (_id,token,data) =>{
    //alert(data.list)
    return fetch(`http://localhost:8000/mail/mail`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            //alert(`${data} is hosted`)
            return response.json();
        })
        .catch(err => console.log(err));    
};

export const getCategories = () => {
    return fetch(`http://localhost:8000/categories/list`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createAuction = (userId, token, product) => {
    return fetch(`http://localhost:8000/auctions/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getAuctions = (sortBy) => {
    return fetch(`http://localhost:8000/auctions/list?sortBy=${sortBy}&order=desc&limit=8`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};