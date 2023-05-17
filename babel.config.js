module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          verbose: false
        }
      ],
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ts", ".tsx", ".json", ".js"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@assets": "./src/assets",
            "@hooks": "./src/hooks",
            "@contexts": "./src/contexts",
            "@@types": "./src/@types",
            "@src": ["./src"]
          }
        }
      ]
    ]
  };
};
