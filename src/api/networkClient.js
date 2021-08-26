import {AuthClient} from "../auth/authClient";

export class NetworkClient {
    static getAllCosts = async () => {
        try {
            const tokens = JSON.parse(localStorage.getItem('token'));

            const response = await fetch('http://localhost:5001/costs', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + tokens.accessToken,
                },
            });

            const result = await response.json();

            if (result.message && (result.message.message === 'jwt expired')) {
                await AuthClient.refreshUserToken(tokens.refreshToken);
            }

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }

    static createNewCost = async (text, price) => {
        try {
            const tokens = JSON.parse(localStorage.getItem('token'));

            const response = await fetch('http://localhost:5001/costs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + tokens.accessToken
                },
                body: JSON.stringify({
                    text,
                    price
                })
            });

            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }

    static changeCostInfo = async (id, text, price) => {
        try {
            const tokens = JSON.parse(localStorage.getItem('token'));

            const response = await fetch(`http://localhost:5001/costs/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + tokens.accessToken
                },
                body: JSON.stringify({
                    text,
                    price,
                }),
            });

            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }

    static deleteCost = async (id) => {
        try {
            const tokens = JSON.parse(localStorage.getItem('token'));

            await fetch(`http://localhost:5001/costs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + tokens.accessToken
                },
            });
        } catch (e) {
            console.log(e);
        }
    }
}
