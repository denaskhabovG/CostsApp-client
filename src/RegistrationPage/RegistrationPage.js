import React from "react";
import { Link } from "react-router-dom";
import { AuthClient } from "../auth/authClient";
import './styles.css';

export class RegistrationPage extends React.Component{
    constructor(props) {
        super(props);
        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();
        this.errorMessage = React.createRef();
    }

    goToLoginPage = () => {
        document.location.href = "https://costs-app-mdwvbh29o-exceed.vercel.app";
    }

    createUser = event => {
        event.preventDefault();

        const username = this.usernameInput.current.value;
        const password = this.passwordInput.current.value;

        if (!username || !password) {
            this.errorMessage.current.innerHTML = 'Заполните все поля!';
        } else if (password.length < 4) {
            this.errorMessage.current.innerHTML = 'Пароль должен содеражать больше 4 смволов!';
        } else {
            AuthClient.registration(this.usernameInput.current.value, this.passwordInput.current.value);
            this.usernameInput.current.value = '';
            this.passwordInput.current.value = '';
            this.goToLoginPage();
        }
    }

    render() {
        return (
            <div className='registration'>
                <h2 className='registration__title'>Регистрация</h2>
                <form onSubmit={this.createUser} className='registration__form'>
                    <label className='registration__label'>
                        <span className='label__text'>Введите имя пользователя</span>
                        <input ref={this.usernameInput} className='registration__input' type="text"/>
                    </label>

                    <label className='registration__label'>
                        <span className='label__text'>Введите пароль</span>
                        <input autoComplete="off" ref={this.passwordInput} className='registration__input' type="password"/>
                    </label>
                    <span className='error-block' ref={this.errorMessage} > </span>
                    <button className='registration__btn'>Создать</button>
                </form>
                <div className='registration__question'>
                    <span className='question__text'>Если уже есть аккаунт, то Вы можете</span>
                    <Link to='/Login'>Войти.</Link>
                </div>
            </div>
        );
    }
}
