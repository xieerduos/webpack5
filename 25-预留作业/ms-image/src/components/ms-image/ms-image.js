import Girls from './girls.jpg';
import './ms-image.scss';
class MsImage {
    render(bodyDomElement) {
        const img = document.createElement('img');
        img.src = Girls;
        img.alt = 'Girls';
        img.classList.add('ms-image');
        if (!bodyDomElement) {
            bodyDomElement = document.querySelector('body');
        } else {
            bodyDomElement.innerHTML = '';
        }
        console.log('bodyDomElement', bodyDomElement);
        bodyDomElement.appendChild(img);
    }
}

export default MsImage;
