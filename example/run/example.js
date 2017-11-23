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
// cancel example

const api = transmission('https://baidu.com');

api.cancel()
// other parameter

transmission.prototype.baseURL = 'https://baidu.com';
//transmission.prototype.encode = str => window.btoa(window.encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));//--only POST
//transmission.prototype.decode = str => window.decodeURIComponent(window.atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));//--only POST

const test = transmission('/news');// option.url === 'https://baidu.com/news' //true

test.then(r => {
    console.log(r)
})

