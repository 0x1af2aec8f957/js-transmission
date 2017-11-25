import transmission from 'js-transmission'

// complete example

transmission({
    url: "https://baidu.com",
    type: "POST",
    async: false,
    header: {
        token: 'js-transmission'
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
    error(error, error) {
        console.warn(error);
        console.dir(statusData)
    }
})

// get example

transmission('https://baidu.com?search=transmission.js').then(r => {
    console.dir(r)
}).catch(e => {
    console.error(e)
})

// post example

transmission({
    url: 'https://baidu.com',
    type: "POST"
}).then(r => {
    console.dir(r)
}).catch(e => {
    console.error(e)
})

const api = transmission
    .bind({//config this
        baseURL: 'https://baidu.com',
        header: {
            message: "hello world!"
        },
        error(error) {
            console.error(error)
        },
        encode(r) {//转码
            //so do...
            return r
        },
        decode(r) {//解码
            //so do...
            return r
        },
    });

// other parameter

const api = transmission('/news');// option.url === 'https://baidu.com/news' //true

api.then(r => {
    console.log(r)
})

