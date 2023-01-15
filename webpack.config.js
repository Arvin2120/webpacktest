// resolve 用来拼接绝对路径的方法
const {resolve} = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
// 设置node 环境变量
process.env.NODE_ENV = 'development'
// process.env.NODE_ENV = 'production'
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
                    // 'style-loader',
                    // 取代style-loader 提前js中的css到单独文件
                    MiniCssExtractPlugin.loader,
                    // 将css文件变成 commonjs模块加载js中，里面内容是样式字符串
                    'css-loader',
                    // 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容样式
                    // 没配置写法(推荐，然后再建一个配置postcss.conﬁg.js文件设置)
                    'postcss-loader'
                    // // 有配置写法
                    // {
                    //     loader:'postcss-loader',
                    //     options:{
                    //         ident:'postcss',
                    //         plugins:()=>[
                    //             // postcss的插件
                    //             require('postcss-preset-env')()
                    //         ]
                    //     }
                    // }
                ]
            },
            {
                // 匹配哪些文件
                test:/\.less$/,
                // 使用哪些loader进行处理
                // 从下到上执行
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                // 匹配哪些文件
                test:/\.s[ca]ss$/,
                // 从下到上执行
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
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
        new HtmlwebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'build.css'
        }),
        // 压缩css
        new CssMinimizerWebpackPlugin()
    ],
    // mode:'development',
    mode:'production',
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