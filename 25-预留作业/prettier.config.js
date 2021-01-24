/**
 * @file 解决使用 vscode 配置 prettier 不生效问题
 * @author lishaohai
 */

// 官网地址 https://prettier.io/docs/en/configuration.html

// 比较好的文章：https://juejin.im/post/5cc58039f265da03775c5a6f

module.exports = {
    trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    proseWrap: 'never',
    printWidth: 120,
    bracketSpacing: false, // 对象紧贴花括号部分不允许包含空格
    jsxSingleQuote: false,
    space_after_anon_function: true,
    space_after_named_function: true
};
