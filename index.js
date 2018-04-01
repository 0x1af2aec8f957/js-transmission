/*!
 * transmission.js v1.1.3
 * 2017 603803799@qq.com
 * Released under the MIT License.
 */

export default function(option) {
  // option @String [!!option.length && (!!~option.indexOf("http://") || !!~option.indexOf("https://"))] --url
  // option @Object [{url, data, header, async, beforeSend, sending, sent, inProcess, success, error}] --option
  const xmlHttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP') // 初始化xmlHttp对象
  return option.header && Object.assign(option.header, this.header),
    option.data = typeof option.data === 'function' ? option.data.call(this) : option.data,
    new Promise((resolve, reject) => {
      const { // option.data不可分解，依赖每个阶段最终返回的数据[可变化]
          header = this.header,
          encode = this.encode, // 支持独立编码
          decode = this.decode, // 支持独立解码
          type = 'GET',
          url = option,
          async = true, /* error = this.error */
          beforeSend = this.beforeSend,
          sending = this.sending,
          sent = this.sent,
          inProcess = this.inProcess,
          location = this.location,
          beforeSuccess = this.beforeSuccess,
          success,
          error = this.error
      } = typeof option === 'string' ? {} : option,
        sendURL = `${this.baseURL/*可提前在原型或实例上设置一个项目前缀*/ || ''}${!!~type.indexOf('POST') ? url : !!~url.indexOf('?') ? url + '&timestamp=' + (new Date()).valueOf() : url + '?timestamp=' + (new Date()).valueOf()/*解决IE - GET请求缓存问题*/}`,
        sendData = !!~type.indexOf('POST') ? JSON.stringify(option.data) : option.data,
        state_Change = () => { // ajax 状态码发生改变
          const {
            readyState,
            status,
            statusText,
            responseText,
            responseXML,
            UNSENT = 0,
            OPENED = 1,
            HEADERS_RECEIVED = 2,
            LOADING = 3,
            DONE = 4
          } = xmlHttp
          /*预留外部模拟document四个状态---document.readyState,xmlHttp.readyState...*/
          switch (readyState) {
            case UNSENT:
              beforeSend && (option.data = beforeSend.call(this, option.data, {
                sendURL,
                readyState
              }) || option.data)
              break
            case OPENED:
              sending && (option.data = sending.call(this, option.data, {
                sendURL,
                readyState
              }) || option.data)
              break
            case HEADERS_RECEIVED:
              sent && sent.call(this, option.data, readyState)
              break
            case LOADING:
              inProcess && inProcess.call(this, option.data, readyState)
              break
            case DONE:
              const [response, ResponseHeaders, locationHeader, sendObject, statusObject] = [responseText || responseXML, xmlHttp.getAllResponseHeaders(), xmlHttp.getResponseHeader('location'), {
                sendURL,
                sendData
              }, {
                status,
                statusText
              }]
              if (status >= 200 && status < 400) { // 请求状态成功
                if (locationHeader) return location ? location.call(this, locationHeader) : window.location.href = locationHeader // 应用内重定向
                let data = response ? eval(`(${decode ? decode.call(this, response) : response})`) : null
                data = data && beforeSuccess ? beforeSuccess.call(this, data, sendObject, ResponseHeaders) || data : data
                return data ? /*! JSON/XML格式的数据才能被解析 */
                  success ? success.call(this, data, ResponseHeaders) : // .成功[需要解码]
                  resolve(data, ResponseHeaders) : // ..成功[需要解码]
                  error ? error.call(this, response, sendObject, statusObject) : // .失败[不需要解码]
                  reject(response, sendObject, statusObject) // ..失败[不需要解码]
              } else return error ? error.call(this, response, sendObject, statusObject) : reject(response, sendObject, statusObject) // 请求状态失败
              break
            default:
              throw new Error('XMLHttpRequest.readyState unknown')
              break
          }
        };
      //this.cancel = xmlHttp.abort;//预留终止请求
      //xmlHttp.onerror = e => console.error(e);//预留捕获异常、错误
      [xmlHttp.onreadystatechange] = [state_Change,
        xmlHttp.open(type, !!~type.indexOf('POST') ? sendURL : function() { // 拼接GET的data数据
          const send_url = Array() // 处理待发送的URL
          if (sendData)
            for (let [k, v] of Object.entries(sendData)) send_url.push(`&${k}=${v}`)
          return sendURL + send_url.join(String())
        }.call(this), async),
        header && (() => { // 设置请求头部，默认取原型或实例上的header
          for (let [k, v] of Object.entries(header)) xmlHttp.setRequestHeader(k, v)
        })(),
        xmlHttp.send(!!~type.indexOf('POST') ? encode ? encode(sendData) : sendData : null)
      ]
    })
};
//github.com => https://github.com/noteScript/js-transmission.git
