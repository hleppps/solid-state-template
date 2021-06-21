const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
}

const PAGES_DIR = `${PATHS.src}/pugs`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('index.pug'))

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`

module.exports = {
  entry: {
    main: path.resolve(PATHS.src, 'index.js'),
  },

  output: {
    path: PATHS.dist,
    filename: filename('.js'),
    clean: true
  },

  devServer: {
    port: 4200
  },

  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    })),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    // }),
    new MiniCssExtractPlugin({
      filename: filename('.css')
    })
  ],

  module: {
    rules: [
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      // },
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              basedir: path.resolve(PATHS.src, 'pugs'),
            }
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(), 
                  cssnano()
                ]
              }
            },
          },
          'less-loader'
        ],        
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        type: 'asset',
        generator: {
          filename: `assets/images/${filename('[ext]')}`
        },
        parser: {
          dataUrlCondition: (() => {
            return isProd ? {maxSize: 40 * 1024} : () => {return true}
          })()
        },
      },
      {
        test: /\.svg/,
        type: 'asset', 
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024 // 40kb
          }
        },
        generator: {
          filename: `assets/images/${filename('[ext]')}`,
          dataUrl: content => {
            content = content.toString();
            return svgToMiniDataURI(content);
          }
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts',
        },
      }
    ],
  },
}