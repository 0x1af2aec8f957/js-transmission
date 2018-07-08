// url处理

export const urlParse = str => {
  const [url, query = ''] = str.split('?'), payload = {};
  const formDta = query.split('&').reduce((
      total,
      currentValue) => {
        const arv = currentValue.split('=');
        return arv.length === 2
            ? total.append(...arv) || (payload[arv[0]] = arv[1])
            : total;
      },
      new FormData());
  return {
    url,
    query,
    formDta,
    payload,
  };
};

export const anyToObject = any => {
  switch (Object.prototype.toString.call(any)) {
    case '[object Object]':
      return any;
    case '[object Function]':
      return any();
    case '[object Array]':
      return {...any};
    case '[object FormData]':
      return any;
    default:
      throw new Error('不支持的数据解析对象');
      break;
  }
};