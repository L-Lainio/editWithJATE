const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Other configurations...

    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // // Webpack plugin that generates our html file and injects our bundles
      // new HtmlWebpackPlugin({
      //   template: './index.html',
      //   title: 'JATE'

      // Injects our custom servie worker
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/sw.js', // Path to your service worker file
        swDest: 'service-worker.js', // Output destination for the generated service worker
      }),
      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],


      // CSS Loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          // use: {
          //   loader: 'babel-loader',
          //   options: {
          //     presets: ['@babel/preset-env'],
          //     plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
        },
      ],
    }), // Add closing parenthesis here
  ],
}
