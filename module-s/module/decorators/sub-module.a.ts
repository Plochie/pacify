const stackTrace = require('stack-trace');
const path = require('path');

export function SubModule(params: NodeMappingParam) {

    return (target: any) => {

        // target.prototype.name = params.name;
        // target.prototype.id = params.id;
        target.prototype.type = 'node';

        var trace = stackTrace.get();
        let dirPath = path.dirname(trace[1].getFileName());

        let confFilePath: string;
        if(path.isAbsolute(params.conf)) {
            confFilePath = params.conf;
        }
        else {
            confFilePath = path.join(dirPath, params.conf);
        }
         
        target.prototype.confFile = confFilePath;
        target.prototype.isStarter = params.isStarter;
    }
}


class NodeMappingParam {
    conf: string;
    isStarter: boolean;
}
