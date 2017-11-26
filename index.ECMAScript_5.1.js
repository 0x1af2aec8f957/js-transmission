'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports = module.exports = function (option) {
    var _this = this;

    return new Promise(function (resolve, reject) {
        var xmlHttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP'),
            state_Change = function state_Change() {
            //ajax ״̬�뷢���ı�
            var readyState = xmlHttp.readyState,
                status = xmlHttp.status,
                statusText = xmlHttp.statusText,
                responseText = xmlHttp.responseText,
                responseXML = xmlHttp.responseXML,
                _ref2 = typeof option === 'string' ? {} : option,
                beforeSend = _ref2.beforeSend,
                sending = _ref2.sending,
                sent = _ref2.sent,
                inProcess = _ref2.inProcess,
                success = _ref2.success,
                _ref2$error = _ref2.error,
                error = _ref2$error === undefined ? _this.error : _ref2$error;
            /*Ԥ���ⲿģ��document�ĸ�״̬---document.readyState,xmlHttp.readyState...*/


            readyState === 0 ? // �ɸı�����͵�����
            beforeSend ? option.data = beforeSend(option.data, readyState) || option.data : null : readyState === 1 ? // ���ɸı�����͵�����
            sending ? option.data = sending(option.data, readyState) || option.data : null : readyState === 2 ? sent ? sent(option.data, readyState) : null : readyState === 3 ? inProcess ? inProcess(option.data, readyState) : null : readyState === 4 ? function () {
                return xmlHttp.getResponseHeader('location') /*֧���ض�����һ��ҳ���ַ*/ ? window.location.href = xmlHttp.getResponseHeader('location') : status === 200 ?
                /*��JSON/XML��ʽ�����ݲ��ܱ�����*/
                success ? success(responseText ? JSON.parse(_this.decode ? _this.decode(responseText) : responseText) : _this.decode ? _this.decode(responseXML) : responseXML, xmlHttp.getAllResponseHeaders()) : resolve(responseText ? JSON.parse(_this.decode ? _this.decode(responseText) : responseText) : _this.decode ? _this.decode(responseXML) : responseXML, xmlHttp.getAllResponseHeaders()) : error ? error(responseText || responseXML, {
                    status: status,
                    statusText: statusText
                }) : reject(responseText || responseXML, {
                    status: status,
                    statusText: statusText
                });
            }() : eval('throw new Error(\'XMLHttpRequest.readyState unknown\')');
        },
            _ref = typeof option === 'string' ? {} : option,
            _ref$header = _ref.header,
            header = _ref$header === undefined ? option.header ? Object.assign(option.header, _this.header) : _this.header : _ref$header,
            _ref$type = _ref.type,
            type = _ref$type === undefined ? 'GET' : _ref$type,
            _ref$url = _ref.url,
            url = _ref$url === undefined ? option : _ref$url,
            _ref$async = _ref.async,
            async = _ref$async === undefined ? true : _ref$async,
            _ref$error = _ref.error,
            error = _ref$error === undefined ? _this.error : _ref$error,
            sendURL = '' + (_this.baseURL /*����ǰ��ԭ�ͻ�ʵ��������һ����Ŀǰ׺*/ || '') + (type === 'POST' ? url : url.indexOf('?') !== -1 ? url + '&timestamp=' + new Date().valueOf() : url + '?timestamp=' + new Date().valueOf() /*���IE - GET���󻺴�����*/),
            sendData = JSON.stringify(typeof option.data === 'function' ? option.data.call(_this) : option);
        //this.cancel = xmlHttp.abort;//Ԥ����ֹ����
        xmlHttp.onreadystatechange = state_Change;
        xmlHttp.onerror = function (e) {
            return console.error(e);
        }; //�쳣������
        xmlHttp.open(type, sendURL, async);
        header ? function () {
            // ��������ͷ����Ĭ��ȡԭ�ͻ�ʵ���ϵ�header
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(header)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        k = _step$value[0],
                        v = _step$value[1];

                    xmlHttp.setRequestHeader(k, v);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }() : null;
        xmlHttp.send(type === 'POST' ? _this.encode ? _this.encode(sendData) : sendData : null);
    });
};

;