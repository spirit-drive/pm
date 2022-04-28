/* eslint-disable */
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { ContextReplacementPlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const port = 8080;
const getHost = (options) => {
  if (options.network) {
    return options.network === true ? '192.168.1.83' : options.network;
  }
  return 'localhost';
};

const getIsDevMode = (options) => options.mode === 'development';

const getPublicPath = (options) => {
  const isDevMode = getIsDevMode(options);
  const host = getHost(options);
  if (isDevMode) return `http://${host}:${port}/`;
  if (options.forHeroku) return 'https://pc-calc1.herokuapp.com/';
  return 'https://pc-calc1.herokuapp.com/';
};

module.exports = (env, options) => {
  const isDevMode = getIsDevMode(options);
  const dist = path.join(__dirname, 'dist');
  const src = path.join(__dirname, 'src');
  const host = getHost(options);

  return {
    stats: 'minimal',
    context: src,
    entry: './index.tsx',
    output: {
      path: dist,
      publicPath: getPublicPath(options),
      filename: `js/[name]${isDevMode ? '' : '.[contenthash]'}.js`,
      chunkFilename: `js/[name]${isDevMode ? '' : '.[contenthash]'}.js`,
    },
    devtool: isDevMode && 'source-map',
    devServer: {
      host,
      port,
      hot: true,
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.js'),
      },
      modules: [src, 'node_modules'],
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
      },
    },
    ...(isDevMode
      ? {}
      : {
          optimization: {
            minimize: true,
            minimizer: [
              new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                  output: {
                    comments: false,
                  },
                },
                extractComments: false,
              }),
            ],
          },
        }),
    plugins: [
      new Dotenv({
        path: isDevMode ? './.env.dev' : './.env.stage',
      }),
      new ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en/),
      // new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin(),
      new HtmlPlugin({
        template: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['cache-loader', 'ts-loader'],
          include: src,
          exclude: /node_modules/,
        },
        {
          test: /\.s([aс])ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]_[local]-[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                  modifyVars: {
                    'primary-color': '#1be0e0',
                    'border-radius-base': '3px',
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['cache-loader', 'babel-loader'],
          include: src,
        },
        {
          test: /\.(png|gif|jpe?g)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          loader: 'url-loader',
        },
        {
          test: /\.(woff2?|oet|([to]tf))$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },
  };
};
