/*!
 * transmission.js v1.0.0
 * 2017 603803799@qq.com
 * Released under the MIT License.
 */

export default new function (option) {
    return new Promise((resolve, reject) => {
        const xmlHttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP'),
            state_Change = () => {//ajax 请求发生改变
                const {readyState, status, statusText, responseText, responseXML, getAllResponseHeaders/*获取所有的头信息*/, getResponseHeader/*获取特定的头信息*/} = xmlHttp,
                    {beforeSend, sending, sent, inProcess, success, error} = typeof option === 'string' ? {} : option;
                /*预留外部模拟document四个状态---document.readyState,xmlHttp.readyState...*/
                readyState === 0 ? //可改变待发送的数据
                    beforeSend ? option.data = beforeSend(option.data, readyState) || option.data : null :
                    readyState === 1 ? //不可改变待发送的数据
                        sending ? option.data = sending(option.data, readyState) || option.data : null :
                        readyState === 2 ?
                            sent ? sent(option.data, readyState) : null :
                            readyState === 3 ?
                                inProcess ? inProcess(option.data, readyState) : null :
                                readyState === 4 ? (() => {
                                    status === 200 ?
                                        /*！JSON格式的数据才能被解析*/
                                        success ? success(responseText ? JSON.parse(this.decode ? this.decode(responseText) : responseText) : this.decode ? this.decode(responseXML) : responseXML, getAllResponseHeaders()) : resolve(responseText ? JSON.parse(this.decode ? this.decode(responseText) : responseText) : this.decode ? this.decode(responseXML) : responseXML, getAllResponseHeaders()) :
                                        (status === 301 || status === 302) ?
                                            getResponseHeader('location') ? window.location.href = getResponseHeader('location') : null :
                                            error ? error(responseText || responseXML, {
                                                status,
                                                statusText
                                            }) : reject(responseText || responseXML, {
                                                status,
                                                statusText
                                            })
                                })() : eval(`throw new Error('XMLHttpRequest.readyState unknown')`);
            },
            {header, type = 'GET', url = option, async = true} = typeof option === 'string' ? {} : option,
            sendURL = `${this.baseURL/*可提前在原型或实例上设置一个项目前缀*/ || ''}${type === 'POST' ? url : url.indexOf('?') !== -1 ? url + '&timestamp=' + (new Date()).valueOf() : url + '?timestamp=' + (new Date()).valueOf()/*解决IE - GET请求缓存问题*/}`,
            sendData = JSON.stringify(typeof option.data === 'function' ? option.data.call(this) : option);
        this.cancel = xmlHttp.abort;//终止请求
        xmlHttp.onreadystatechange = state_Change;
        xmlHttp.open(type, sendURL, async);
        header ? (() => { // 设置请求头部
            for (let [k, v] of Object.entries(header))
                xmlHttp.setRequestHeader(k, v);
        })() : null;
        xmlHttp.send(type === 'POST' ? this.encode ? this.encode(sendData) : sendData : null)
    });
};

//github.com => https://github.com/noteScript/js-transmission.git
