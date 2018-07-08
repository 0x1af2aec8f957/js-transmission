// xmlHttp对象

function XHR() {
  return XMLHttpRequest
      ? new XMLHttpRequest()
      : ActiveXObject('Microsoft.XMLHTTP');
}

function property(xhr, obj) { // 属性|方法
  return Object.assign(xhr, obj);
}

function* flow(xhr, {url, payload}) {
  yield xhr.open(url);
  yield xhr.send(payload);
}