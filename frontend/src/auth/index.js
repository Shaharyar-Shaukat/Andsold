import { API } from '../Config'


export const signup = (user) => {
    return fetch(`http://localhost:8000/authentication/signup`, {//URL = backend api url replace followed by the method and headers/body for the request 
        method: 'POST',
        headers: {
            Accept: 'applicaiton/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)

    })
        .then(respose => {
            return respose.json
        })
        .catch(err => {
            console.log(err)
        })
}

export const signin = (user) => {
    return fetch(`${API}authentication/signin`, {//URL = backend api url replace followed by the method and headers/body for the request 
        method: 'POST',
        headers: {
            Accept: 'applicaiton/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)

    })
        .then(respose => {
            return respose.json
        })
        .catch(err => {
            console.log(err)
        })
}

export const authenticate = (data, next) => {
    if (typeof window != 'undefined') {
        localStorage.setItem('JWT', JSON.stringify(data))
        next();
    }
}

export const signout = (next) => {
    if (typeof window != 'undefined') {
        localStorage.removeItem('JWT')

        next()
        return fetch(`${API}/signout`, {
            method: "GET",
        }).then(respose => {
            console.log("Signout", respose)
        })
            .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
