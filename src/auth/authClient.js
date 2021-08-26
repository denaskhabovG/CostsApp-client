export class AuthClient {
    constructor(token) {
        this.token = token;
    }
    static registration = async (username, password) => {
        try {
            const response = await fetch('http://localhost:5001/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const result = await response.json();

            if (result.accessToken) {
                localStorage.setItem('token', JSON.stringify({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
            }

            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static login = async (username, password, error, fn) => {
        try {
            const response = await fetch('http://localhost:5001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const result = await response.json();
            error = result.message;

            if (result.accessToken) {
                localStorage.setItem('token', JSON.stringify({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
                error = '';
                fn();
            }

        } catch (e) {
            console.log(e);
        }
    }

    static refreshUserToken = async (token) => {
        try {
            const response = await fetch('http://localhost:5001/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + token
                },
            });

            const result = await response.json();

            localStorage.setItem('token', JSON.stringify(result));
        } catch (e) {
            console.log(e);
        }
    }
}
