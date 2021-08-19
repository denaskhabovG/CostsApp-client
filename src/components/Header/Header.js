import React from "react";
import './styles.css'

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', price: 0, value: false};
        this.textInput = React.createRef();
        this.priceInput = React.createRef();
        this.errorMessage = React.createRef();
    }

    whereWasSpent = event => {
        this.setState({ text: event.target.value });
    }

    howManySpent = event => {
        this.setState({ price: parseInt(event.target.value) });
    }

    formSubmit = event => {
        event.preventDefault();
        const priceInput = this.priceInput.current.value;
        const textInput = this.textInput.current.value;

        if (!priceInput || !textInput) {
            this.errorMessage.current.innerHTML = 'Заполните все поля!';
        } else {
            this.errorMessage.current.innerHTML = '';
            this.setState({ value: true });
            this.textInput.current.value = '';
            this.priceInput.current.value = '';
            this.props.date();
            this.props.createCostObj(this.state.text, this.state.price);
            this.props.post(this.state.text, parseInt(this.state.price));
        }
    }

    render() {
        return (
            <header className='header'>
                <form onSubmit={this.formSubmit} className='header__form'>
                    <label className='header__label'>
                        <span className='form__title'>Куда было потрачено:</span>
                        <input ref={this.textInput} onChange={this.whereWasSpent} className='header__input header__input--spent' type="text"/>
                        <span ref={this.errorMessage} className='error-block'> </span>
                    </label>
                    <label className='header__label'>
                        <span className='form__title'>Сколько было потрачено:</span>
                        <input ref={this.priceInput} onChange={this.howManySpent} className='header__input header__input--haw-many' type="text"/>
                    </label>
                    <button className='header__btn'>Добавить</button>
                </form>
                <div className='header__total'>
                    Итого:
                    <span> {parseInt(this.props.total())} </span>
                    р.
                </div>
            </header>
        )
    }
}
