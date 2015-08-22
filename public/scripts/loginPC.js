//登陆
document.onkeydown=function(){keyEnter()}
function keyEnter() {
   var loginDom = document.getElementById('loginPage');
	if(loginDom.style.display=='block'){
		if(event.keyCode==13)
		 {
		  $('#login').trigger('click');
		 }
	}
}



var baseUrl = location.protocol + "//" + location.host;
var proxyConfig = {
    "login": { url: baseUrl + "/userdelete", method: "POST" },
    "logout": { url: baseUrl + "/upservices/com.yonyou.u8.framework.server.core.U8UAPServiceFacade/UAP/logout", method: "GET" },
    "serverPubKey": { url: baseUrl + "/upservices/com.yonyou.u8.framework.server.core.U8UAPServiceFacade/UAP/getRsaPublicKey", method: "GET" }
};
var cb= {};
function loginButton(){
    var params = {id:1,username:document.getElementById('userName').value,password:document.getElementById('password').value};
    if(document.getElementById('email')){
        params.email=document.getElementById('email').value;
    }
	cb.loadXMLDoc(proxyConfig.login.url, proxyConfig.login.method, { data: params,callback: callback });
	function callback (data){
        debugger;
        location.href=baseUrl+"/admin/index";

		/*if(data.code == "200"){
			var userData = data.data.userdata;
			userData.token = data.data.usertoken;
            window.localStorage.setItem("userData",JSON.stringify(userData));
            location.href=baseUrl+"/public/index.html?token="+userData.token;
		}else{
			alert(data.message);	
		}*/
	}
}

//异步请求数据  url链接，type:"POST" || "GET" params:{callback:callback,data:data}
//loadXMLDoc("/classes/Login/UAP/GetAccount", "GET", {callback:callback});

cb.loadXMLDoc = function (url, type, params) {
    var myUrl = url ? url : "";
    var myType = type ? type : "GET";
    var myParams = params.data ? params.data : "";
    var myData = '';
    if (myType == "GET") {
        myData = '?';
        for (var item in myParams) {
            if (myData.length > 1) {
                myData += "&"
            }
            myData += item + "=" + myParams[item];
        }
        //myParams = myParams
        myUrl += myData;
    } else {
        if (typeof myParams == "object" && window.JSON && window.JSON.stringify)
            myData = window.JSON.stringify(myParams);
        else
            myData = myParams;
    }
    var xmlhttp;
    if (window.XMLHttpRequest) {        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //alert(xmlhttp.responseText);
            var result = xmlhttp.responseText;
            var data = JSON.parse(result);
            if (params && params.callback) params.callback.call(this, data);
        }
    }
    xmlhttp.open(myType, myUrl, true);
    xmlhttp.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
    xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    //xmlhttp.setRequestHeader("dataType", "json");
    //xmlhttp.setRequestHeader("data", myParams);
    //xmlhttp.send(myData);
    xmlhttp.send(myData);
}
cb.image = {};
cb.image.imgLoader = function (id, images) {
    this._el = id;
    this._images = images;
    this._currentIndex = -1;
    this.init = function (id, images) {
        this._el = this._el || id;
        this._images = this._images || images || [];
        if (!this._el || this._images.length <= 0)
            return;
        this.changeImage(); //先加载第一张
        var self = this;
        setInterval(function () { self.changeImage(); }, 3000);
    };
    //预加载图片
    this.preLoad = function (image) {
        if (!image || !image.src || image.isLoaded)
            return;
        var img = new Image();
        img.src = image.src;
        image.isLoaded = true;
    };
    this.changeImage = function () {
        var el = document.getElementById('content');
        if (!el || this._images.length <= 0)
            return;
        this._currentIndex = (this._currentIndex < this._images.length - 1) ? (this._currentIndex + 1) : 0;
        el.style.backgroundImage = "url(" + this._images[this._currentIndex].src + ")";

        if (this._currentIndex + 1 < this._images.length)
            this.preLoad(this._images[this._currentIndex + 1]);
    };
}