
export namespace Logger {

    enum LoggerLevel {
        debug, info, warn, error, fatal
    }

    type TLoggerConfig = {
        alias: string
        lowestLevel: LoggerLevel
    }

    interface ILogger {
        Debug: (...data: any[]) => void;
        Info: (...data: any[]) => void;
        Warn: (...data: any[]) => void;
        Error: (...data: any[]) => void;
        Fatal: (...data: any[]) => void;
    }

    class Logger implements ILogger {
        public constructor(private config: TLoggerConfig) {
            Logger.m_instanceList.push(this);
        }


        public get Config(): TLoggerConfig {
            return new Object(this.config) as TLoggerConfig;
        }


        private __Log(level: LoggerLevel,  ...data: any[]): void {
            const timeRecord = new Date().toISOString();

            console.log(`[${timeRecord}] [${LoggerLevel[level].toUpperCase()}] [${this.config.alias}]`, ...data);
        }

        public Debug(...data: any[]): void {
            this.__Log(LoggerLevel.debug, ...data);
        }

        public Info(...data: any[]): void {
            this.__Log(LoggerLevel.info, ...data);

        }

        public Warn(...data: any[]): void {
            this.__Log(LoggerLevel.warn, ...data);
        }

        public Error(...data: any[]): void {
            this.__Log(LoggerLevel.error, ...data);
        }

        public Fatal(...data: any[]): void {
            this.__Log(LoggerLevel.fatal, ...data);
        }

        static m_instanceList: Array<Logger>;
    }

    export enum EnvType {
        Debug, Product, Release
    }

    export type TInitLoggerConfig = {
        EnvType: EnvType
    }

    export function Initialize(alias: string, initConfig?: TInitLoggerConfig) {
        Logger.m_instanceList = Logger.m_instanceList || new Array<Logger>;

        if (Logger.m_instanceList.filter(val => { return val.Config.alias == alias }).length != 0) {
            throw new Error(`${alias} has existed! `);
        }

        var config: TLoggerConfig = <TLoggerConfig>{};
        config.alias = alias;

        if (typeof initConfig != "undefined") {
            if (initConfig.EnvType == EnvType.Debug) {
                config.lowestLevel = LoggerLevel.info;
            }
        }

        var loggerInstance = new Logger(config);
        return loggerInstance;
    }
}

