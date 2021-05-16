module.exports = {
  presets: ['module:metro-react-native-babel-preset', ['@babel/preset-env', { "loose": true }]],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.json', 'css'],
      }
    ]
  ]
};
