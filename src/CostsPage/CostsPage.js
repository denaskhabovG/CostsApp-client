import React from "react";
import { NetworkClient } from "../api/networkClient";
import { AppTitle } from "./components/AppTitle/AppTitle";
import { Header } from "./components/Header/Header";
import { totalPrice } from "../utils/arrayUtils";
import { CoastsSection } from "./components/MainSection/CoastsSection";
import { Route, Redirect, Link } from 'react-router-dom';
import './styles.css';

export class CostsPage extends React.Component {
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
        const costs = await NetworkClient.getAllCosts();

        this.setState({ costs });
    }

    createCost = async (text, price) => {
        const parsedResponse = await NetworkClient.createNewCost(text, price);
        console.log(parsedResponse)

        this.setState({
            costs: [parsedResponse, ...this.state.costs],
        });
    }

    editData = async (id, text, price) => {
        const parsedResponse = await NetworkClient.changeCostInfo(id, text, price);

        const newCosts = this.state.costs.map(item => {
            if (item._id === parsedResponse._id) {
                item = parsedResponse;
            }

            return item;
        });

        this.setState({ costs: newCosts });
    }

    deleteCostItem = async id => {
        const newCostsArray = this.state.costs.filter(item => item._id !== id);

        await NetworkClient.deleteCost(id);

        this.setState({ costs: newCostsArray });
    }

    render() {
        return (
            <Route render={() => {
                if (localStorage.getItem('token') !== null || localStorage.getItem('isAuth')) {
                    return (
                        <div className="App">
                            <div className='log-out'>
                                <Link onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('isAuth');
                                    window.location.reload();
                                }} to={'/'} className='log-out__btn'>Log out</Link>
                            </div>
                            <div className='App-container'>
                                <AppTitle />
                                <Header createCost={this.createCost} total={totalPrice(this.state.costs)} costs={this.state.costs}/>
                                <CoastsSection
                                    deleteItem={this.deleteCostItem}
                                    costs={this.state.costs}
                                    editItem={this.editData}
                                    createCost={this.createCost}/>
                            </div>
                        </div>
                    )

                } else {
                    return <Redirect to={'/'}/>
                }
            }} />
        );
    }
}
