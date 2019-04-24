export const isFunction = (value: any): value is Function => typeof value === 'function';
export const isNumber = (value: any): value is number => typeof value === 'number';
export const isString = (value: any): value is string => typeof value === 'string';
export const isSymbol = (value: any): value is symbol => typeof value === 'symbol';
