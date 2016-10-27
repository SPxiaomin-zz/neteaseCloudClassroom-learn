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

    // 2. 关于网易产品、登录
    util.ready(function() {
        var attentionEl = document.getElementById('attention');
        var cookiesObj = util.getCookies();

        if (cookiesObj && cookiesObj.loginSuc) {
            util.removeClass(attentionEl, 'z-show');
            util.addClass(attentionEl, 'z-hide');
        } else {
            var guanzhudncEl = document.getElementById('guanzhudnc');
            var loginModal = document.getElementById('loginModal');
            var closeLoginModal = document.getElementById('closeLoginModal');
            var loginUserName = document.getElementById('loginUserName');
            var loginPassword = document.getElementById('loginPassword');
            var loginSubmit = document.getElementById('loginSubmit');
            var loginUrl = 'http://study.163.com/webDev/login.htm';
            var guanzhuUrl = 'http://study.163.com/webDev/attention.htm';

            /**
             * 检测登录的表单验证
             * @return {[type]} [description]
             */
            var validateLoginForm = function() {
                var _flag = true;

                if (loginUserName.value.length <= 0) {
                    _flag = false;
                    util.addClass(loginUserName, 'error');
                } else if (loginPassword.value.length <= 0) {
                    _flag = false;
                    util.addClass(loginPassword, 'error');
                }

                return _flag;
            };

            util.addEventListener(loginUserName, 'input', function() {
                util.removeClass(loginUserName, 'error');
            });

            util.addEventListener(loginPassword, 'input', function() {
                util.removeClass(loginPassword, 'error');
            });

            util.addEventListener(guanzhudncEl, 'click', function(event) {
                util.preventDefault(event);
                util.removeClass(loginModal, 'f-dn');
            });

            util.addEventListener(closeLoginModal, 'click', function() {
                util.addClass(loginModal, 'f-dn');
            });

            util.addEventListener(loginSubmit, 'click', function() {
                if (validateLoginForm()) {
                    util.ajax({
                        url: loginUrl,
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            'userName': util.md5(loginUserName.value),
                            'password': util.md5(loginPassword.value)
                        },
                        success: function(data) {
                            if (data == '1') {
                                // 设置 Cookie
                                var now = new Date();
                                now.setFullYear(now.getFullYear + 1);
                                util.setCookie({
                                    name: 'loginSuc',
                                    value: '1',
                                    expires: now
                                });

                                // 调用关注的 api
                                util.ajax({
                                    url: guanzhuUrl,
                                    header: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    success: function(data) {
                                        if (data == '1') {
                                            util.setCookie({
                                                name: 'followSuc',
                                                value: '1',
                                                expires: now
                                            });

                                            // 按钮变成已关注
                                            util.removeClass(attentionEl, 'z-show');
                                            util.addClass(attentionEl, 'z-hide');
                                            util.triggerEventListener(closeLoginModal, 'click');
                                        }
                                    }
                                });
                            } else if (data == '0') {
                                alert('账号或密码错误！');
                            }
                        }
                    });
                }
            });
        }
    });
})();

// ajax
// md5 文件载入
