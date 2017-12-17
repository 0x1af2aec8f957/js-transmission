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
    ]
;

const api = async option => {
    const {header = HEADER, type = 'GET', url = option, async = true/*, error = ERROR*/} = typeof option === 'string' ? {} : option;
    //sendURL = `${BASEURL/*可提前在原型或实例上设置一个项目前缀*/ || ''}${!!~type.indexOf('POST') ? url : !!~url.indexOf('?') ? url + '&timestamp=' + DATE : url + '?timestamp=' + DATE/*解决IE - GET请求缓存问题*/}`;
    const [
        Headers,
        Request
    ] = [
        new Headers(),
        new Request(url, {
            method: type,
            headers: Headers,
            mode: 'cors',
            cache: 'no-store', //完全绕开缓存[default=>下载资源时使用浏览器的默认行为,no-store=>完全绕过HTTP缓存,reload=>在通往网络的路上绕过HTTP缓存,no-cache,force-cache]
            credentials:'include', // 发送包含凭据的请求（即使是跨源调用）[include=>发送包含凭据的请求（即使是跨源调用）,same-origin=>在请求URL与调用脚本位于相同的源时发送凭据,omit=>确保浏览器不在请求中包含凭据]
            referrerPolicy:'no-referrer-when-downgrade',// 在从安全上下文导航到非安全上下文时，Referer头部被省略[no-referrer=>阻止发送任何Referer头,origin=>使浏览器只包含引用来源而不是Referer头中的完整URL,origin-when-cross-origin=>在导航原点时只会删除完整的网址,unsafe-url=>浏览器向用户导航到的所有页面发送完整的URL（不包括任何关联的用户名，密码或片段），而不管它们是否是跨越源和/或安全的]
        })
    ];
    const response = await fetch(Request)

);
export default 'transmission.fetch.js';