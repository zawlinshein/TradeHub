module.exports = {
  presets: ['module:@react-native/babel-preset'],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@": "./src",
        "components": "./src/components",
        "assets": "./src/assets",
        "navigations": "./src/navigations",
        "screens": "./src/screens",
        "api": "./src/api",
        "lib": "./src/lib"
      }
    }],
    'react-native-reanimated/plugin',
  ]
};
