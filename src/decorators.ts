import { Container } from './container';
import { AllowedKeys, GenericClass } from './types';
import { isNumber } from './utils';

const isService = (ctor: any): boolean => ctor[Container.injectable] !== void 0;
const mergeArguments = (params: Array<any>, args: Array<any>): Array<any> => {
    const result = [];

    let index = 0;

    for (const param of params) {
        if (isService(param)) {
            const service = Container.get(param);
            result.push(service);
        } else {
            const argument = args[index];
            result.push(argument);
            index += 1;
        }
    }

    return result;
};

export function Inject(key?: AllowedKeys): any {
    return function (target: any, propertyKey: string | symbol, descriptor: number | TypedPropertyDescriptor<any>): typeof target {
        const isDecoratingParameter = isNumber(descriptor);

        if (isDecoratingParameter) {
            throw new Error('Injecting in constructor/method parameter is prohibited');
        }

        target[propertyKey] = Container.get(key || target);
    }
}

export function Service(key?: AllowedKeys): ClassDecorator {
    return function (ctor: any): typeof ctor {
        if (!ctor[Container.injectable]) ctor[Container.injectable] = Symbol();

        const params = Reflect.getMetadata('design:paramtypes', ctor) || [];
        const decoratedCtor = class ServicedClass extends ctor {

            constructor(...args: Array<any>) {
                super(...mergeArguments(params, args));
            }

        };

        return decoratedCtor;
    }
}
