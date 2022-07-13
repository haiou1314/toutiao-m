module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      rootValue: (model) => (/vant/gi.test(model.file) ? 37.5 : 37.5),
      propList: ["*"],
    },
  },
};
