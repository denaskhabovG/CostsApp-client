import React from "react";
import './styles.css'
import {isNaN} from "formik";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.priceInput = React.createRef();
        this.errorMessage = React.createRef();
    }

    formSubmit = event => {
        event.preventDefault();
        const priceInput = this.priceInput.current.value;
        const textInput = this.textInput.current.value;

        if (!priceInput || isNaN(+priceInput) || !textInput) {
            this.errorMessage.current.innerHTML = 'Заполните все поля!';
        } else {
            this.props.createCost(textInput, parseInt(priceInput));
            this.errorMessage.current.innerHTML = '';
            this.textInput.current.value = '';
            this.priceInput.current.value = '';
        }
    }

    render() {
        return (
            <header className='header'>
                <form onSubmit={this.formSubmit} className='header__form'>
                    <label className='header__label'>
                        <span className='form__title'>Куда было потрачено:</span>
                        <input ref={this.textInput} className='header__input header__input--spent' type="text"/>
                        <span ref={this.errorMessage} className='error-block'> </span>
                    </label>
                    <label className='header__label'>
                        <span className='form__title'>Сколько было потрачено:</span>
                        <input ref={this.priceInput} className='header__input header__input--haw-many' type="text"/>
                    </label>
                    <button className='header__btn'>Добавить</button>
                </form>
                <div className='header__total'>
                    Итого:
                    <span> {parseInt(this.props.total)} </span>
                    р.
                </div>
            </header>
        )
    }
}
