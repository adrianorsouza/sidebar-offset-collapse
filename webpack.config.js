const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');

module.exports = {
   devtool: false,
   mode: 'development',
   entry: './scss/app.scss',
   module: {
      rules: [
         {
            test: /\.(sa|sc|c)ss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     publicPath: './css',
                     hmr: true,
                  },
               },
               {
                  loader: 'css-loader',
               },
               {
                  loader: 'postcss-loader',
                  options: {
                     ident: 'postcss',
                     plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        require('postcss-preset-env')({
                           autoprefixer: {
                              flexbox: 'no-2009',
                           },
                           stage: 3,
                        }),
                        postcssNormalize(),
                     ],
                     sourceMap: true,
                  },
               },
               {
                  loader: 'sass-loader' // compiles Sass to CSS
               }
            ],
         },
      ],
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: '[name].css',
         chunkFilename: '[name].css',
      }),
   ],

   devServer: {
      contentBase: path.join(__dirname, './'),
      compress: true,
      port: 3000,
      publicPath: './',
      clientLogLevel: 'none',
      watchContentBase: true,
      quiet: true,
      overlay: false,
   }
};
