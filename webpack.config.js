// resolve 用来拼接绝对路径的方法
const {resolve} = require('path')
const htmlwebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // webpack配置
    // 入口
    entry:'./src/index.js',
    // 输出 是个对象
    output:{
        filename:'js/build.js',
        // 输出路径
        path:resolve(__dirname,'build')
    },
    // loader的配置
    module:{
        rules:[
            // 详细loader配置
            {
                // 匹配哪些文件
                test:/\.css$/,
                // 使用哪些loader进行处理
                // 从下到上执行
                use:[
                    // 创建style标签，将js中的样式资源插入添加到head中生效
                    'style-loader',
                    // 将css文件变成 commonjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                // 匹配哪些文件
                test:/\.less$/,
                // 使用哪些loader进行处理
                // 从下到上执行
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 匹配哪些文件
                test:/\.s[ca]ss$/,
                // 从下到上执行
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                // 匹配哪些文件
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    publicPath:'./image',//相对打包后index.html的图片位置
                    //输出到build中的目录img下
                    outputPath:'image/',
                    // 大小小于8kb 转base64字符串
                    limit: 8 * 1024,
                    // [object Module] 关闭es6模块化，使用commonjs解析
                    esModule:false,
                    // [hash:10]取图片hash前10位
                    // [ext]取文件原来的扩展名
                    name:'[hash:10].[ext]'
                    
                },
                type:'javascript/auto'  // 不加这个配置，一张图片打包后会生成两张
            },
            {
                // 匹配哪些文件
                test:/\.html$/,
                loader:'html-loader',
            },
            {
                // 打包其他资源文件
                // 排除
                // exclude:/\.(css|js|html|less|scss|sass|jpg|png|gif)$/,
                test: /\.(ttf|otf|eot|woff2?)$/,
                loader: 'file-loader',
                options:{
                    publicPath:'./font',//相对打包后文件位置
                    //输出到build中的目录font下
                    outputPath:'font/',
                    esModule: false,
                    // [hash:10]取图片hash前10位
                    // [ext]取文件原来的扩展名
                    name:'[hash:10].[ext]'
                },
                type:'javascript/auto'
            }
            
            
        ]
    },
    // plugins配置
    plugins:[
        new htmlwebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
    // mode:'production'
    // 启动 devServer指令为：webpack-dev-server
    // 特点：只会在内存中编译打包，不会有任何输出
    devServer:{
        // contentBase: resolve(__dirname,'src'),
        // static:'./src',
        static:resolve(__dirname,'src'),
        // 启动gzip压缩
        compress:true,
        // 端口号
        port:'3000',
        open:true
    }
}