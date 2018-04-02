> transmission.js@1.1.5

##### matters needing attention

Be based on Asynchronous Javascript And XML！
In the future version, Access to Fetch API!

## install transmission.js

```bash

npm install js-transmission

```

## use transmission.js

> ES6 import

``` bash

// For the sake of standardization, only support ES6 module!
import transmission from 'js-transmission';

transmission({
  url: "https://baidu.com",
  type: "GET",
  async: false,
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
    // data, sendObject, ResponseHeaders
    console.log(data)
    console.log(sendObject)
    console.log(ResponseHeaders)
  },
  success(response, headers) {
    // typeof response === 'object' //true
    console.dir(response),
    console.dir(headers)
  },
  error(error, statusData) {
    console.warn(error);
    console.dir(statusData)
  }
});

//GET example

transmission('https://baidu.com?search=transmission.js')
  .then(r => {
    console.dir(r)
  })
  .catch(e => {
    console.error(e)
})

//POST example

transmission({
  url: 'https://baidu.com',
  type: "POST",
  data:{message:"hello world!"}
})
.then(r => {
  console.dir(r)
})
.catch(e => {
  console.error(e)
})



```
##  License

[MIT](http://opensource.org/licenses/MIT)

[transmission.js@1.1.3](https://github.com/noteScript/js-transmission.git)
