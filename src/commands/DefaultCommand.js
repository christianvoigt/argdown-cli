import { app } from "../index.js";

export const command = "*";
export const desc = "load config file and run process";
export const handler = function(argv) {
  let config = app.loadConfig(argv.config);
  config.logLevel = argv.verbose ? "verbose" : config.logLevel;
  config.watch = argv.watch || config.watch;
  config.logParserErrors = argv.logParserErrors || config.logParserErrors;
  app.load(config).catch(e => console.log(e));
};
