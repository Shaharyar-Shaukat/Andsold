export const read = (uid, token) => {
            return fetch(`http://localhost:8000/users//${uid}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err));
        };

        export const readName = (uid, token) => {
            return fetch(`http://localhost:8000/users/${uid}/list`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err));
        };

        export const update = (userId, token, user) => {
            return fetch(`http://localhost:8000/users/${userId}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(user)
            })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err));
        };

//to update the local data so change reflects immediately 

export const updateUser = (user, next) => {
    if (typeof window !== 'undefined'){
        if (localStorage.getItem('jwt')){
            let auth =JSON.parse(localStorage.getItem('jwt'));
            auth.user =  user
            localStorage.setItem('jwt',JSON.stringify(auth))
            next()
        }
    }
}