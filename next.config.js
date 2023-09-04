const { withRNV } = require("@rnv/engine-rn-next");
const path = require("path");

const config = {
  projectRoot: path.resolve(__dirname),
  images: {
    domains: ["m.media-amazon.com"],
  },
};

module.exports = withRNV(config);
