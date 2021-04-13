module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-env",
  ];
  const plugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-syntax-object-rest-spread",
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};