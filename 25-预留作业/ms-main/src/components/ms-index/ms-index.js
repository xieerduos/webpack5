import './ms-index.scss';

export default class MsIndex {
    getBodyElement() {
        let app = document.querySelector('#app');

        if (!app) {
            app = document.createElement('div');
            app.id = 'app';
            const body = document.querySelector('body');
            body.appendChild(app);
        }
        return app;
    }
    clickMsIndex() {
        this.getBodyElement().innerHTML = 'ms index';
    }
    clickImagePage() {
        console.log('clickImagePage');
        const app = this.getBodyElement();

        // 调用ms-image-app下的功能
        import('MsImageApp/MsImage').then((MsImageModule) => {
            const MsImage = MsImageModule.default;

            console.log('MsImage', MsImage);
            const msImage = new MsImage();
            msImage.render(app);
        });
    }
    clickButtonPage() {
        console.log('clickButtonPage');
        const app = this.getBodyElement();

        // 调用ms-button-app下的功能
        import('MsButtonApp/MsButton').then((MsButtonModule) => {
            const MsButton = MsButtonModule.default;
            console.log('MsButton', MsButton);
            const msButton = new MsButton();
            msButton.render(app);
        });
    }
    render() {
        const headSelection = document.createElement('div');
        const navWrap = document.createElement('ul');
        const navItemMsIndex = document.createElement('li');
        const navItemMsImage = document.createElement('li');
        const navItemMsButton = document.createElement('li');

        headSelection.classList.add('ms-index');
        headSelection.appendChild(navWrap);

        navWrap.classList.add('nav-wrap');
        navWrap.appendChild(navItemMsIndex);
        navWrap.appendChild(navItemMsImage);
        navWrap.appendChild(navItemMsButton);

        navItemMsIndex.classList.add('nav-item');
        navItemMsImage.classList.add('nav-item');
        navItemMsButton.classList.add('nav-item');
        navItemMsIndex.innerHTML = 'ms-index';
        navItemMsImage.innerHTML = 'ms-image';
        navItemMsButton.innerHTML = 'ms-button';

        navItemMsIndex.onclick = () => this.clickMsIndex();
        navItemMsImage.onclick = () => this.clickImagePage();
        navItemMsButton.onclick = () => this.clickButtonPage();

        // headSelection.innerHTML = `
        //     <ul class="nav-wrap">
        //         <li class="nav-item">ms-index</li>
        //         <li class="nav-item">ms-image</li>
        //         <li class="nav-item">ms-button</li>
        //     </ul>
        // `;

        const bodyDomElement = document.querySelector('body');
        bodyDomElement.appendChild(headSelection);
    }
}
