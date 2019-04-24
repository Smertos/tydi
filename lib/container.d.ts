import { AllowedKeys } from './types';
/**
 * Storage for services and any other injectable values
 */
export declare class Container {
    private static instance;
    static injectable: symbol;
    private classStore;
    private valueStore;
    static clear(): void;
    static get<T = any>(key: AllowedKeys<T>): T;
    static set<T = any>(key: AllowedKeys<T>, value: T): T;
    private getClassSymbol;
    clear(): void;
    get<T = any>(key: AllowedKeys<T>): T;
    set<T = any>(key: AllowedKeys<T>, value: T): T;
}
