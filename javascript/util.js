/**
* 一些常用方法
* @author 3013366498@qq.com
* @param {[type]} global [description]
* @return {[type]}       [description]
*/

(function(global) {
    if (!global.util) {
        var util = global.util = {};
    }

    /* ie678判定 */
    var ie678 = util.ie678 = /\w/.test('\u0130');

    var d = document;

    /**
    * 数组遍历函数
    * @param {Array} array 待遍历的数组
    * @param {Function} fn 回调函数
    * @ignore
    */
    var forEach = util.forEach = function(array, fn) {
        for (var i = 0, len = array.length; i < len; i++) {
            fn(array[i], i);
        }
    };

    /**
     * 生成关于 Class 的正则
     * @param {Object} cache [description]
     * @return {[type]} [description]
     */
    var classReg = (function() {
        var cache = {};

        return function(name) {
            return cache[name] || (cache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'));
        };
    })();

    /**
     * 检测某个节点是否拥有该 className
     * @param {[type]} el [description]
     * @param {[type]} className [description]
     * @return {Boolean}    [description]
     */
    var hasClass = util.hasClass = function(el, className) {
        if (className && el) {
            return classReg(className).test(el.className);
        }
    };

    /**
     * 给某个节点添加 class
     */
    var addClass = util.addClass = function(el, classNames) {
        if (classNames && el) {
            var oldClassName = el.className;
            var classArr = [];
            forEach(classNames.split('/\s+/'), function(item) {
                !hasClass(el, item) && classArr.push(item);
            });

            classArr.length > 0 && (el.className += (oldClassName ? ' ' : '') + classArr.join(' '));
        }
    };

    /**
    * 给 el 删除事件
    * @param {[type]} el [description]
    * @param {[type]} type [description]
    * @param {[type]} handler [description]
    * @return {[type]}       [description]
    */
    var addEventListener = util.addEventListener = function(el, type, handler) {
        if (el.addEventListener) {
            el.addEventListener(type, handler, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, handler);
        } else {
            el['on' + type] = handler;
        }
    };

    /**
     * 传入事件对象，组织该事件的默认事件
     * @param {[type]} event [description]
     * @param {[type]}       [description]
     */
    var preventDefault = util.preventDefault = function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };

    /**
     * 获取当前文档的 Cookies，返回 Cookie 对象
     * @return {[type]} [description]
     */
    var getCookies = util.getCookies = function() {
        var cookieObj = {};
        var all = d.cookie;

        if (!all) {
            return cookieObj;
        }

        var listCookie = all.split('; ');
        forEach(listCookie, function(item) {
            var p  = item.indexOf('=');
            var name = item.substring(0, p);
            name = decodeURIComponent(name);
            var value = item.substring(p + 1);
            value = decodeURIComponent(value);

            cookieObj[name] = value;
        });

        return cookieObj;
    };

    /**
     * 设置 cookie {name, value, path, domain, secure}
     * @param {[type]} opt [description]
     */
    var setCookie = util.setCookie = function(opt) {
        var cookie = encodeURIComponent(opt.name) + '=' + encodeURIComponent(opt.value);

        if (opt.expires) {
            cookie += '; expires=' + opt.expires.toGMTString();
        }
        if (opt.path) {
            cookie += '; path=' + opt.path;
        }
        if (opt.domain) {
            cookie += '; domain=' + opt.domain;
        }
        if (opt.secure) {
            cookie += '; secure=' + opt.secure;
        }

        document.cookie = cookie;
    };

    /*
    * domReady 实现 参考自 baidu + 自己理解
    * @author 3013366498@qq.com
    */
    var ready = util.ready = function() {
        var readyList = [];
        var readyBound = false;
        var domReadyFn;

        var readyCallBack = function() {
            if (!ready.isReady) {
                ready.isReady = true;
                forEach(readyList, function(item) {
                    item();
                });
            }
        };

        if (!ie678) {
            domReadyFn = function() {
                d.removeEventListener('DOMContentLoaded', domReadyFn, false);
                readyCallBack();
            };
        } else {
            domReadyFn = function() {
                if (d.readyState == 'complete') {
                    d.detachEvent('onreadystatechange', domReadyFn);
                    readyCallBack();
                }
            };
        }

        // 利用页面未加载完成时 调用 documentElement.doScroll 方法会爆出异常来实现 domReady
        var doScrollCheck = function() {
            try {
                d.documentElement.doScroll('left');
            } catch(e) {
                setTimeout(doScrollCheck, 1);
                return ;
            }
            readyCallBack();
        };

        var bingReady = function() {
            if (readyBound) {
                return ;
            }
            readyBound = true;

            if (ie678) {
                d.attachEvent('onreadystatechange', domReadyFn);
                try {
                    var isTopElement = window.frameElement == null || false;
                    (isTopElement && d.documentElement.doScroll) && doScrollCheck();
                } catch(e) {}
            } else {
                d.addEventListener('DOMContentLoaded', domReadyFn, false);
            }
            addEventListener(window, 'load', domReadyFn);
        };
        bingReady();

        return function(callback) {
            // 加载完成就直接执行，没有加载完成就加到队列里面去
            ready.isReady ? callback() : readyList.push(callback);
        };
    }();
})(this);
