export var Logger;
(function (Logger_1) {
    let LoggerLevel;
    (function (LoggerLevel) {
        LoggerLevel[LoggerLevel["debug"] = 0] = "debug";
        LoggerLevel[LoggerLevel["info"] = 1] = "info";
        LoggerLevel[LoggerLevel["warn"] = 2] = "warn";
        LoggerLevel[LoggerLevel["error"] = 3] = "error";
        LoggerLevel[LoggerLevel["fatal"] = 4] = "fatal";
    })(LoggerLevel || (LoggerLevel = {}));
    class Logger {
        config;
        constructor(config) {
            this.config = config;
            Logger.m_instanceList.push(this);
        }
        get Config() {
            return new Object(this.config);
        }
        __Log(level, ...data) {
            const timeRecord = new Date().toISOString();
            console.log(`[${timeRecord}] [${LoggerLevel[level].toUpperCase()}] [${this.config.alias}]`, ...data);
        }
        Debug(...data) {
            this.__Log(LoggerLevel.debug, ...data);
        }
        Info(...data) {
            this.__Log(LoggerLevel.info, ...data);
        }
        Warn(...data) {
            this.__Log(LoggerLevel.warn, ...data);
        }
        Error(...data) {
            this.__Log(LoggerLevel.error, ...data);
        }
        Fatal(...data) {
            this.__Log(LoggerLevel.fatal, ...data);
        }
        static m_instanceList;
    }
    let EnvType;
    (function (EnvType) {
        EnvType[EnvType["Debug"] = 0] = "Debug";
        EnvType[EnvType["Product"] = 1] = "Product";
        EnvType[EnvType["Release"] = 2] = "Release";
    })(EnvType = Logger_1.EnvType || (Logger_1.EnvType = {}));
    function Initialize(alias, initConfig) {
        Logger.m_instanceList = Logger.m_instanceList || new Array;
        if (Logger.m_instanceList.filter(val => { return val.Config.alias == alias; }).length != 0) {
            throw new Error(`${alias} has existed! `);
        }
        var config = {};
        config.alias = alias;
        if (typeof initConfig != "undefined") {
            if (initConfig.EnvType == EnvType.Debug) {
                config.lowestLevel = LoggerLevel.info;
            }
        }
        var loggerInstance = new Logger(config);
        return loggerInstance;
    }
    Logger_1.Initialize = Initialize;
})(Logger || (Logger = {}));
//# sourceMappingURL=logger.js.map