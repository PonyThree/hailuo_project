module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        },
        port:8000,
	    host:'0.0.0.0', 
	    overlay:{
	        errors:true, //编译过程中如果有任何错误，都会显示到页面上
	    },
	    // open:true 自动帮你打开浏览器
	    hot:true  //热更新
    } 
}