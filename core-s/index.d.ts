export * from './dist/logger';

export declare const PACIFY_ENV: {
    MOD_SUBMOD_SEPARATOR: string;
    SUBMOD_CNT_SEPARATOR: string;
    INPUT_SEPARATOR: string;
    OUTPUT_SEPARATOR: string;
};
export declare class Matcher {
    static readonly START_NODE: RegExp;
    static readonly CONNECTION: RegExp;
    static readonly END_NODE: RegExp;
    static readonly SUB_MODULE: RegExp;
}
