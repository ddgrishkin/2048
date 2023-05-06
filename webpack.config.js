require('dotenv').config();

const path = require('path');
const getEntry = require('./webpack/getEntry');
const getPlugins = require('./webpack/getPlugins');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: getEntry(),
  plugins: getPlugins(),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
                localIdentName: isProduction
                  ? '[hash:base64]'
                  : '2048_[folder]--[local]',
              },
            },
          },
				],
      },
    ],
  },

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
