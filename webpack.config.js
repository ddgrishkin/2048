require('dotenv').config();
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/app.tsx',
    dev: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    // library: {
    //   type: 'assign',
    //   name: 'mylib',
    //   export: 'default',
    // },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
			{
        test: /\.css$/i,
        use: [
					'style-loader',
					{
            loader: 'css-loader',
            options: {
              modules: {
                // for production '[hash:base64]'
                localIdentName: `${packageJson.name}_[folder]--[local]`,
              },
            },
          },
				],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        path.resolve(__dirname, './src/theme.css'),
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './development.html'),
      chunks: ['dev'],
    }),
  ],

  resolve: {
    alias: {
      'react': path.parse(require.resolve('react')).dir,
      'react-dom': path.parse(require.resolve('react-dom')).dir,
    },
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['./src', 'node_modules'],
  },

	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},

  devServer: {
		port: process.env.PORT,
		static: {
      directory: path.join(__dirname, 'dist'),
			publicPath: '/',
		},
  },
}
