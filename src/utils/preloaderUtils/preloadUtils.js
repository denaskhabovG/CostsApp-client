import './styles.css';

export const spinner = button => {
    button.current.innerHTML = `<div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`
}
