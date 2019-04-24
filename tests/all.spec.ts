import{ Container, Inject, Service } from '../src/index';

beforeEach(() => Container.clear());

test('Container is defined', () => expect(Container).toBeDefined());
test('Container DI marker is defined', () => expect(Container.injectable).toBeDefined());
test('Inject is defined', () => expect(Inject).toBeDefined());

