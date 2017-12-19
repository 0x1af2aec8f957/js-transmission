/*!
 * transmission.fetch.js
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

export default async option => {
    const {header = HEADER, type = 'GET', url = option, /*error = ERROR*/} = typeof option === 'string' ? {} : option,
        //sendURL = `${BASEURL/*可提前在原型或实例上设置一个项目前缀*/ || ''}${!!~type.indexOf('POST') ? url : !!~url.indexOf('?') ? url + '&timestamp=' + DATE : url + '?timestamp=' + DATE/*解决IE - GET请求缓存问题*/}`;
        [
            Headers,
            sendData
        ] = [
            new Headers(header || {}),
            JSON.stringify(typeof option.data === 'function' ? option.data.call(CONFIG) : option.data)
        ],
        /*[newHeaders] = [(() => { // 预留header追加
            for (let [key, value] of Object.entries(HEADER)) Headers.has(key) ? Headers.set(key, value) : Headers.append(key, value)
        })()],*/
        Request = new Request(BASEURL + url, {
            method: type,
            headers: Headers,
            mode: 'cors', // 将允许请求在同一来源和其他来源返回相应CORs标题的资产[same-origin=>只有成功请求同一来源的资产，所有其他请求将被拒绝,cors=>将允许请求在同一来源和其他来源返回相应CORs标题的资产,cors-with-forced-preflight=>在进行实际的请求之前，将始终执行预检检查,no-cors=>旨在向其他没有CORS头部并产生opaque响应的源发出请求，但是如前所述，这在目前的窗口全局范围内是不可能的]
            cache: 'no-store', // 完全绕开缓存[default=>下载资源时使用浏览器的默认行为,no-store=>完全绕过HTTP缓存,reload=>在通往网络的路上绕过HTTP缓存,no-cache,force-cache]
            credentials: 'include', // 发送包含凭据的请求（即使是跨源调用）[include=>发送包含凭据的请求（即使是跨源调用）,same-origin=>在请求URL与调用脚本位于相同的源时发送凭据,omit=>确保浏览器不在请求中包含凭据]
            referrerPolicy: 'no-referrer-when-downgrade', // 在从安全上下文导航到非安全上下文时，Referer头部被省略[no-referrer=>阻止发送任何Referer头,origin=>使浏览器只包含引用来源而不是Referer头中的完整URL,origin-when-cross-origin=>在导航原点时只会删除完整的网址,unsafe-url=>浏览器向用户导航到的所有页面发送完整的URL（不包括任何关联的用户名，密码或片段），而不管它们是否是跨越源和/或安全的]
            body: ENCODE ? ENCODE(sendData) : sendData,

        }), response = await fetch(Request), {
            ok,
            status,
            headers,
            statusText
        } = response;
    if (ok && status === 200) switch (() => headers.has('location') ? window.location.href = headers.get('location') : headers.get("content-type")) {
        case 'text/plain':
            return response.text();
        case 'application/json':
            return DECODE ? DECODE(response.text()) : response.json();
        default:
            return ERROR ? ERROR(response.text(), {
                status,
                statusText
            }) : Promise.reject(response.text(), {
                status,
                statusText
            })
    }
    else return response.error ? response.error() : ERROR ? ERROR('Error is unknown') : Promise.reject('Error is unknown')
};