const { withRNVBabel } = require("rnv");

// module.exports = withRNVBabel({});
module.exports = withRNVBabel({
  presets: [
    [
      "module:metro-react-native-babel-preset",
      { useTransformReactJSXExperimental: true },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        runtime: "automatic",
      },
    ],
  ],
});
