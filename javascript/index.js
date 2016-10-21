/* global util */

(function() {
    // 1. 检测顶部通知条，实现点击 X 后关闭
    util.ready(function() {
        var cookiesObj = util.getCookies();
        var tipsElement = document.getElementById('tips');

        if (cookiesObj && cookiesObj.topclose) {
            util.addClass(tipsElement, 'f-dn');
        } else {
            var closeTips = document.getElementById('closeTips');

            util.addEventListener(closeTips, 'click', function(event) {
                util.preventDefault(event);
                var now = new Date();
                now.setFullYear(now.getFullYear() + 1);
                util.setCookie({
                    name: 'topclose',
                    value: '1',
                    expires: now
                });
                util.addClass(tipsElement, 'f-dn');
            });
        }
    });
})();

// util.ready
// util.getCookies
// util.setCookie
// util.addClass
// util.addEventListener
// util.preventDefault
