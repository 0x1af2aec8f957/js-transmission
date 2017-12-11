/*!
 * transmission.js v1.0.4
 * 2017 603803799@qq.com
 * Released under the MIT License.
 */

export default function (option) {
  // option @String [!!option.length && (!!~option.indexOf("http://") || !!~option.indexOf("https://"))] --url
  // option @Object [{url, data, header, async, beforeSend, sending, sent, inProcess, success, error}] --option
  option.header && Object.assign(option.header, this.header);
  return new Promise((resolve, reject) => {
    const xmlHttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP'),
      state_Change = () => {//ajax 状态码发生改变
        const {readyState, status, statusText, responseText, responseXML} = xmlHttp,
          {beforeSend, sending, sent, inProcess, success, error = this.error} = typeof option === 'string' ? {} : option;
        /*预留外部模拟document四个状态---document.readyState,xmlHttp.readyState...*/
        switch (readyState) {
          case 0:
            beforeSend && (option.data = beforeSend(option.data, readyState) || option.data);
            break;
          case 1:
            sending && (option.data = sending(option.data, readyState) || option.data);
            break;
          case 2:
            sent && sent(option.data, readyState);
            break;
          case 3:
            inProcess && inProcess(option.data, readyState);
            break;
          case 4:
            return xmlHttp.getResponseHeader('location') /* 支持重定向到另一个页面地址 */ ? window.location.href = xmlHttp.getResponseHeader('location') :
              status === 200 ?
                /*! JSON/XML格式的数据才能被解析 */
                success ?
                  success(responseText ?
                    JSON.parse(this.decode ? this.decode(responseText) : responseText) :
                    this.decode ? this.decode(responseXML) : responseXML, xmlHttp.getAllResponseHeaders()) :
                  resolve(responseText ?
                    JSON.parse(this.decode ? this.decode(responseText) : responseText) :
                    this.decode ? this.decode(responseXML) : responseXML, xmlHttp.getAllResponseHeaders()) :
                error ?
                  error(responseText || responseXML, {
                    status,
                    statusText
                  }) :
                  reject(responseText || responseXML, {
                    status,
                    statusText
                  });
            break;
          default:
            throw new Error('XMLHttpRequest.readyState unknown');
            break;
        }
      },
      {header = this.header, type = 'GET', url = option, async = true/*, error = this.error*/} = typeof option === 'string' ? {} : option,
      sendURL = `${this.baseURL/*可提前在原型或实例上设置一个项目前缀*/ || ''}${!!~type.indexOf('POST') ? url : !!~url.indexOf('?') ? url + '&timestamp=' + (new Date()).valueOf() : url + '?timestamp=' + (new Date()).valueOf()/*解决IE - GET请求缓存问题*/}`,
      sendData = JSON.stringify(typeof option.data === 'function' ? option.data.call(this) : option.data);
    //this.cancel = xmlHttp.abort;//预留终止请求
    //xmlHttp.onerror = e => console.error(e);//预留捕获异常、错误
    [xmlHttp.onreadystatechange] = [state_Change,
      xmlHttp.open(type, sendURL, async),
      header && (() => { // 设置请求头部，默认取原型或实例上的header
        for (let [k, v] of Object.entries(header)) xmlHttp.setRequestHeader(k, v);
      })(),
      xmlHttp.send(!!~type.indexOf('POST') ? this.encode ? this.encode(sendData) : sendData : null)];
  });
};

//github.com => https://github.com/noteScript/js-transmission.git
