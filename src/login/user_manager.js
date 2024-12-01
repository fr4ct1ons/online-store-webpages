class UserManager {
    async createUser(name, password) {
        return fetch('http://localhost:5029/User/CreateUser', {
            method: "POST",
            body: JSON.stringify({
                'name': name,
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
            })
            .catch(error => {
                console.error('There was a problem creating an user:', error);
            });
    }
    async runEverything() {
        await this.createUser('marco', '1234')
        var id = await this.login('marco', '1234');
        console.log(id);
        await this.deleteUser(id['id']);
    }
    async deleteUser(userId) {
        return fetch('http://localhost:5029/User/DeleteUser?' + 'userId=' + userId, {
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
                console.error('There was a problem creating an user:', error);
            });
    }


    async login(name, password) {
        return fetch('http://localhost:5029/User/LoginUser', {
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
                console.error('There was a problem logging in:', error);
            });


    }
}
export { UserManager };