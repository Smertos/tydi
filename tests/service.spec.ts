import{ Container, Inject, Service } from '../src/index';

beforeEach(() => Container.clear());

test('Service is defined', () => expect(Service).toBeDefined());

test('Service adds some secret spices', () => {
    @Service() class TestClass {}

    expect(TestClass).toBeDefined();
    expect(TestClass[Container.injectable]).toBeDefined();
});

test('Service injects another service into constructor argument', () => {
    @Service() class TestClass {
        param: string = 'woohoo';
    }

    @Service() class TestClass2 {
        assss: TestClass;

        constructor(ass: TestClass) {
            this.assss = ass;
        }
    }

    const instance = Container.get(TestClass2);

    expect(TestClass).toBeDefined();
    expect(TestClass2).toBeDefined();
    expect(instance).toBeDefined();
    expect(instance.assss).toBeDefined();
    expect(instance.assss).toBeInstanceOf(TestClass);
    expect(instance.assss.param).toBeDefined();
});

test('Service injects another service into constructor public parameter', () => {
    @Service() class TestClass {
        param: string = 'woohoo';
    }

    @Service() class TestClass2 {
        constructor(public ass: TestClass) {}
    }

    const instance = Container.get(TestClass2);

    expect(TestClass).toBeDefined();
    expect(TestClass2).toBeDefined();
    expect(instance).toBeDefined();
    expect(instance.ass).toBeDefined();
    expect(instance.ass).toBeInstanceOf(TestClass);
    expect(instance.ass.param).toBeDefined();
});
