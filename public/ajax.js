/*!
 * transmission.ajax.js
 * 2017 603803799@qq.com
 * Released under the MIT License.
 */

import {CONFIG} from './config';

const [
    DECODE,
    ENCODE,
    HEADER,
    ERROR,
    BASEURL
] = [
    CONFIG.get('decode'),
    CONFIG.get('encode'),
    CONFIG.get('header'),
    CONFIG.get('error'),
    CONFIG.get('baseURL')
];

const Asynchronous_Javascript_And_XML = option => {
    // option @String [!!option.length && (!!~option.indexOf("http://") || !!~option.indexOf("https://"))] --url
    // option @Object [{url, data, header, async, beforeSend, sending, sent, inProcess, success, error}] --option
    return option.header && Object.assign(option.header, HEADER), new Promise((resolve, reject) => {
        const xmlHttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP'),
            DATE = (new Date()).valueOf(), // 获取当前时间戳
            state_Change = () => { // ajax 状态码发生改变
                const {readyState, status, statusText, responseText, responseXML} = xmlHttp,
                    {beforeSend, sending, sent, inProcess/*, success, error = ERROR*/} = typeof option === 'string' ? {} : option;
                /* 预留外部模拟document四个状态---document.readyState,xmlHttp.readyState... */
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
                        const LOCATION = xmlHttp.getResponseHeader('location'),
                            ALLRESPONSEHEADERS = xmlHttp.getAllResponseHeaders();
                        return LOCATION /* 支持重定向到另一个页面地址 */ ? window.location.href = LOCATION :
                            status === 200 ?
                                /*! JSON/XML格式的数据才能被解析 */
                                resolve(responseText ?
                                    JSON.parse(DECODE ? DECODE(responseText) : responseText) :
                                    DECODE ? DECODE(responseXML) : responseXML, ALLRESPONSEHEADERS) :
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
            {header = HEADER, type = 'GET', url = option, async = true/*, error = ERROR*/} = typeof option === 'string' ? {} : option,
            sendURL = `${BASEURL/*可提前在原型或实例上设置一个项目前缀*/ || ''}${!!~type.indexOf('POST') ? url : !!~url.indexOf('?') ? url + '&timestamp=' + DATE : url + '?timestamp=' + DATE/*解决IE - GET请求缓存问题*/}`,
            sendData = JSON.stringify(typeof option.data === 'function' ? option.data.call(CONFIG) : option.data);
        //CONFIG.set('cancel',xmlHttp.abort);//预留终止请求
        xmlHttp.onerror = ERROR; //捕获异常、错误
        [xmlHttp.onreadystatechange] = [
            state_Change,
            xmlHttp.open(type, sendURL, async),
            header && (() => { // 设置请求头部，默认取原型或实例上的header
                for (let [k, v] of Object.entries(header)) xmlHttp.setRequestHeader(k, v);
            })(),
            xmlHttp.send(!!~type.indexOf('POST') ? ENCODE ? ENCODE(sendData) : sendData : null)
        ];
    });
}, GET_POST = {
    get(option) { // 简化GET
        return typeof option.type === 'object' && delete option.type,
            Asynchronous_Javascript_And_XML(option)
    },
    post(option, data = {}) { // 简化POST
        return option.type = 'POST',
        option.data || (option.data = data),
            Asynchronous_Javascript_And_XML(option)
    }
};
export const {get, post} = GET_POST;
export {CONFIG as config};