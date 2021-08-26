import React from "react";
import { CostItem } from "../CostItem/CostItem";
import './style.css';

export class CostsList extends React.Component {
    render() {
        return (
            <ul className='coasts-list'>
                {
                    this.props.costs === undefined ? '' : this.props.costs.map((item, index) => {
                        return <CostItem
                             index={index + 1}
                             item={item}
                             key={item._id}
                             deleteItem={this.props.deleteItem}
                             editItem={this.props.editItem}/>
                    })
                }
            </ul>
        )
    }
}
