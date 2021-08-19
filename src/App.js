import React from "react";
import { AppTitle } from "./components/AppTitle/AppTitle";
import { Header } from "./components/Header/Header";
import { CoastsSection } from './components/MainSection/CoastsSection';
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            costs: [],
            date: new Date(),
        }
    }

    getData = async () => {
        const request = await fetch('http://localhost:3002/allCosts', {
            method: 'GET',
        });

        const response = await request.json();
        console.log(response.data);

        this.setState({
            costs: response.data.reverse()
        });
    }

    componentDidMount() {
        this.getData();
        this.totalPrice();
        this.formatDate();
    }

    createCostObj = (text, price) => {
        const itemId = Math.random() * 15.75;
        const costObj = {
            text,
            price,
            _id: itemId.toFixed(2),
        }

        this.setState({
            costs: [costObj, ...this.state.costs],
        });

        console.log(costObj)
    }

    setEditedPrice = (id, newPrice) => {
        const newArray = this.state.costs.map((item) => {
            if (item._id === id) {
                item.price = newPrice;
            }

            return item;
        });

        console.log(newArray);

        this.setState({
            costs: newArray,
        });

        console.log(newPrice);
    }

    totalPrice = () => {
        return this.state.costs.reduce((defaultCount, item) => { return defaultCount + item.price }, 0);
    }

    formatDate = () => {
        const date = new Date();

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };

        this.setState({ date: date.toLocaleString('ru', options) });
    }

    sendData = async (text, price) => {
        const request = await fetch('http://localhost:3002/createNewCost', {
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

        const response = await request.json();
        console.log(response);
    }

    editData = async (id, text, price) => {
        const request = await fetch('http://localhost:3002/changeCostInfo', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                text,
                price,
                _id: id
            })
        });

        const response = await request.json();
        console.log(response);

        // this.setState({
        //     costs: [costObj, ...this.state.costs],
        // });
    }

    deleteCostItem = async id => {
        let newCostsArray = this.state.costs.filter(item => item._id !== id);

        const request = await fetch('http://localhost:3002/deleteCost', {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                _id: id
            }),
        });

        const response = await request.json();
        console.log(response);

        this.setState({ costs: newCostsArray });
    }

    render() {
        return (
            <div className="App">
                <div className='App-container'>
                    <AppTitle />
                    <Header post={this.sendData} total={this.totalPrice} date={this.formatDate} createCostObj={this.createCostObj} />
                    <CoastsSection
                        createCostObj={this.createCostObj}
                        deleteItem={this.deleteCostItem}
                        date={this.state.date}
                        costsObj={this.state.costs}
                        total={this.totalPrice}
                        setEditedPrice={this.setEditedPrice}
                        editItem={this.editData}/>
                </div>
            </div>
        );
    }
}
