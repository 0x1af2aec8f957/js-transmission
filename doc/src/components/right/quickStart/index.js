import React, { Component } from 'react'
import Introduction from '../introduction'

const code = `
        import transmission from 'js-transmission';

       const api = transmission
       .bind({ //config this
        baseURL: 'https://baidu.com',
        header: {
        message: "hello world!"
        },
        beforeSend(data){ // 请求未初始化
        return data.body
        },
        sending(data){ // 发送中
        return data.body
        },
        sent(data){ // 服务器连接已建立
        console.log(data)
        },
        inProcess(data){ // 请求已接收
        console.log(data)
        },
        location(href){ // 服务器请求跳转另外的链接
        console.log(href)
        },
        beforeSuccess(response){ // 请求已完成，且响应已就绪
        return response.body
        },
          error(error) { // 这里捕获内部错误
          console.error(error)
        },
          encode(r) { // 发送前转码
          //so do...
          return r
        },
          decode(r) { // 发送后解码
          //so do...
          return r
        },
        });
        
        api({
          url: '/news',
          type: "GET",
          async：true,
          header:{},
          })
          .then(r => {
           console.dir(r)
          })
          .catch(e => {
          console.error(e)
})
`

export default class App extends Component {
  render () {
    return (
      <div className={`${App.name}-doc`}>
        <h6>完整的代码示例</h6>
        <pre>
          {code}
        </pre>
        <p>注意：项目使用了ES6，如果你需要ES5的代码库，请查看GitHub代码库。使用ES6在当前浏览器环境中需要你配置babel加载本插件，避免语法错误。</p>
      </div>
    )
  }
}