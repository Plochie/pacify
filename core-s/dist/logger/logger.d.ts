export declare class Logger {
    private CONFIG;
    private static logger;
    private constructor();
    static getInstance(): Logger;
    private getDateTimeStr;
    private getCallerFile;
    log(input: any): void;
    error(input: any): void;
    success(input: any): void;
    info(input: any): void;
    warn(input: any): void;
}
export declare class LoggerConfig {
    date: boolean;
    time: boolean;
    file: boolean;
    lineNumber: boolean;
    prefix: string;
    timeStampColor: number;
    fileNameColor: number;
    prefixColor: number;
}
