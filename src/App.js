import React from "react";
import { CostsPage } from "./CostsPage/CostsPage";
import { RegistrationPage } from "./RegistrationPage/RegistrationPage";
import LoginPage from "./LoginPage/LoginPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                    <Switch>
                        <Route path="/registration">
                            <RegistrationPage />
                        </Route>
                        <Route path="/costs">
                            <CostsPage />
                        </Route>
                        <Route path="/">
                            {localStorage.getItem('token') ? <CostsPage /> : <LoginPage />}
                        </Route>
                    </Switch>
            </Router>
        );
    }
}
