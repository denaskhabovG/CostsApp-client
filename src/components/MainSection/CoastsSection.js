import React from "react";
import { CostsList } from "../CostsList/CostsList";
import './style.css';

export class CoastsSection extends React.Component {
    render() {
        return (
            <section className='coasts-section'>
                <CostsList
                    deleteItem={this.props.deleteItem}
                    costs={this.props.costs}
                    editItem={this.props.editItem}/>
            </section>
        )
    }
}
