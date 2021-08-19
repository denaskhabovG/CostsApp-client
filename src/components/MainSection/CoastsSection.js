import React from "react";
import { CostsList } from "../CostsList/CostsList";
import './style.css';

export class CoastsSection extends React.Component {
    render() {
        return (
            <section className='coasts-section'>
                <CostsList
                    deleteItem={this.props.deleteItem}
                    date={this.props.date}
                    costs={this.props.costsObj}
                    total={this.props.total}
                    createCostObj={this.props.createCostObj}
                    setEditedPrice={this.props.setEditedPrice}
                    editItem={this.props.editItem}/>
            </section>
        )
    }
}
