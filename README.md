> transmission.js@1.0.0

##### matters needing attention

Be based on Asynchronous Javascript And XML！

## install transmission.js

```bash

npm install js-transmission

```

## use transmission.js

> ES6 import

``` bash

import transmission from 'js-transmission';

transmission({
url: "https://baidu.com",
type: "POST",
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
success(response, headers) {
// typeof response === 'object' //true
console.dir(response),
console.dir(headers)
},
error(error, statusData) {
console.warn(error);
console.dir(statusData)
}
})

//GET example

transmission('https://baidu.com?search=transmission.js').then(r => {
console.dir(r)
}).catch(e => {
console.error(e)
})

//POST example

transmission({
url: 'https://baidu.com',
type: "POST",
data:{message:"hello world!"}
}).then(r => {
console.dir(r)
}).catch(e => {
console.error(e)
})



```
##  License

[MIT](http://opensource.org/licenses/MIT)

[transmission.js@1.0.0](https://github.com/noteScript/js-transmission.git)
