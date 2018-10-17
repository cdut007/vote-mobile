var isDebug = false;
var isHttpDebug = false;
var isFirstLogin = true;
var testHttpRootDomain = localStorage.getItem('httpRootDomain');
var domain = "http://"+window.location.hostname+":9900"
if(testHttpRootDomain){

}else{
 testHttpRootDomain = domain;
}
 var httpRootDomain = isHttpDebug? testHttpRootDomain:domain;


var httpDomain = httpRootDomain;
var mockData = false;

var clorArray = ['#00a4eb', '#6d9ee1', '#19cba3', '#948763', '#fbac2a'];


String.prototype.trim = function() {
	return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

function getCharColorByNickName(name) {
	var displayInfo = {
		color: clorArray[0],
		label: 'X'
	}

	if(name) {
		var label = name.substring(0, 1)
		var code = label.charCodeAt();
		displayInfo = {
			color: clorArray[code % 5],
			label: label
		}
	}

	return displayInfo
}


function  getFullPathUrl(path) {
	console.log("getFullPathUrl " + httpRootDomain + path);
	return httpRootDomain + path;
}

/*清除页面缓存*/
function clear() {
	if(mui.os.plus) {
		var views = plus.webview.all();
		for(var i = 0; i < views.length - 1; i++) {
			plus.webview.close(views[i].id);
		}
	}
}
function logAlert(logStr,alertStr){
	if(isDebug){
		mui.alert(logStr+":"+alertStr);
	}else{
		console.log(logStr+":"+alertStr);
	}
	
}

function uploadFile(apiName, body, sucs, fail) {
	mui.showLoading("正在加载..", "div");

	var user = getCurrentUser();
	if(!user) {
		authUser(function() {
			get(apiName, body, sucs, fail);
		}, function() {
			fail('认证失败');
		});
		return;
	}
	
	

	mui.ajax(httpDomain + apiName+"?loginId="+user.id, {
		crossDomain: true,
		data: body,
		processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头

		dataType: 'json', //服务器返回json格式数据
		type: 'POST', //HTTP请求类型
		timeout: 20000, //超时时间设置为20秒；
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			mui.hideLoading();
			var info = JSON.stringify(data);
			console.log("返回请求地址->：" + apiName + "服务器内容-->" + info);
			if(data.code == 0) {
				sucs(data, body, info);
			} else if(data.code == -1002) { //没有认证
				//
			} else {
				if(data.msg) {
					fail(data.msg);
					console.log('Upload request error:' + apiName + ":response Message=" + data.msg);
				} else {
					fail(info);
				}
			}

		},
		error: function(xhr, type, errorThrown) {
			mui.hideLoading();

			//异常处理；
			fail("code=" + xhr.status + " error:" + type); //type错误描述，可取值："timeout", "error", "abort", "parsererror"、"null"
//			mui.alert("code=" + xhr.status + " apiName=" + apiName + " HttpRequestUploadReusltErr:" + type);

			if(xhr.status == 0) {
				networkWarning();
				return
			}
		}
	});
}

function mock(type, apiName, body, succ) {

	setTimeout(function() {
		callMock(type, apiName, body, succ);
		mui.hideLoading();
	}, 1000);

}

