class StoreManager
{
    async createStore(name, password, description) {
        return fetch('http://localhost:5029/Store/CreateStore', {
            method: "POST",
            body: JSON.stringify({
                'name': name,
                'password': password,
                'description': description
            }),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('There was a problem creating a store:', error);
            });
    }

    async login(name, password) {
        return fetch('http://localhost:5029/Store/LoginStore', {
            method: "POST",
            body: JSON.stringify({
                'username': name,
                'password': password,
            }),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(response => {
                return response;
            })
            .catch(error => {
                console.error('There was a problem logging in as a store:', error);
            });


    }

    async deleteStore(storeId) {
        return fetch('http://localhost:5029/Store/DeleteStore?' + 'id=' + storeId, {
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                console.error('There was a problem deleting a store:', error);
            });
    }

    async GetStore(storeId)
    {
        return fetch('http://localhost:5029/Store/GetStore?' + 'userId=' + storeId, {
            method: "GET",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }

        })
        .then((response) => {
            return response.json();
        })
    }

    async CreateProduct(storeId, name, description, price)
    {
        return fetch('http://localhost:5029/Store/CreateProduct', {
            method: "POST",
            body: JSON.stringify({
                storeId: storeId,
                name: name,
                description: description,
                price: price
            }),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }

        })
        .then((response) => {
            return response.json();
        })
    }

    async runEverything() {
        await this.createStore('lucena', '1337', "lojona")
        var id = await this.login('lucena', '1337');
        console.log(id);
        await this.deleteStore(id.id);
    }
}

export {StoreManager}