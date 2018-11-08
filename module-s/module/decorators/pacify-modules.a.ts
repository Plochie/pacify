export function PacifyModules(modules: any[]) {

    return (target: any) => {
        target.prototype.modules = [];
        
        modules.forEach(module => {
            target.prototype.modules.push(new module())
        });
    }
}