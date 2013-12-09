var handle;
    handle = (function () {
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