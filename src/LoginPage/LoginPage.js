import React from "react";
import {Link, withRouter} from "react-router-dom";
import { AuthClient } from "../auth/authClient";
import {spinner} from "../utils/preloaderUtils/preloadUtils";
import './styles.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();
        this.errorMessage = React.createRef();
        this.spinnerButton = React.createRef();
    }

    loginUser = async event => {
        event.preventDefault();

        const username = this.usernameInput.current.value;
        const password = this.passwordInput.current.value;

        if (!username || !password) {
            this.errorMessage.current.innerHTML = 'Заполните все поля!';
        } else {
            const token = await AuthClient.login(
                this.usernameInput.current.value,
                this.passwordInput.current.value,
                this.errorMessage.current.innerHTML,
            );
            if (token !== '') {
                spinner(this.spinnerButton);

                setTimeout(() => {
                    this.props.history.push("/costs");
                }, 3000);
            }
            this.usernameInput.current.value = '';
            this.passwordInput.current.value = '';
        }
    }

    render() {
        return (
            <div className='login'>
                <h2 className='login__title'>Вход</h2>
                <form onSubmit={this.loginUser} className='login__form'>
                    <label className='login__label'>
                        <span className='label__text'>Введите имя пользователя</span>
                        <input ref={this.usernameInput} className='login__input' type="text"/>
                    </label>

                    <label className='login__label'>
                        <span className='label__text'>Введите пароль</span>
                        <input autoComplete="off" ref={this.passwordInput} className='login__input' type="password"/>
                    </label>
                    <span className='error-block' ref={this.errorMessage}> </span>
                    <button ref={this.spinnerButton} className='login__btn'>Войти</button>
                </form>
                <div className='login__question'>
                    <span className='question__text'>Если нет аккаунта, то Вы можете</span>
                    <Link to='registration'>Зарегестрироваться.</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);
