export interface GenericClass<T = any> {
    new (...args: Array<any>): T;
    prototype: T;
}
export declare type AllowedKeys<T = any> = GenericClass<T> | symbol | string;
