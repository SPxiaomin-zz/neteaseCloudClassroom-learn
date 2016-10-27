# 学习总结

## 导航

- [html 总结](#html-总结)

- [css 总结](#css-总结)

- [js 总结](#js-总结)

- [原作者错误处](#原作者错误处)

## html 总结

- 源代码中的代码模块化使用了如下的注释来进行标注:

        <!-- login -->
        <!-- /login -->

## css 总结

- index.css 采用了模块化的代码编写方式，方便代码复用和管理；

    - 并通过使用特殊的注释来便于区分；

- 模块化样式分析

    - `#loginModal` 样式总结

        - 布局分析

            - .m-modal 使用 `position: fixed;` & `z-index: 9999;`：

                - 使得其覆盖在其它元素之上；
                - 并成为 .bd 的 containing box；

            - .bd 使用 `position: absolute;` & `transform: translate(-50%, -50%);` 来实现水平和垂直居中；

        - 细节分析

            - input 元素配色搭配得非常巧妙，从 `background-color -> border -> box-shadow` 颜色逐层加深，搭配出来的效果比较的好看；
            - .submit 使用了 `radial-gradient` 和 `box-shadow` 实现了不错的效果；

    - `#videoModal` 样式总结

        - 布局分析

            - 使用和 `#loginModal` 一样的部分样式；

        - 细节分析

            - video 通过使用 `width: 100%;` 来实现了适当的大小设置；

    - `#tips` 样式总结

        - 布局分析

            - 垂直方向字体居中使用 `line-height`；
            - 使用 `@media` 实现了响应式宽度设置 & 设置 `margin: 0 auto` 实现水平方向居中效果；

        - 细节分析

            - 右浮动中的 `X` 符号通过多添加一个标签并设置背景图片实现；

    - `.g-hd` 样式总结

        - 布局分析

            - 通过 `.m-top` 样式设置了浮动盒子的范围，然后就是一个 `.f-fl` & `.f-fr` 左右浮动并排在一行；

        - 细节分析

            - `.f-fl`

                - `img` & `.attention > div` 都设置了浮动，这样其实就在一定程度上避免了基线对齐方面的问题了；
                - `.attention` 设置了 `line-height`，由于继承的原因，其子元素 `div` 都会继承这个样式，从而使得字体垂直居中；

                    - 其中的小图标都是通过多添加一个标签并设置背景图片实现的；
                    - `.dnc` 字体的水平居中是通过 `text-align: center`，`.hbfo` 字体的水平居中是通过设置 `padding` 来实现的；

            - `.f-fr`

                - `li` 元素的浮动设置，避免了基线对齐方面的问题；

                    - 其实原作者中的 `display` 设置是多余的，根据 `css spec` 得知一个元素一旦设置了 `float` 之后就 `display: block`；

                - 放大镜是通过多添加一个元素并设置背景图片实现的，并且 `hover` 的时候也是通过修改 `background` 属性来实现状态转换的；

## js 总结

- 顶部通知实现总结

    - 主要是借助 `cookie` & `click` 事件：

        - `click` 之后，就设置 `cookie`，然后通过 js 动态地添加样式 `display: none;` 实现元素的隐藏；

## 原作者错误处

- index.html

    - `#loginModal`

        - from -> form;
        - h2 & a 中的登陆 －> 登录;

    - `.g-hd`

        - .u-icon-magnifiy -> .u-icon-magnify
        - .nav > li `display` 属性由于浮动的原因属于多余的设置；

- util.js

    - `addClass`: 
