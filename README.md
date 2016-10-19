# 学习总结

## 导航

- [css 总结](#css-总结)

- [原作者错误处](#原作者错误处)

## css 总结

- index.css 采用了模块化的代码编写方式，方便代码复用和管理；

### 模块化样式分析

- #loginModal 样式总结

    - 布局分析

        - .m-modal 使用 `position: fixed;` & `z-index: 9999;`：

            - 使得其覆盖在其它元素之上；
            - 并成为 .bd 的 containing box；

        - .bd 使用 `position: absolute;` & `transform: translate(-50%, -50%);` 来实现水平和垂直居中；

    - 细节分析

        - input 元素配色搭配得非常巧妙，从 `background-color -> border -> box-shadow` 颜色逐层加深，搭配出来的效果比较的好看；
        - submit

## 原作者错误处

- index.html

    - #loginModal

        - from -> form;
        - h2 & a 中的登陆 －> 登录;
