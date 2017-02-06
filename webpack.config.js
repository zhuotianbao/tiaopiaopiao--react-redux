var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

// 开发环境
var isDev = function() {
  return process.env.NODE_ENV.trim() === 'development';
};

// 生产环境
var isProd = function() {
  return process.env.NODE_ENV.trim() === 'production';
};

module.exports = {
  devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: "./src", //最好写上，否则报错，难道这里是一个坑？
        port: 8080,
        proxy: { // 联调中跨域问题解决
            
        }
    },
  //Webpack慎用devtools的inline-source-map模式
  //使用此模式会内联一大段便于定位bug的字符串，查错时可以开启，不是查错时建议关闭，否则开发时加载的包会非常大
  devtool: isProd() ? false : 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'src/js/index.js')
  ],
  output: {
    path: './dist',
    filename: isProd() ? '[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd() ? '[name].chunk.[chunkhash:8].js' : '[name].chunk.js',//分割js配置
    publicPath: isProd() ? './dist/' : '/dist/'  //配置各个模块的公共路径
  },
   module: {
    loaders: [{
      test: /\.less$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {
        publicPath: '.'
      })
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file-loader?name=/[name].[hash:8].[ext]'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    "react": 'React',
    "react-dom": "ReactDOM",
    "zepto":"Zepto"
  },
  plugins: getPlugins()
};

// 获取配置
function getPlugins() {
  var plugins = [
    new webpack.DefinePlugin({
      __DEV__ : isDev(),
      __PROD__: isProd(),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV.trim())
    }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin('style.css'),
  ];

  if (isDev()) {
    plugins.push(
      //new OpenBrowserPlugin({ url: 'http://localhost:8080/' })
    );
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  if (isProd()) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false
        }
      })
    );
  }

  plugins.push(
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  );
  

  return plugins
}
