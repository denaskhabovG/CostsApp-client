import React from "react";
import { CostItem } from "../CostItem/CostItem";
import './style.css';

export class CostsList extends React.Component {
    render() {
        return (
            <ul className='coasts-list'>
                {
                    this.props.costs.map((item, index) => {
                        return <CostItem
                             date={this.props.date}
                             increaseCosts={index + 1}
                             itemObj={item}
                             key={item._id}
                             deleteItem={this.props.deleteItem}
                             total={this.props.total}
                             createCostObj={this.props.createCostObj}
                             setEditedPrice={this.props.setEditedPrice}
                             editItem={this.props.editItem}/>
                    })
                }
            </ul>
        )
    }
}
