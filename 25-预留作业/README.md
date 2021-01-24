### webpack5 入门到放弃

webpack5 实现前端微服务

### 运行项目 

ms-button

```bash
# 切换目录 
cd ms-button
# npm install
npm install
# development
npm run dev
```

ms-image

```bash
# 切换目录 
cd ms-image
# npm install
npm install
# development
npm run dev
```
ms-main

```bash
# 切换目录 
cd ms-main
# npm install
npm install
# development
npm run dev
```

### webpack5 导出模块

ms-button.js

```js
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

```

webpack配置

```js
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:9001/' // 必填（否则可能会报错，出不来效果）
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'MsButtonApp',
            filename: 'remoteEntry.js', // http://localhost:9001/remoteEntry.js
            exposes: {
                './MsButton': './src/components/ms-button/ms-button.js'
            }
        })
    ]
}
```
### webpack5 远程加载模块

webpack 配置

```js
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:9001/' // 必填（否则可能会报错，出不来效果）
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'MsButtonApp',
            remotes: {
                MsButtonApp: 'MsButtonApp@http://localhost:9001/remoteEntry.js'
            }
        }),
    ]
}

```

代码中使用

```js
// 调用ms-button-app下的功能
import('MsButtonApp/MsButton').then((MsButtonModule) => {
    const MsButton = MsButtonModule.default;
    console.log('MsButton', MsButton);
    const msButton = new MsButton();
    msButton.render(app);
});
```