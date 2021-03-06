import * as _ from "lodash";

class StdOutPlugin {
    constructor(config) {
        this.name = "StdOutPlugin";
        this.defaults = _.defaultsDeep({}, config, {});
    }
    // there can be several instances of this plugin in the same ArgdownApplication
    // Because of this, we can not add the instance default settings to the request object as in other plugins
    // Instead we have to add it each time the getSettings method is called to avoid keeping request specific state
    getSettings(request) {
        let settings = {};
        if (request.stdOut) {
            settings = request.stdOut;
        }
        settings = _.defaultsDeep({}, settings, this.defaults);
        return settings;
    }
    run(request, response) {
        const settings = this.getSettings(request);
        if (request.stdOut) {
            this.config = request.stdOut;
        }
        let content = !settings.isRequestData ? response[settings.dataKey] : request[settings.dataKey];
        process.stdout.write(content);
    }
}

module.exports = {
    StdOutPlugin: StdOutPlugin
};
