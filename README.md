> transmission.js@1.1.0

##### matters needing attention

Now support Fetch API!

> delete：

1. option.success.
2. option.error.

> modify：

1. transmission.bind(option:Object) ==> transmission.config.set(key:Map_key,Map_value)
2. transmission(option:Object|String) ==> transmission.post(option:Object|String)||transmission.get(option:Object|String)

## install transmission.js

```bash

npm install js-transmission

```

## use transmission.js

> ES6 module

``` bash

// For the sake of standardization, only support ES6 module!
import transmission from 'js-transmission';

//POST example

transmission.post("https://baidu.com", {
    message: "hello transmission.js!"
}).then(r => {
    console.dir(r)
}).catch(e => {
    console.error(e)
});

transmission.post({
    url: "https://baidu.com",
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
    }
}).then(r => {
    console.dir(r)
}).catch(e => {
    console.error(e)
});

//GET example

transmission.get('https://baidu.com?search=transmission.js')
    .then(r => {
        console.dir(r)
    })
    .catch(e => {
        console.error(e)
    });

transmission.get({
    url: "https://baidu.com",
    async: false,
    header: {
        'User-Agent': 'js-transmission'
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
}).then(r => {
    console.dir(r)
}).catch(e => {
    console.error(e)
});

```
##  License

[MIT](http://opensource.org/licenses/MIT)

[transmission.js@1.0.4](https://github.com/noteScript/js-transmission.git)
