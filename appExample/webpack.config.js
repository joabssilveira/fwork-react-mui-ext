const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// caminho absoluto da raiz do projeto
const rootDir = __dirname === 'appExample'
  ? path.resolve(__dirname, '..')
  : process.cwd()

module.exports = {
  mode: 'development',
  entry: path.resolve(rootDir, 'appExample/index.tsx'),
  output: {
    path: path.resolve(rootDir, 'appExample/dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@lib': path.resolve(rootDir, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(rootDir, 'appExample/tsconfig.json'),
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'appExample/index.html'),
    }),
  ],
  devServer: {
    static: path.resolve(rootDir, 'appExample/dist'),
    port: 3000,
    open: true,
  },
}
