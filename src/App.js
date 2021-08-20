import React from "react";
import { AppTitle } from "./components/AppTitle/AppTitle";
import { Header } from "./components/Header/Header";
import { CoastsSection } from './components/MainSection/CoastsSection';
import { totalPrice } from "./utils/arrayUtils";
import './App.css';
import {NetworkClient} from "./api/networkClient";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            costs: [],
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        try {
            const response = await NetworkClient.getAllCosts();

            this.setState({
                costs: response.data
            });
        } catch (e) {
            console.log(e);
        }

    }

    createCost = async (text, price) => {
        try {
            const parsedResponse = await NetworkClient.createNewCost(text, price);

            this.setState({
                costs: [parsedResponse, ...this.state.costs],
            });
        } catch (e) {
            console.log(e);
        }
    }

    editData = async (id, text, price) => {
        try {
            const parsedResponse = await NetworkClient.changeCostInfo(id, text, price);

            const newCosts = this.state.costs.map(item => {
                if (item._id === parsedResponse._id) {
                    item = parsedResponse;
                }

                return item;
            });

            this.setState({ costs: newCosts });
        } catch (e) {
            console.log(e);
        }
    }

    deleteCostItem = async id => {
        try {
            const newCostsArray = this.state.costs.filter(item => item._id !== id);

            await NetworkClient.deleteCost(id);

            this.setState({ costs: newCostsArray });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="App">
                <div className='App-container'>
                    <AppTitle />
                    <Header createCost={this.createCost} total={totalPrice(this.state.costs)} />
                    <CoastsSection
                        deleteItem={this.deleteCostItem}
                        costs={this.state.costs}
                        editItem={this.editData}/>
                </div>
            </div>
        );
    }
}