function post(apiName, body, sucs, fail) {
	if(!body.disableLoading) {
		mui.showLoading("正在加载..", "div");
	}

	var user = getCurrentUser();
	
	if(!user) {
		authUser(function() {
			post(apiName, body, sucs, fail);
		}, function() {
			fail('认证失败');
		});
		return;
	}

	body.loginId = user.id;
//body.loginId = '514';
	
	if(mockData) {
		mock('post', apiName, body, sucs);
		return;
	}

	mui.ajax(httpDomain + apiName, {
		crossDomain: true,
		data: body,
		dataType: 'json', //服务器返回json格式数据
		type: 'POST', //HTTP请求类型
		timeout: 20000, //超时时间设置为20秒；
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			mui.hideLoading();
			var info = JSON.stringify(data);
//			logAlert("请求地址和参数" + apiName + "参数" + JSON.stringify(data));
			console.log("返回请求地址->：" + apiName + "服务器内容-->" + info);
			if(data.code == 0) {
				sucs(data, body, info);
			} else if(data.code == -1002) { //没有认证
				//
			} else {
				if(data.msg) {
					fail(data.msg);
					console.log('Post request error:' + apiName + ":response Message=" + data.msg);
				} else {
					fail(info);
				}
			}

		},
		error: function(xhr, type, errorThrown) {
			mui.hideLoading();

			//异常处理；
			fail("code=" + xhr.status + " error:" + type); //type错误描述，可取值："timeout", "error", "abort", "parsererror"、"null"
			logAlert("code=" + xhr.status + " apiName=" + apiName + " HttpRequestPostReusltErr:" + type);

			if(xhr.status == 0 && !body.disableLoading) {
				networkWarning();
				return
			}
		}
	});
}

function authUser(authSucc, authFailed) {
	//from login get userId,
	if(true){
		var user = {id:111};
		localStorage.UserInfo = JSON.stringify(user);
		authSucc();
		return;
	}
	var cid = localStorage.getItem("cid");
//	var pushtoken = localStorage.getItem("pushtoken");
var name = getLoginUserId();
	var body = {
		username: name,
		uuid:cid
	}
	if (mui.os.ios) {
//		logAlert('ios');
		body.androidOrIOS = "IOS";
	} else{
//		logAlert('android');
		body.androidOrIOS = "android";
	}
//	uuid
//	var body = {
//		username: name
//	}
//logAlert("authUser:"+JSON.stringify(body));
	mui.ajax(httpDomain + '/getUserId', {
		crossDomain: true,
		data: body,
		dataType: 'json', //服务器返回json格式数据
		type: 'POST', //HTTP请求类型
		timeout: 20000, //超时时间设置为20秒；
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			var info = JSON.stringify(data);
			console.log("返回请求地址->：" + " auth " + "服务器内容-->" + info);
			if(data.code == 0) {

				storeUserInfo(data.responseResult);
				authSucc();
			} else if(data.code == -1002) {
				//user not exsit 
//				mui.toast('无法使用该模块，请联系管理员添加该账户');
				//				if(mui.os.plus) {
				//					plus.webview.currentWebview().close();
				//				}
				authFailed();
			} else {
				authFailed();
			}

		},
		error: function(xhr, type, errorThrown) {

			mui.toast("code=" + xhr.status + " " + " 请求错误:" + type);
			console.log("code=" + xhr.status + " " + " HttpRequestAuthReusltErr:" + type);
			authFailed();
			if(xhr.status == 0) {
				networkWarning();
				return
			}
		}
	});
}

function networkWarning() {
	mui.toast('请检查网络');
}

function getLoginUserId() {
	var myId = localStorage.getItem("usersname");
	return myId;
}

function storeUserInfo(userInfo) {
	localStorage.UserInfo = JSON.stringify(userInfo);
}

function getUserInfo() {
	var userStr = localStorage.UserInfo;

	if(!userStr) {
		return null;
	}
	var user = JSON.parse(userStr);

	return user;
}

function deleteCurrentUserInfo() {
	localStorage.removeItem('UserInfo');
}

function getCurrentUser() {
 //
	var user = getUserInfo();
	if(!user) {
		return null;
	}
	if(user.username != getLoginUserId()) {
		deleteCurrentUserInfo();
		return null;
	}
	return user;
}



