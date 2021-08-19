import React from "react";
import './styles.css';

export class CostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            editText: this.props.itemObj.text,
            editPrice: this.props.itemObj.price};
    }

    changeState = () => {
        this.setState({ edit: true });
    }

    changePrice = (event) => {
        this.setState({ editPrice: event.target.value });
    }

    changeText = (event) => {
        this.setState({ editText: event.target.value });
    }

    editPrice = () => {
        if (!this.state.edit) {
            return <span className='cost__price'> {!this.state.edit ? this.state.editPrice : this.props.itemObj.price} </span>
        } else {
            return <input onKeyPress={this.editItem} onChange={this.changePrice} className='cost__input cost__input--price' type='text'/>
        }
    }

    editShop = () => {
        if (!this.state.edit) {
            return <span className='cost__date'> "{!this.state.edit ? this.state.editText : this.props.itemObj.text}" </span>
        } else {
            return <input onKeyPress={this.editItem} onChange={this.changeText} className='cost__input' type='text'/>
        }
    }

    editItem = (event) => {
        if (event.key === 'Enter') {
            this.setState({ edit: false });
            this.props.setEditedPrice(this.props.itemObj._id, parseInt(this.state.editPrice));
            this.props.editItem(this.props.itemObj._id, this.state.editText, this.state.editPrice);
        }
    }

    render() {
        return (
            <li className='coasts-list__item cost' id={this.props.itemObj._id}>
                <div className='cost__inner'>
                    <span className='cost__number'> {this.props.increaseCosts}) </span> Магазин
                    {this.editShop()}
                    <span className='cost__date'> {this.props.date.toLocaleString()} </span>
                </div>
                <div>
                    {this.editPrice()}
                    <button onClick={() => this.changeState()} className='cost__btn cost__btn--edit'>Изменить</button>
                    <button onClick={() => {
                        this.props.deleteItem(this.props.itemObj._id);
                        // this.deleteData();
                    }} className='cost__btn cost__btn--delete'>&times;</button>
                </div>
            </li>
        )
    }
}
