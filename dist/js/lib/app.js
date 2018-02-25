window.HGD = {};
HGD.userAgent = function() {
	// var baseURl = "http://123.57.12.28:8280"
	var ua = navigator.userAgent.toLowerCase(),
		checker = '';
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
		checker = 'weixin';
	} else if(ua.match(/(iphone|ipod|ipad)/)) {
		checker = 'ios';
	} else if(ua.match(/android/)) {
		checker = 'android';
	} else if(ua.match(/chrome\/([\d.]+)/)) {
		//谷歌浏览器
		checker = 'chrome';
	} else if(ua.match(/firefox\/([\d.]+)/)) {
		//火狐浏览器
		checker = 'firefox';
	} else if(ua.match(/opera.([\d.]+)/)) {
		//遨游浏览器
		checker = 'opera';
	} else if(ua.match(/safari\/([\d.]+)/)) {
		//safari
		checker = 'safari';
	} else if(ua.match(/msie ([\d.]+)/)) {
		checker = 'msie';
	} else {
		checker = 'Unknown';
	}
	return checker;
};
//地址
//var baseURl="http://101.200.203.56:8181";
HGD.setURL = function(expendURL) {
	var baseURl = "http://"+window.location.hostname;
	return(baseURl + expendURL);
};
HGD.ajax = function(url, data, opts) {
	var sessionId  = HGD.Obtain("HGDSessionId");
	if(sessionId == null){
		sessionId = ''
	}
	data.visit_style='new';
	$.ajax({
		url: url,
		data: data,
		type: data ? 'POST' : 'GET',
		// type of data we are expecting in return:
		dataType: opts.dataType || 'json',

        //dataType: 'JSONP',
		timeout: opts.timeout || 30000,
        contentType: opts.contentType,
		context: $('body'),
        beforeSend: function(request) {
            request.setRequestHeader("sessionId",sessionId);
            request.setRequestHeader("platform",'h5_unknown');
        },
        success: function(data) {
			if(data == null && !opts.noMsg) {
				alert('您的网络有些问题，请稍后再试');
				return false;
			} else {
				opts.success(data);
			}
		},
		error: function(XHR, info, errorThrown) {
			if(XHR.readyState == 0 || XHR.status == 0) {
				return false;
			} else if(info != 'abort' && !opts.noMsg) {
				if(!opts.noMsg) {
					var msg = '';
					switch(info) {
						case 'timeout':
							msg = '对不起，请求服务器网络超时';
							break;
						case 'error':
							msg = '网络出现异常，请求服务器错误';
							break;
						case 'parsererror':
							msg = '网络出现异常，服务器返回错误';
							break;
						case 'notmodified':
						default:
							msg = '您的网络有些问题，请稍后再试[code:3]';
					}
					alert(msg);
				}
			}
			if(typeof opts.error == 'function') {
				opts.error();
			}
		}
	})
};
HGD.getCookie = function(name) {
	if(window.localStorage) {
		return localStorage.getItem(name);
	} else {
		var val = null,
			r = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
		if(document.cookie && document.cookie != '') {
			var h = document.cookie.split(';');
			for(var g = 0; g < h.length; g++) {
				var f = (h[g] || '').replace(r, '');
				if(f.substring(0, name.length + 1) === (name + '=')) {
					val = decodeURIComponent(f.substring(name.length + 1));
					break;
				}
			}
		}
		return val;
	}
};
HGD.setCookie = function(name, val, sec, path) {
	if(window.localStorage) {
		localStorage.setItem(name, val);
	} else {
		var exp = new Date();
		exp.setTime(exp.getTime() + sec * 1000);
		document.cookie = name + '=' + val + ';expires=' + exp.toGMTString() + ';path=' + path || '/';
	}
};
HGD.clearCookie = function(name) {
	if(window.localStorage) {
		localStorage.removeItem(name);
		return;
	} else {
		this.set(name, '', -1);
	}
};
HGD.GetQueryString = function(name) {
	if(window.location.href.indexOf('?') > -1) {
		console.log(window.location.href.substr(1));
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = decodeURIComponent(window.location.href.substr(1).split('?')[1]).match(reg);
		if(r != null) return unescape(r[2]);
	}
	return ''; //便于容错处理
};
HGD.Obtain = function(name) {
	var newname;
	if(window.localStorage.getItem(name) != -1) {
		var nametwo = window.localStorage.getItem(name);
		if(nametwo != null) {
			newname = window.localStorage.getItem(name);
		} else {
			newname = window.localStorage.getItem(name);
		}
	} else {
		newname = window.localStorage.getItem(name);
	}
	return newname;
}
//app交互
HGD.isApp = function(sessionId) {
    try{
        if(HGD.userAgent() == 'ios'){
            if(getOsType && typeof(getOsType) == "function") {
                if (getOsType() == 1) {
                    sessionId = getSessionId();
                    if(sessionId == null||sessionId == ''||sessionId == undefined){
                        sessionId = HGD.Obtain("HGDSessionId");
                    }else {
                        localStorage.setItem('HGDSessionId',sessionId)
                    }
                }
            }
        }else if(HGD.userAgent() == 'android'){
            if(hgd.getOsType && typeof(hgd.getOsType) == "function") {
                if (hgd.getOsType() == 0) {
                    sessionId = hgd.getSessionId();
                    if(sessionId == null||sessionId == ''||sessionId == undefined){
                        sessionId = HGD.Obtain("HGDSessionId");
                    }else{
                        localStorage.setItem('HGDSessionId',sessionId)
                    }
                }
            }
        }
        else if(HGD.userAgent() == 'weixin'){
            sessionId= HGD.Obtain("HGDSessionId");
        }
    }catch (e){
        sessionId= HGD.Obtain("HGDSessionId");
        if(sessionId == null||sessionId == ''||sessionId == undefined){
            window.location.href = "http://"+window.location.hostname+"/Land/ashore.html";
        }
    }
    return sessionId
}