"use strict";
// Paresh Lomate
// Node js terminal colors
Object.defineProperty(exports, "__esModule", { value: true });
// /^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)
var path = require('path');
var colors = require('colors');
var Logger = /** @class */ (function () {
    function Logger() {
        this.CONFIG = new LoggerConfig();
    }
    Logger.getInstance = function () {
        if (Logger.logger == null) {
            Logger.logger = new Logger();
        }
        return Logger.logger;
    };
    Logger.prototype.getDateTimeStr = function () {
        var pathStr = path.basename(this.getCallerFile(this.CONFIG.lineNumber));
        var datetime = new Date();
        var temp = '';
        // check for prefix from user
        if (this.CONFIG.prefix != '') {
            temp += this.CONFIG.prefix + ' ';
        }
        if (this.CONFIG.date == true) {
            var date = datetime.toDateString().split(' ');
            temp += date[1] + ' ' + date[2] + ' ' + date[3] + ' ';
        }
        if (this.CONFIG.date == true && this.CONFIG.time == false)
            temp += '- ';
        if (this.CONFIG.time == true) {
            var time = datetime.toTimeString().split(' ');
            temp += time[0] + ' - ';
        }
        if (this.CONFIG.file == true) {
            temp += pathStr + ' - ';
        }
        return temp;
    };
    Logger.prototype.getCallerFile = function (lineNumber) {
        try {
            var err = new Error();
            var callerfile = void 0;
            var currentfile = void 0;
            Error.prepareStackTrace = function (err, stack) { return stack; };
            currentfile = err.stack.shift().getFileName();
            while (err.stack.length) {
                err.stack.shift();
                callerfile = err.stack[0].getFileName();
                var returnStr = '';
                if (lineNumber == true) {
                    if (err.stack[0] != undefined && err.stack[0] != null) {
                        returnStr += ' ' + err.stack[0].getMethodName();
                        returnStr += '(' + err.stack[0].getLineNumber() + ')';
                    }
                }
                if (currentfile !== callerfile)
                    return callerfile + '' + returnStr;
            }
        }
        catch (err) { }
        return undefined;
    };
    Logger.prototype.log = function (input) {
        var prefix = this.getDateTimeStr();
        prefix += 'LOG: ';
        console.log(prefix, input);
    };
    Logger.prototype.error = function (input) {
        var prefix = this.getDateTimeStr();
        prefix += 'ERR: ';
        console.log(colors.red(prefix, input));
    };
    Logger.prototype.success = function (input) {
        var prefix = this.getDateTimeStr();
        prefix += 'SUCC: ';
        console.log(colors.green(prefix, input));
    };
    Logger.prototype.info = function (input) {
        var prefix = this.getDateTimeStr();
        prefix += 'INFO: ';
        console.log(colors.blue(prefix, input));
    };
    Logger.prototype.warn = function (input) {
        var prefix = this.getDateTimeStr();
        prefix += 'WARN: ';
        console.log(colors.yellow(prefix, input));
    };
    Logger.logger = null;
    return Logger;
}());
exports.Logger = Logger;
var LoggerConfig = /** @class */ (function () {
    function LoggerConfig() {
        this.date = false;
        this.time = false;
        this.file = true;
        this.lineNumber = true;
        this.prefix = '[thing]';
        this.timeStampColor = 242;
        this.fileNameColor = 150;
        this.prefixColor = 202;
    }
    return LoggerConfig;
}());
exports.LoggerConfig = LoggerConfig;
// let Term = (function () {
//     let instance = new Term();
//     let rawForeground = '\033[38;5;'
//     let NC = '\033[0m'
//     let colors = {
//         red: 9,
//         green: 46,
//         blue: 21,
//         orange: 202,
//         yellow: 226,
//         purple: 105,
//         cyan: 14,
//     }
//     // CLEAR_CONSOLE = '\033[2J\033[1;1H'
//     // BLINK = '\x1b[5m'
//     // UNDERSCORE = '\x1b[4m'
//     let SUPPORT_TERM = false
//     let CONFIG = {
//         date: true,
//         time: true,
//         file: true,
//         prefix: '',
//         timeStampColor: 242,
//         fileNameColor: 150,
//         prefixColor: 202,
//     }
//     function Term() {
//         console.log('Term Object Created');
//         if (!/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
//             console.log('\033[38;5;46m' + '[term-log] Colors are supported on this terminal\033[0m');
//             SUPPORT_TERM = true;
//         }
//         else {
//             console.log('\033[38;5;1m\033[5m' + '[term-log] Colors are supported on this terminal\033[0m');
//             SUPPORT_TERM = false;
//         }
//     }
//     function printDateTime() {
//         let pathStr = path.basename(getCallerFile())
//         let datetime = new Date()
//         // check for prefix from user
//         if (CONFIG.prefix != '') {
//             process.stdout.write(rawForeground + CONFIG.prefixColor + 'm')
//             process.stdout.write(CONFIG.prefix + ' ');
//             process.stdout.write(NC)
//         }
//         if (CONFIG.date == true || CONFIG.time == true)
//             process.stdout.write(rawForeground + CONFIG.timeStampColor + 'm')
//         if (CONFIG.date == true) {
//             let date = datetime.toDateString().split(' ')
//             process.stdout.write(date[1] + ' ' + date[2] + ' ' + date[3] + ' ')
//         }
//         if (CONFIG.date == true && CONFIG.time == false)
//             process.stdout.write(NC + '- ')
//         if (CONFIG.time == true) {
//             let time = datetime.toTimeString().split(' ')
//             process.stdout.write(time[0] + NC + ' - ')
//         }
//         if (CONFIG.file == true) {
//             process.stdout.write(rawForeground + CONFIG.fileNameColor + 'm')
//             process.stdout.write(pathStr + NC + ' - ')
//         }
//     }
//     function getCallerFile() {
//         try {
//             let err = new Error();
//             let callerfile;
//             let currentfile;
//             Error.prepareStackTrace = function (err, stack) { return stack; };
//             currentfile = err.stack.shift().getFileName();
//             while (err.stack.length) {
//                 callerfile = err.stack.shift().getFileName();
//                 if (currentfile !== callerfile) return callerfile;
//             }
//         } catch (err) { }
//         return undefined;
//     }
//     return {
//         getInstance: () => {
//             instance.setConfig = (config) => {
//                 if (config.date != undefined)
//                     CONFIG.date = config.date
//                 if (config.time != undefined)
//                     CONFIG.time = config.time
//                 if (config.file != undefined)
//                     CONFIG.file = config.file
//                 if (config.prefix != undefined)
//                     CONFIG.prefix = config.prefix
//                 if (config.timeStampColor != undefined)
//                     CONFIG.timeStampColor = config.timeStampColor
//                 if (config.fileNameColor != undefined)
//                     CONFIG.fileNameColor = config.fileNameColor
//                 if (config.prefixColor != undefined)
//                     CONFIG.prefixColor = config.prefixColor
//             }
//             instance.log = (input = '', customColor = 7) => {
//                 printDateTime()
//                 process.stdout.write(rawForeground + customColor + 'm')
//                 console.log(input)
//                 process.stdout.write(NC)
//             }
//             instance.log.red = (input = '') => {
//                 printDateTime()
//                 process.stdout.write(rawForeground + colors.red.toString() + 'm')
//                 console.log(input)
//                 process.stdout.write(NC)
//             }
//             instance.log.green = (input = '') => {
//                 printDateTime()
//                 process.stdout.write(rawForeground + colors.green.toString() + 'm')
//                 console.log(input)
//                 process.stdout.write(NC)
//             }
//             instance.log.blue = (input = '') => {
//                 printDateTime()
//                 process.stdout.write(rawForeground + colors.blue.toString() + 'm')
//                 console.log(input)
//                 process.stdout.write(NC)
//             }
//             instance.log.orange = (input = '') => {
//                 printDateTime()
//                 process.stdout.write(rawForeground + colors.orange.toString() + 'm')
//                 console.log(input)
//                 process.stdout.write(NC)
//             }
//             instance.log.yellow = (input = '') => {
//                 printDateTime()
//                 process.stdout.write(rawForeground + colors.yellow.toString() + 'm')
//                 console.log(input)
//                 process.stdout.write(NC)
//             }
//             instance.log.purple = (input = '') => {
//                 printDateTime()
//                 process.stdout.write(rawForeground + colors.purple.toString() + 'm')
//                 console.log(input)
//                 process.stdout.write(NC)
//             }
//             instance.log.cyan = (input = '') => {
//                 printDateTime()
//                 process.stdout.write(rawForeground + colors.cyan.toString() + 'm')
//                 console.log(input)
//                 process.stdout.write(NC)
//             }
//             return instance;
//         }
//     };
// })();
// module.exports = Term.getInstance();