function get(apiName, body, sucs, fail) {

	var user = getCurrentUser();

	if(!user) {
		authUser(function() {
			get(apiName, body, sucs, fail);
		}, function() {
			fail('认证失败');
		});
		return;
	}

	body.loginId = user.id;
//body.loginId = '514';
	var url = httpDomain + apiName;
	var param = "";
	for(var element in body) {
		param += element + "=" + body[element] + "&";
	}

	url = url + "?" + param;

	console.log("请求地址和参数" + url);
//	mui.alert('请求地址和参数:'+url);
	if(mockData) {
		mock('get', apiName, body, sucs);
		return;
	}

	mui.ajax(url, {
		crossDomain: true,
		dataType: 'json', //服务器返回json格式数据
		type: 'GET', //HTTP请求类型
		timeout: 20000, //超时时间设置为20秒；
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			var info = JSON.stringify(data);
			console.log("返回请求地址->：" + apiName + "服务器内容-->" + info);
			if(data.code == 0) {
				sucs(data, body, info);
			} else {
				if(data.msg) {
					fail(data.msg);
					console.log('Get request error:' + apiName + ":response Message=" + data.msg);
				} else {
					fail(info);
				}
			}

		},
		error: function(xhr, type, errorThrown) {
			//异常处理；

			fail("code=" + xhr.status + " error:" + type); //type错误描述，可取值："timeout", "error", "abort", "parsererror"、"null"
			console.log("code=" + xhr.status + " apiName=" + apiName + " HttpRequestGetReusltErr:" + type);

			if(xhr.status == 0) {
				networkWarning();
				return
			}
		}
	});
}

//扩展mui.showLoading
(function($, window) {
	//显示加载框
	$.showLoading = function(message, type) {
		if($.os.plus && type !== 'div') {
			$.plusReady(function() {
				plus.nativeUI.showWaiting(message);
			});
		} else {
			var html = '';
			html += '<i class="mui-spinner mui-spinner-white"></i>';
			html += '<p class="text">' + (message || "数据加载中") + '</p>';

			//遮罩层
			var mask = document.getElementsByClassName("mui-show-loading-mask");
			if(mask.length == 0) {
				mask = document.createElement('div');
				mask.classList.add("mui-show-loading-mask");
				document.body.appendChild(mask);
				mask.addEventListener("touchmove", function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			} else {
				mask[0].classList.remove("mui-show-loading-mask-hidden");
			}
			//加载框
			var toast = document.getElementsByClassName("mui-show-loading");
			if(toast.length == 0) {
				toast = document.createElement('div');
				toast.classList.add("mui-show-loading");
				toast.classList.add('loading-visible');
				document.body.appendChild(toast);
				toast.innerHTML = html;
				toast.addEventListener("touchmove", function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			} else {
				toast[0].innerHTML = html;
				toast[0].classList.add("loading-visible");
			}
		}
	};

	//隐藏加载框
	$.hideLoading = function(callback) {
		console.log("hideLoading");
		if($.os.plus) {
			$.plusReady(function() {
				plus.nativeUI.closeWaiting();
			});
		}
		var mask = document.getElementsByClassName("mui-show-loading-mask");
		var toast = document.getElementsByClassName("mui-show-loading");
		if(mask.length > 0 && mask[0].classList) {
			mask[0].classList.add("mui-show-loading-mask-hidden");
		}
		if(toast.length > 0 && toast[0].classList) {
			toast[0].classList.remove("loading-visible");
			callback && callback();
		}
	}
})(mui, window);

// 获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	} else {
		return null;
	}
}

Date.prototype.format = function(fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

function formatDate(time) {
	if(!time) {
		return ''
	}
	var curTime = new Date(time).format("yyyy/MM/dd");
	return curTime
}

function formatFullDateTime(time) {
	if(!time) {
		return ''
	}
	var curTime = new Date(time).format("yyyy-MM-dd hh:mm:ss");
	return curTime
}


function formatFullDate(time) {
	if(!time) {
		return ''
	}
	var curTime = new Date(time).format("yyyy/MM/dd hh:mm");
	return curTime
}



function formatChatDate(time,hasfulldate) {
	if(!time) {
		return ''
	}
	var isToday = new Date(time).toDateString() === new Date().toDateString() ? true : false;
	if(isToday) {

		var curTime = new Date(time).format("hh:mm");
		return curTime;
	} else {
		var curTime = null;
		if(hasfulldate){
			curTime = new Date(time).format("yyyy年MM月dd日 hh:mm");
		}else{
			curTime = new Date(time).format("yyyy/MM/dd hh:mm");
		}
		return curTime;
	}
}

