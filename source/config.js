// 配置文件

let config = {
  baseURL: '',
  header: {},
  method: {
    encode: null,// 支持独立编码
    decode: null,// 支持独立解码
    beforeSend: null,
    sending: null,
    sent: null,
    inProcess: null,
    location: null,
    beforeSuccess: null,
    success: null,
    error: null,
  },
  type: 'GET',
  async: true,
  timeOut: 0,
};

export default {
  config,
  setConfig: object => config = {...config, ...object},
};