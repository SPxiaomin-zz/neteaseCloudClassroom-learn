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

    /*
    * domReady 实现 参考自 baidu + 自己理解
    * @author 3013366498@qq.com
    */
    var ready = util.ready = function() {

    }();
})(this);
