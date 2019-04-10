import { AllowedKeys, GenericClass } from './types';
import { isString, isSymbol } from './utils';

/**
 * Storage for services and any other injectable values
 */
export class Container {

    private static instance: Container = new Container();
    static injectable: symbol = Symbol();

    private classStore: Record<symbol, GenericClass> = {};
    private valueStore: Record<symbol, any> = {};

    static clear(): void {
        Container.instance.clear();
    }

    static get<T = any>(key: AllowedKeys<T>): T {
        return Container.instance.get<T>(key);
    }

    static set<T = any>(key: AllowedKeys<T>, value: T): T {
        return Container.instance.set<T>(key, value);
    }

    private getClassSymbol(ctor: GenericClass): symbol {
        const entries = (Object.entries(this.classStore) as any) as Array<[symbol, GenericClass]>;

        for (let [storeSymbol, storeClass] of entries) {
            if (storeClass === ctor) return storeSymbol;
        }

        return ctor[Container.injectable] || Symbol();
    }

    clear(): void {
        delete this.classStore;
        delete this.valueStore;

        this.classStore = {};
        this.valueStore = {};
    }

    get<T = any>(key: AllowedKeys<T>): T {
        if (!key) throw new Error(`Cannot get instance of non-existent class (class is ${key.toString()})`);

        if (isSymbol(key)) return this.valueStore[key];
        if (isString(key)) {
            const symbol = Symbol.for(key);
            return this.valueStore[symbol];
        }

        const symbol = this.getClassSymbol(key);
        const instance = this.valueStore[symbol] || new key(); // TODO: work magic of DI in key's constructor
        key[Container.injectable] = symbol;
        this.valueStore[symbol] = instance;
        this.classStore[symbol] = key;

        return instance;
    }

    set<T = any>(key: AllowedKeys<T>, value: T): T {
        if (isSymbol(key)) return this.valueStore[key] = value;
        if (isString(key)) {
            const symbol = Symbol.for(key);
            return this.valueStore[symbol] = value;
        }

        const symbol = this.getClassSymbol(key);
        key[Container.injectable] = symbol;
        this.classStore[symbol] = key;
        this.valueStore[symbol] = value;

        return value;
    }

}
