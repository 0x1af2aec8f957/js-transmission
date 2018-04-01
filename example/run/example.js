import transmission from 'js-transmission'

/*------ES6------*/
// complete example

transmission({
  url: "https://baidu.com",
  type: "GET",
  async: false, // 同步请求
  header: {
    'User-Agent': 'js-transmission'
  },
  data() {
    return {
      message: "hello transmission.js!"
    }
  },
  beforeSend() {
    // modify data
    return { // modify data
      message: "hello world!"
    }
  },
  sending() {
    //so do...
  },
  sent() {
    //so do...
  },
  inProcess() {
    //so do
  },
  beforeSuccess: (data, sendObject, ResponseHeaders) => {
    console.log(data)
    console.log(sendObject)
    console.log(ResponseHeaders)
  },
  success(response, headers) {
    // typeof response === 'object' //true
    console.dir(response)
      console.dir(headers)
  },
  error(error, statusData) {
    console.warn(error)
    console.dir(statusData)
  }
})

/*-------ES7-------*/
// get example

(async () => {
  // so do...
  const api = await transmission('https://baidu.com?search=transmission.js');
  console.log(api) //if use catch ==> try{}catch(e){console.log(e)}
  //so do...
})();

// post example
(async () => {
  // so do...
  const api = await transmission({
    url: 'https://baidu.com',
    type: "POST"
  });
  console.log(api) //if use catch ==> try{}catch(e){console.log(e)}
  //so do...
})();

const api = transmission
  .bind({ //config this
    baseURL: 'https://baidu.com',
    header: {
      message: "hello world!"
    },
    error(error) { // 这里捕获内部错误，是一个很好的处理方式...
      console.error(error)
    },
    encode(r) { //转码
      //so do...
      return r
    },
    decode(r) { //解码
      //so do...
      return r
    },
  });

/*-------ES6-------*/
// other parameter

const api = transmission('/news'); // option.url === 'https://baidu.com/news' //true

api.then(r => {
  console.log(r)
})
