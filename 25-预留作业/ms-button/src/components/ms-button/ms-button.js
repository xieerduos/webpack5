import './ms-button.scss';

class MsButton {
    // 自定义 类属性
    buttonCssClass = 'ms-button';

    render(body) {
        const button = document.createElement('button');
        button.innerHTML = 'MSButton';
        button.classList.add(this.buttonCssClass);
        if (!body) {
            body = document.querySelector('body');
        } else {
            body.innerHTML = '';
        }

        button.onclick = function () {
            const p = document.createElement('p');
            p.innerHTML = '米斯特李';
            p.classList.add('ms-text');
            body.appendChild(p);
        };

        body.appendChild(button);
    }
}

export default MsButton;
