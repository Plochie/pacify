export function SubModules(modules: any[]) {

    return (target: any) => {
        target.prototype.subModules = [];

        modules.forEach(module => {
            target.prototype.subModules.push(new module())
        });
    }
}