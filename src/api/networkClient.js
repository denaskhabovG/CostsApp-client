// TODO: создать клиента для запросов к API
// описание - класс с помощью которого можно делать запросы

export class NetworkClient {
    static getAllCosts = async () => {
        const request = await fetch('http://localhost:3002/allCosts', {
            method: 'GET',
        });

        return await request.json();
    }

    static createNewCost = async (text, price) => {
        const response = await fetch('http://localhost:3002/createNewCost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                text,
                price
            })
        });

        return await response.json();
    }

    static changeCostInfo = async (id, text, price) => {
        const response = await fetch('http://localhost:3002/changeCostInfo', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                text,
                price,
                _id: id,
            }),
        });

        return await response.json();
    }

    static deleteCost = async id => {
        await fetch('http://localhost:3002/deleteCost', {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                _id: id
            }),
        });
    }
}
