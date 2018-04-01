'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports default = function (option) {
  var _this = this;
  return option.header && Object.assign(option.header, this.header), option.data = typeof option.data === 'function' ? option.data.call(this) : option.data, new Promise(function (resolve, reject) {
    var _ref = typeof option === 'string' ? {} : option,
        _ref$header = _ref.header,
        header = _ref$header === undefined ? _this.header : _ref$header,
        _ref$encode = _ref.encode,
        encode = _ref$encode === undefined ? _this.encode : _ref$encode,
        _ref$decode = _ref.decode,
        decode = _ref$decode === undefined ? _this.decode : _ref$decode,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? 'GET' : _ref$type,
        _ref$url = _ref.url,
        url = _ref$url === undefined ? option : _ref$url,
        _ref$async = _ref.async,
        async = _ref$async === undefined ? true : _ref$async,
        _ref$beforeSend = _ref.beforeSend,
        beforeSend = _ref$beforeSend === undefined ? _this.beforeSend : _ref$beforeSend,
        _ref$sending = _ref.sending,
        sending = _ref$sending === undefined ? _this.sending : _ref$sending,
        _ref$sent = _ref.sent,
        sent = _ref$sent === undefined ? _this.sent : _ref$sent,
        _ref$inProcess = _ref.inProcess,
        inProcess = _ref$inProcess === undefined ? _this.inProcess : _ref$inProcess,
        _ref$location = _ref.location,
        location = _ref$location === undefined ? _this.location : _ref$location,
        _ref$beforeSuccess = _ref.beforeSuccess,
        beforeSuccess = _ref$beforeSuccess === undefined ? _this.beforeSuccess : _ref$beforeSuccess,
        success = _ref.success,
        _ref$error = _ref.error,
        error = _ref$error === undefined ? _this.error : _ref$error,
        sendURL = '' + (_this.baseURL || '') + (!!~type.indexOf('POST') ? url : !!~url.indexOf('?') ? url + '&timestamp=' + new Date().valueOf() : url + '?timestamp=' + new Date().valueOf()),
        sendData = !!~type.indexOf('POST') ? JSON.stringify(option.data) : option.data,
        state_Change = function state_Change() {
      var readyState = xmlHttp.readyState,
          status = xmlHttp.status,
          statusText = xmlHttp.statusText,
          responseText = xmlHttp.responseText,
          responseXML = xmlHttp.responseXML,
          _xmlHttp$UNSENT = xmlHttp.UNSENT,
          UNSENT = _xmlHttp$UNSENT === undefined ? 0 : _xmlHttp$UNSENT,
          _xmlHttp$OPENED = xmlHttp.OPENED,
          OPENED = _xmlHttp$OPENED === undefined ? 1 : _xmlHttp$OPENED,
          _xmlHttp$HEADERS_RECE = xmlHttp.HEADERS_RECEIVED,
          HEADERS_RECEIVED = _xmlHttp$HEADERS_RECE === undefined ? 2 : _xmlHttp$HEADERS_RECE,
          _xmlHttp$LOADING = xmlHttp.LOADING,
          LOADING = _xmlHttp$LOADING === undefined ? 3 : _xmlHttp$LOADING,
          _xmlHttp$DONE = xmlHttp.DONE,
          DONE = _xmlHttp$DONE === undefined ? 4 : _xmlHttp$DONE;
      switch (readyState) {
        case UNSENT:
          beforeSend && (option.data = beforeSend.call(_this, option.data, {
            sendURL: sendURL,
            readyState: readyState
          }) || option.data);
          break;
        case OPENED:
          sending && (option.data = sending.call(_this, option.data, {
            sendURL: sendURL,
            readyState: readyState
          }) || option.data);
          break;
        case HEADERS_RECEIVED:
          sent && sent.call(_this, option.data, readyState);
          break;
        case LOADING:
          inProcess && inProcess.call(_this, option.data, readyState);
          break;
        case DONE:
          var _ref2 = [responseText || responseXML, xmlHttp.getAllResponseHeaders(), xmlHttp.getResponseHeader('location'), {
            sendURL: sendURL,
            sendData: sendData
          }, {
            status: status,
            statusText: statusText
          }],
              response = _ref2[0],
              ResponseHeaders = _ref2[1],
              locationHeader = _ref2[2],
              sendObject = _ref2[3],
              statusObject = _ref2[4];

          if (status >= 200 && status < 400) {
            if (locationHeader) return location ? location.call(_this, locationHeader) : window.location.href = locationHeader;
            var data = response ? eval('(' + (decode ? decode.call(_this, response) : response) + ')') : null;
            data = data && beforeSuccess ? beforeSuccess.call(_this, data, sendObject, ResponseHeaders) || data : data;
            return data ?
            success ? success.call(_this, data, ResponseHeaders) :
            resolve(data, ResponseHeaders) :
            error ? error.call(_this, response, sendObject, statusObject) :
            reject(response, sendObject, statusObject);
          } else return error ? error.call(_this, response, sendObject, statusObject) : reject(response, sendObject, statusObject);
          break;
        default:
          throw new Error('XMLHttpRequest.readyState unknown');
          break;
      }
    };
    var _ref3 = [state_Change, xmlHttp.open(type, !!~type.indexOf('POST') ? sendURL : function () {
      var send_url = Array();
      if (sendData) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.entries(sendData)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                _k = _step$value[0],
                _v = _step$value[1];

            send_url.push('&' + _k + '=' + _v);
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
      }return sendURL + send_url.join(String());
    }.call(_this), async), header && function () {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(header)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              k = _step2$value[0],
              v = _step2$value[1];

          xmlHttp.setRequestHeader(k, v);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }(), xmlHttp.send(!!~type.indexOf('POST') ? encode ? encode(sendData) : sendData : null)];
    xmlHttp.onreadystatechange = _ref3[0];
  });
};;
