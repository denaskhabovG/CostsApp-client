import React from "react";
import {formatDate} from "../../utils/stringUtils";
import './styles.css';

export class CostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            editText: this.props.item.text,
            editPrice: this.props.item.price,
        };
    }

    changeEditState = () => {
        this.setState({ edit: true });
    }

    changePrice = (event) => {
        this.setState({ editPrice: event.target.value });
    }

    changeText = (event) => {
        this.setState({ editText: event.target.value });
    }

    editItem = (event) => {
        if (event.key === 'Enter') {
            this.setState({ edit: false });
            this.props.editItem(this.props.item._id, this.state.editText, this.state.editPrice);
        }
    }

    getPriceLayout = () => {
        if (!this.state.edit) {
            return <span className='cost__price'> {!this.state.edit ? this.state.editPrice : this.props.item.price} </span>
        } else {
            return <input onKeyPress={this.editItem} onChange={this.changePrice} className='cost__input cost__input--price' type='text'/>
        }
    }

    getShopLayout = () => {
        if (!this.state.edit) {
            return <span className='cost__date'> "{!this.state.edit ? this.state.editText : this.props.item.text}" </span>
        } else {
            return <input onKeyPress={this.editItem} onChange={this.changeText} className='cost__input' type='text'/>
        }
    }

    render() {
        return (
            <li className='coasts-list__item cost' id={this.props.item._id}>
                <div className='cost__inner'>
                    <span className='cost__number'> {this.props.index}) </span> Магазин
                    {this.getShopLayout()}
                    <span className='cost__date'>
                        {formatDate(this.props.item.date)}
                    </span>
                </div>
                <div>
                    {this.getPriceLayout()}
                    <button onClick={this.changeEditState} className='cost__btn cost__btn--edit'>Изменить</button>
                    <button onClick={() => {
                        this.props.deleteItem(this.props.item._id);
                    }} className='cost__btn cost__btn--delete'>&times;</button>
                </div>
            </li>
        )
    }
}
