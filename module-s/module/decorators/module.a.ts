export function Module(params: ModuleParams) {

    return (target: any) => {
        target.prototype.m_name = params.name;
        target.prototype.m_id = params.id;
    }
}

class ModuleParams {
    name: string;
    id: string;
}