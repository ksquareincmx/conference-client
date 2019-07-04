const path = require("path");

module.exports = {
  // takes mode "prod" or "dev"
  customAlias: mode => ({
    components: path.resolve("src/components"),
    pages: path.resolve("src/pages"),
    providers: path.resolve("src/providers"),
    services: path.resolve("src/services"),
    config: path.resolve("src/config"),
    mappers: path.resolve("src/mappers"),
    utils: path.resolve("src/utils"),
    hocs: path.resolve("src/hocs"),
    gateways: path.resolve("src/gateways"),
    context: path.resolve("src/context")
  })
};
