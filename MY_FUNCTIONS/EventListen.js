//一些工具函数

//添加事件
//handleEvent.addListen(elem,type,handle,capture)
//handleEvent.removeListen(elem,type,handle,capture)
var handleEvent; 
var removeNode;//删除节点
var _isIE = {
    navigator.userAgent == "Microsoft Internet Explorer";
}
function isArray(a) {
    return Object.prototype.toString.call(a) === "[object Array]";
}
//获取iframe
function getIFrameDocument(aID){
  // if contentDocument exists, W3C compliant (Mozilla)
  if (document.getElementById(aID).contentDocument){
    return document.getElementById(aID).contentDocument;
  } else {
    // IE
    return document.frames[aID].document;
  }
}

//获取页面滚动条高度
function getScroll(elem){
    var x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
}



//创建节点
//makeNode(["p", "Here is a ", ["a", { href:"http://www.google.com/" }, "link"], "."]);
//<p>Here is a <a href="http://www.google.com/">link</a>.</p>
function makeNode(desc) {
    if (!isArray(desc)) {
        return makeNode.call(this, Array.prototype.slice.call(arguments));
    }

    var name = desc[0];
    var attributes = desc[1];

    var el = document.createElement(name);

    var start = 1;
    if (typeof attributes === "object" && attributes !== null && !isArray(attributes)) {
        for (var attr in attributes) {
            el[attr] = attributes[attr];
        }
        start = 2;
    }

    for (var i = start; i < desc.length; i++) {
        if (isArray(desc[i])) {
            el.appendChild(makeNode(desc[i]));
        }
        else {
            el.appendChild(document.createTextNode(desc[i]));
        }
    }

    return el;
}

    handleEvent = (function() {
        return {
            "addListen": function (elem, type, handle, capture) {
                handle['callback'] = handle;
                if(window.addEventListener){
                    elem.addEventListener(type,handle['callback'],capture);
                }
                else if(window.attachEvent){
                    elem.attachEvent('on' + type,handle['callback']);
                }
                else{
                    elem['on' + type] = handle['callback'];
                }
            },
            "removeListen" : function(elem,type,handle,capture){
                if(window.removeEventListener){
                   elem.removeEventListener(type,handle['callback'],capture);
                }
                else if(window.detachEvent){
                   elem.detachEvent('on' + type,handle['callback']);
                }
                else{
                   elem['on' + type] = null;
                }
            }
        }
    })();

    removeNode = _isIE ? function(){
        var d;
        return function(n){
            if(n && n.tagName != 'BODY'){
                 d = d || document.createElement('div');
                 d.appendChild(n);
                 d.innerHTML = "";
            }
        }
    } : function(n){
        if(n && n.parentNode && n.tagName != "BODY"){
            n.parentNode.removeChild(n);
        }
    }